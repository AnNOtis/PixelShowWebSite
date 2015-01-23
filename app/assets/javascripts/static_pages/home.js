$(document).on('page:change',function(){
  if($(".static_pages.home").length == 0){
    return;
  }
  var length = $("svg.canvas").attr("width");
  var size = 10;
  var dataset, dataArr;
  $('.js-show').each(function() {
    var showID     = $(this).attr('data-id');
    var originData = $(this).attr('data-matrix');
    var showData   = ShowWidget.convertStrToCodeArr(originData);
    ShowWidget.generateShow('#'+showID, 10, showData);
  });

  $('.isotope-container').isotope({
    itemSelector: '.js-show',
    masonry: {
      columnWidth: 160,
      gutter: 10
    }
  });
});