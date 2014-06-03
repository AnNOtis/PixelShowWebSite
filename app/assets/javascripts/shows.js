//顯示show
var ShowWidget={};
ShowWidget = {
	settings:{

	},
	init: function(){

	},
	generateShow: function(s_canvas, size, showData){
		//$(s_canvas).empty();
		
		var myCanvas = d3.select(s_canvas);
		var canvasLength = $(s_canvas).attr("width");	
		myCanvas.selectAll("g").remove();
		myCanvas.selectAll("line").remove();

		var rowG = myCanvas.selectAll("g")
		.data(showData,function(row,yPosition){
			$.each(row,function(xPosition,value){
				var cell = {};
				cell.x = xPosition;
				cell.y = yPosition;
				cell.value = value;
				row[xPosition] = cell;
			});
			return showData;
		})
		.enter()
		.append('g')
		.attr('height',function(d) {
			return canvasLength/size;
		})
		.attr('x',0)
		.attr('y',function(d,i) {
			return i*canvasLength/size;
		});

		//fill color
		rowG.selectAll('rect')
		.data(function(d) {
			// console.log(d);
			return d;
		})
		.enter().append('rect')
		.attr({
	    width: canvasLength/size,
	    height: canvasLength/size
	  })
		.attr({
		  x: function (d) { return d.x*canvasLength/size; },
		  y: function (d) { return d.y*canvasLength/size; },
		})
		.attr({
		  "data-x": function (d) { return d.x; },
		  "data-y": function (d) { return d.y; },
		  fill: function (d) { return d.value; }
		});
	},
	generateAxis: function(s_canvas){
		// console.log("generateAxis");
		var canvas = d3.select(s_canvas);
		canvas.selectAll('.xAxis').data(d3.range(0,size+1))
		.enter()
		.append('line')
		.attr('class','axis')
		.attr('x1',function(d) {
			return 0;
		})
		.attr('y1',function(d) {
			return d*length/size;
		})
		.attr('x2',function(d) {
			return length;
		})
		.attr('y2',function(d) {
			return d*length/size;
		});


		canvas.selectAll('.yAxis').data(d3.range(0,size+1))
		.enter()
		.append('line')
		.attr('class','axis')
		.attr('x1',function(d) {
			return d*length/size;
		})
		.attr('y1',function(d) {
			return 0;
		})
		.attr('x2',function(d) {
			return d*length/size;
		})
		.attr('y2',function(d) {
			return length;
		});
	},
	convertStrToCodeArr: function(dataString) {
		// console.log(dataString);
		var tempArr = dataString.slice(1,dataString.length).split("_");
		var resultArr = [];
		$.each(tempArr,function(index,value){
			var noPrefixArr = value.slice(1,value.length).split("#");
			$.each(noPrefixArr,function(index,value){
				noPrefixArr[index] = "#"+value;
			})
			//console.log(noPrefixArr);
			resultArr.push(noPrefixArr);
		});
		return resultArr;
	},
	//@param canvas:svg element
	convertImgToStr: function(canvas){
		result = "";
		$('#canvas').find('g').each(function(){
			result+="_";
			$(this).find('rect').each(function(){
				var color = $(this).attr('fill');
				result+= color;
			})
		})
		return result;
	},
	convertImgToArr: function(canvas){
 		var result = [];
 		$(canvas).find('g').each(function(){
 			var rowArr = []
 			$(this).find('rect').each(function(){
 				var color = $(this).attr('fill');
  			rowArr.push(color);
 			})
 			result.push(rowArr);
 		})
 		return result;
 	},
	autoFillBlock: function(canvas,x,y,fillColor){
		x = parseInt(x);
		y = parseInt(y);
		dataArr = ShowWidget.convertImgToArr(canvas);
		var preColor = dataArr[y][x];
		ShowWidget.calFillBlock(x,y,preColor,fillColor);
		ShowWidget.generateShow(canvas,10,dataArr);
		ShowWidget.generateAxis(canvas);
		console.log('!!!');
	},
    outsideOfCanvas: function(x, y, size){
        console.log('meet edge');
        return x < 0 || y < 0 || x >= size || y >= size;
    },
    // color getter & setter
    color: function(x, y, newColor){
        if(newColor){
            dataArr[y][x] = newColor;
        }else{
            dataArr[y][x];
        }
    },
    pointSiblings: function(x, y){
        return [
            {"x": x - 1, "y": y    },
            {"x": x    , "y": y - 1},
            {"x": x + 1, "y": y    },
            {"x": x    , "y": y + 1},
        ];
    },
    calFillBlock: function(x,y,siblingColor,fillColor){
        if(this.outsideOfCanvas(x, y, dataArr.length)){
            return;
        }
        var currentColor = color(x, y);
        if(currentColor == fillColor){
            console.log('dataArr[y][x]==fillColor');
            return;
        }
        if(siblingColor != currentColor){
            console.log('preColor!=dataArr[y][x]');
            return;
        }

        color(x, y, fillColor);

        // setTimeout(function() {},500);
        this.pointSiblings(x, y).forEach(function(item){
            ShowWidget.calFillBlock(item["x"],item["y"],currentColor,fillColor);
        });
    }
};
