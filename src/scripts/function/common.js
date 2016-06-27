function fresh(){
  $.ajax({
       url: '/lvban/mock/new.json',
       data: {
         rtype: 'new'
       },
       success: function (rs) {
         var newArray = rs.data.concat(that.tempArr);
         vm.livelist = that.formatData(newArray);
         that.livelistArray = newArray;
       }
     });
  setTimeout(function () {
      myScroll.scrollTo(0, -scrollSize);
      head.removeClass('turn');
      head.attr('src', '/lvban/images/ptr_pulltorefresh_arrow.png');
  }, 1000);
};
