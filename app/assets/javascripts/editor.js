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
    canvasID: '#canvas'
  },
  init: function(canvasId){
    es = this.settings;
    this.bindUIActions();
  },
  bindUIActions: function(){
    var toggleMouseDown = false;//記錄滑鼠是否被按下
    $(es.canvasID).on('mousedown','rect',function(){
      if(es.currentMode == es.FILL_MODE){
        ShowWidget.autoFillBlock('svg.canvas',$(this).attr('data-x'),$(this).attr('data-y'),cs.currentColor);
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
    $(es.canvasID).on('mouseup','rect',function(){
      toggleMouseDown = false;
      $(this).attr("fill",es.currentColor);
      EditorWidget.sendDataToServer($(es.canvasID));
    });

    $(".mode-btn").click(function() {
      es.currentMode = $(this).attr("data-mode");
      $(".mode-btn").removeClass('active');
      $(this).addClass('active');
    });

    $("#save-btn").click(function() {
      $("#show_data").val(ShowWidget.convertImgToStr($(es.canvasID)));
      $("#edit_show_"+$('#show_id').val()).submit();
    });

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
  getSVGToDataUrl: function(){
    var svg = $('#canvas').parent().html();
    canvg('temp-canvas', svg);
    var canvas = document.getElementById("temp-canvas");
    return canvas.toDataURL();
  },
  setUrlToDownloadField: function(){
    $("a#download-png").attr('href',this.getSVGToDataUrl());
  }
}