(function(){
  generateShow = function(elements){
    if (!elements) {elements = $('body')}
    $(elements).find('.js-show').each(function() {
      var showID     = $(this).attr('data-id');
      var originData = $(this).attr('data-matrix');
      var showData   = ShowWidget.convertStrToCodeArr(originData);
      ShowWidget.generateShow('#'+showID, 10, showData);
    });
  };

  var initMasonry = function(){
    $('.isotope-container').masonry({
      itemSelector: '.Card',
      columnWidth: 160, gutter: 10
    });

    $('.isotope-container').on('layoutComplete', function (event, items, a) {
      generateShow(items.map(function(item) {return item.element}))
    });

    return $('.isotope-container').data('masonry')
  };

  var initInfiniteScroll = function(mansory){
    $('.isotope-container').infiniteScroll({
      path : "nav.pagination .next a",
      append: '.Card',
      status: '.page-load-status',
      history: false,
      outlayer: mansory,
    }, function(newElems){
      var $newElems = $(newElems).find('.Card')
      $('.isotope-container').masonry('appended', $newElems)
    });
  };

  $(document).on('turbolinks:load',function(){
    if($(".static_pages.home").length == 0){ return; }

    generateShow();
    var mansory = initMasonry();
    initInfiniteScroll(mansory)
  });

})();
