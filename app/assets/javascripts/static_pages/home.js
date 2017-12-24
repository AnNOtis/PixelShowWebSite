(function(){
  var generateShow = function(){
    $('.js-show').each(function() {
      var showID     = $(this).attr('data-id');
      var originData = $(this).attr('data-matrix');
      var showData   = ShowWidget.convertStrToCodeArr(originData);
      ShowWidget.generateShow('#'+showID, 10, showData);
    });
  };

  var initMasonry = function(){
    $('.isotope-container').isotope({
      itemSelector: '.Card',
      infiniteScroll: true,
      masonry: {
        columnWidth: 160,
        gutter: 10
      }
    });
  };

  var initInfiniteScroll = function(){
    $('body').infinitescroll({
      navSelector  : "nav.pagination",
      nextSelector : "nav.pagination .next a",
      itemSelector : ".Card",
      contentSelector: ".isotope-container",
      bufferPx: 0,
      loading: {
        img:'/images/pix-loading.gif',
        msgText: '載入中...',
        finishedMsg: '已經到底了！',
        speed: 'slow'
      }
    }, function(newElems){
      var $newElems = $( newElems ).css({ opacity: 0 });
      generateShow();
      $('.isotope-container').isotope( 'appended', $newElems, true );
      $newElems.animate({ opacity: 1 });
    });
  };

  $(document).on('turbolinks:load',function(){
    if($(".static_pages.home").length == 0){ return; }

    generateShow();
    initMasonry();
    initInfiniteScroll()
  });

})();
