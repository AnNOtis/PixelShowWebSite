var es;
var EditorWidget;

EditorWidget = {
  settings:{
    //畫筆的模式
    PENCIL_MODE:1,
    LINE_MODE:2,
    FILL_MODE:3,
    currentMode:1,//預設為畫筆模式
    currentColor:'#345',//init currentColor
    canvasID: '#canvas',
    stacks: [],
    stackIndex: -1,
  },
  init: function(){
    es = this.settings;
    this.pushImgToStack();
    this.bindUIActions();
  },
  currentCanvas: function(){
    return $(es.canvasID);
  },
  bindUIActions: function(){
    var toggleMouseDown = false;//記錄滑鼠是否被按下
    _this = this;

    $(es.canvasID).on('mousedown','rect',function(){
      if(es.currentMode == es.FILL_MODE){
        ShowWidget.autoFillBlock('svg.canvas',$(this).attr('data-x'),$(this).attr('data-y'),es.currentColor);
      }else{
        toggleMouseDown = true;
        $(this).attr("fill",es.currentColor);
      }
    });

    $(es.canvasID).on('mouseover','rect',function(){
      if(toggleMouseDown){
        $(this).attr("fill",es.currentColor);
      }
    });

    $(document).on('mouseup', function(){
      toggleMouseDown = false;
    });

    $(es.canvasID).on('mouseup','rect',function(){
      toggleMouseDown = false;
      $(this).attr("fill",es.currentColor);
      _this.pushImgToStack();
      EditorWidget.sendDataToServer($(es.canvasID));
    });

    $(".js-mode-btn").click(function() {
      es.currentMode = $(this).attr("data-mode");
      $(".js-mode-btn").removeClass('active');
      $(this).addClass('active');
    });

    $("#save-btn").click(function() {
      $("#show_data").val(ShowWidget.convertImgToStr($(es.canvasID)));
      $("#edit_show_"+$('#show_id').val()).submit();
    });

    $("a#download-png").click(function() {
      EditorWidget.setUrlToDownloadField();
    });

    $("#undoBtn").click(function(){
      _this.undo();
    });

    $("#redoBtn").click(function(){
      _this.redo();
    });
  },
  presentUndoRedoState: function(){
    $("#undoBtn").removeClass('is_disabled');
    $("#redoBtn").removeClass('is_disabled');

    if(es.stacks.length <= 1){
      $("#undoBtn").addClass('is_disabled');
      $("#redoBtn").addClass('is_disabled');

    }else if(es.stackIndex === 0){
      $("#undoBtn").addClass('is_disabled');

    }else if(es.stackIndex === es.stacks.length-1){
      $("#redoBtn").addClass('is_disabled');
    }

  },
  pushImgToStack: function(){
    var data = ShowWidget.convertImgToStr(es.currentCanvas);
    es.stackIndex += 1;
    es.stacks.splice(es.stackIndex, es.stacks.length);
    es.stacks.push(data);
    this.presentUndoRedoState();
  },
  undo: function(){
    var targetIndex = es.stackIndex - 1;
    if(targetIndex < 0 ){
      return false;
    }
    es.stackIndex = targetIndex;
    var targetImg = es.stacks[targetIndex];
    this.overwriteCanvas(targetImg);
    this.presentUndoRedoState();
  },
  redo: function(){
    var targetIndex = es.stackIndex + 1;
    if(targetIndex >= es.stacks.length ){
      return false;
    }
    es.stackIndex = targetIndex;
    var targetImg = es.stacks[targetIndex];
    this.overwriteCanvas(targetImg);
    this.presentUndoRedoState();
  },
  sendDataToServer: function(canvas){
    var postFormUrl = $("#edit_show_"+$('#show_id').val()).attr('action');
    $.ajax({
      url: postFormUrl,
      type: "PUT",
      dataType: "JSON",
      data: {data:ShowWidget.convertImgToStr(canvas)}
    });
  },
  getSVGToDataUrl: function(canvasSelector){
    $('<canvas id="temp-canvas" style="display:none"></canvas>').appendTo('body');
    var svg = $("<div />").append($(canvasSelector).clone()).html();
    canvg('temp-canvas', svg);
    var canvas = document.getElementById("temp-canvas");
    return canvas.toDataURL("image/png");
  },
  setUrlToDownloadField: function(){
    $("a#download-png").attr('href',this.getSVGToDataUrl('#canvas'));
  },
  overwriteCanvas: function(data){
    var showData = ShowWidget.convertStrToCodeArr(data);
    ShowWidget.generateShow( es.canvasID , 10, showData);
    ShowWidget.generateAxis(es.canvasID);
    this.sendDataToServer(this.currentCanvas())
  }
}
