//顯示show
var ShowWidget={};
ShowWidget = {
	settings:{

	},
	init: function(){

	},
	generateShow: function(s_canvas, size, colorData){
		$(s_canvas).empty();
		var canvas = d3.select(s_canvas);
		var canvasLength = $(s_canvas).attr("width");
		//generate group
		var rowG = canvas.selectAll("g.row")
		.data(colorData,function(row,yPosition) {
			$.each(row,function(xPosition,value) {
				var cell = {};
				cell.x = xPosition;
				cell.y = yPosition;
				cell.value = value;
				row[xPosition] = cell;
			});
			// console.log(row);
			return colorData;
		})
		.enter()
		.append('g')
		.attr('height',function(d) {
			return canvasLength/size;
		})
		.attr('x',0)
		.attr('y',function(d,i) {
			return i*canvasLength/size;
		})
		.text(function(d,index) {return index});

		//fill color
		rowG.selectAll('rect')
		.data(function(d) {
			// console.log(d);
			return d;
		})
		.enter()
		.append('rect')
		.attr('width',function(d) {
			return canvasLength/size;
		})
		.attr('height',function(d) {
			return canvasLength/size;
		})
		.attr('x',function(d,i) {
			return d.x*canvasLength/size;
		})
		.attr('y',function(d,i) {
			return d.y*canvasLength/size;
		})
		.attr('data-x',function(d,i) {
			return d.x;
		})
		.attr('data-y',function(d,i) {
			return d.y;
		})
		.attr('fill',function(d,i) {return d.value});
	},
	generateAxis: function(s_canvas){
		console.log("generateAxis");
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

	autoFillBlock: function(canvas,x,y,fillColor){
		x = parseInt(x);
		y = parseInt(y);
		dataArr = ShowWidget.convertImgToArr(canvas);
		var preColor = dataArr[y][x];
		ShowWidget.calFillBlock(x,y,preColor,fillColor);
		ShowWidget.generateShow(canvas,10,dataArr);
		ShowWidget.generateAxis(canvas);
		sendDataToServer();
	},
	calFillBlock: function(x,y,preColor,fillColor){
		// console.log('x:'+x+'y:'+y);
		if(x<0||x>(dataArr.length-1)||y<0||y>(dataArr[0].length-1)){
			// console.log('1')
			return;
		}
		var currentColor = dataArr[y][x];
		if(dataArr[y][x]==fillColor){
			// console.log('2')
			return;
		}
		if(preColor!=dataArr[y][x]){
			// console.log('3')
			return;
		}
		dataArr[y][x] = fillColor;
		// setTimeout(function() {},500);
		ShowWidget.calFillBlock(x+1,y,currentColor,fillColor);
		ShowWidget.calFillBlock(x,y+1,currentColor,fillColor);
		ShowWidget.calFillBlock(x-1,y,currentColor,fillColor);
		ShowWidget.calFillBlock(x,y-1,currentColor,fillColor);
	}

};