var tplPictalk=require('../own/pictalk.string');
SPA.defineView("pictalk",{
  html:tplPictalk,
  plugins:['delegated'],
  bindEvents:{
    'beforeShow':function(){
      // var vm=this.getVM();
      // $.ajax({
      //   url:""
      // })
    },
    'show':function(){
      var mySwiper = new Swiper ('.swiper-container', {
        loop: false,
        pagination: '.swiper-pagination'

      });
      //上拉刷新，下拉加载
      var scrollSize=50;
      var myScroll=this.widgets.scroll2;
        console.log(myScroll);
        myScroll.scrollBy(0,-scrollSize);
      var head=$('.head img'),
      topclass=head.hasClass('up');
      var foot=$('.foot img')
      botclass=foot.hasClass('down');
      myScroll.on('scroll',function(){
        //thisY是下拉距离 this.maxScrollY是最大下拉距离，定值负数
        var maxY=this.maxScrollY-this.y;
        if(this.y>=0){
          !topclass&&head.addClass('up');
          return''
        }
        if(maxY>=0){
          !botclass&&foot.addClass('down');
          return ''
        }
      });
      myScroll.on('scrollEnd',function(){

        if(this.y>=-scrollSize&&this.y<0){
          myScroll.scrollTo(0, -scrollSize);
          head.removeClass('up')
        }else if(this.y>=0){
          head.attr('src', '/lvban/images/ajax-loader.gif');
          $.ajax({});//上拉刷新

        }

        var maxY=this.maxScrollY-this.y;
        var self=this;
        console.log(maxY);
        if(maxY>-scrollSize&&maxY<0){
          myScroll.scrollTo(0,self.maxScrollY+scrollSize);
          foot.removeClass('down')
        }else if(maxY>0){
          foot.attr('src', '/lvban/images/ajax-loader.gif');
          $.ajax({
            url : '',
            data: '',
            success:function(rs){

            }
          });//下拉加载
        }
      })
    }
  }
});
