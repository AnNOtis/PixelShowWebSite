//顯示show
var ShowWidget={};
ShowWidget = {
  settings:{

  },
  init: function(){

  },
  generateShow: function(s_canvas, size, showData){
    var d3Canvas = d3.select(s_canvas);
    d3Canvas.selectAll("g").remove();
    d3Canvas.selectAll("line").remove();
    var canvasLength = d3Canvas.attr("width");
    var rowG = this.generateG(d3Canvas,size,showData);
    this.generateRect(rowG,d3Canvas,size)
  },
  generateG: function(d3Canvas,size,showData){
    var canvasLength = d3Canvas.attr("width");
    return d3Canvas.selectAll("g")
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
      .attr({
        height:function(d) {return canvasLength/size;},
        x:0,
        y:function(d,i) {return i*canvasLength/size;}
      });
  },
  generateRect: function(rowG,d3Canvas,size){
    var canvasLength = d3Canvas.attr("width");
    rowG.selectAll('rect')
      .data(function(d) {return d;})
      .enter().append('rect')
      .attr({
        width: canvasLength/size,
        height: canvasLength/size,
        x: function (d) { return d.x*canvasLength/size; },
        y: function (d) { return d.y*canvasLength/size; },
        "data-x": function (d) { return d.x; },
        "data-y": function (d) { return d.y; },
        fill: function (d) { return d.value; }
      });
  },
  generateAxis: function(s_canvas){
    ShowWidget.generateXAxis(s_canvas);
    ShowWidget.generateYAxis(s_canvas);
  },
  generateXAxis: function(s_canvas){
    var canvas = d3.select(s_canvas);
    canvas.selectAll('.xAxis').data(d3.range(0,size+1))
    .enter()
    .append('line')
    .attr({
      class:'axis',
      x1:function(d){return 0;},
      y1:function(d){return d*length/size;},
      x2:function(d){return length;},
      y2:function(d){return d*length/size;}
    });
  },
  generateYAxis: function(s_canvas){
    var canvas = d3.select(s_canvas);
    canvas.selectAll('.yAxis').data(d3.range(0,size+1))
    .enter()
    .append('line')
    .attr({
      class:'axis',
      x1:function(d){return d*length/size;},
      y1:function(d){return 0;},
      x2:function(d){return d*length/size;},
      y2:function(d){return length;}
    });
  },
  convertStrToCodeArr: function(dataString) {
    var tempArr = dataString.slice(1,dataString.length).split("_");
    var resultArr = [];
    $.each(tempArr,function(index,value){
      var noPrefixArr = value.slice(1,value.length).split("#");
      $.each(noPrefixArr,function(index,value){
          noPrefixArr[index] = "#"+value;
      })
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
    var preColor = this.color(x, y);
    this.calFillBlock(x,y,preColor,fillColor);
    this.generateShow(canvas,10,dataArr);
    this.generateAxis(canvas);
  },
  outsideOfCanvas: function(x, y, size){
    return x < 0 || y < 0 || x >= size || y >= size;
  },
  // color getter & setter
  color: function(x, y, newColor){
    if(newColor){
      dataArr[y][x] = newColor;
    }else{
      return dataArr[y][x];
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
    console.log('x:'+x+', y:'+y);
    if(this.outsideOfCanvas(x, y, dataArr.length)){
      return;
    }
    var currentColor = this.color(x, y);
    if(currentColor == fillColor){ return;}
    if(siblingColor != currentColor){ return;}
    this.color(x, y, fillColor);
    this.pointSiblings(x, y).forEach(function(item){
      ShowWidget.calFillBlock(item["x"],item["y"],currentColor,fillColor);
    });
  }
};
