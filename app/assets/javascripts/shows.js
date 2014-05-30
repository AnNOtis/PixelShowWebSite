//顯示show
var ShowWidget={};
ShowWidget = {
	setting:{

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
	convertStrToCodeArr: function(data) {
		// console.log(data);
		var tempArr = data.slice(1,data.length).split("_");
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
	convertImgToStr: function(){
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
	convertCodeToImg: function(dataset){
		dataset = [];
		$('#canvas').find('g').each(function() {
			var rowData = [];
			$(this).find('rect').each(function() {
				rowData.push($(this).attr('fill'));
			});
			dataset.push(rowData);
			debugger
		});
	},
  // I don't like this
	autoFillBlock: function(dataset,x,y,color){
		var showHeight = dataset.length;
		var showWidth = dataset[0].length;
		var topColor = -1;
		var bottomColor = -1;
		var leftColor = -1;
		var rightColor = -1;
		if((x-1)>=0){

		}
		if((x+1>showWidth)){

		}
	}

};
