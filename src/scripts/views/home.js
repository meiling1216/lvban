var tplHome=require('../own/home.string');
SPA.defineView('home', {
  html: tplHome,
  plugins: ['delegated', {
    name:'avalon',
    options:function(vm){
      vm.livelist=[];
    }
  }],
  init:{
    formatData:function(arr){
      var tempArr=[];
      for(var i=0;i<Math.ceil(arr.length/2);i++){
        tempArr[i]=[];
        tempArr[i].push(arr[2*i]);
        tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },
  bindActions:{
    'goto.deteil':function(e,data){

      SPA.open('deteil',{
        param: {
          data: data
        }
      });
    },
    'goto.menu':function(){
      SPA.open('menu',{
        ani:{
          name:'actionSheet',
          distance:320,
          autoHide:false
        }
      })
    },
    "new":function(){
      setTimeout(function(){
        $('header ul li').eq(2).find("img").attr("src","/lvban/images/refresh__ios7__pink.png");
      },1500);
      $('header ul li').eq(2).find("img").attr("src","/lvban/images/ajax-loader.gif");
    }

  },
  bindEvents:{
    'beforeShow':function(){
      var that=this;
      var vm=this.getVM();
      $.ajax({
        url:'/lvban/mock/livelist.json',
        type:'get',
        data:{
          rtype:'refresh'
        },
        success:function(rs){
          that.tempArr=rs.data;
          vm.livelist=that.formatData(rs.data);
        }
      });
    },
    'show':function(){

      var that=this;
      var vm=this.getVM();
      //下拉刷新上拉加载更多
      var scrollSize=50;
      var myScroll=this.widgets.scrolled;
      myScroll.scrollBy(0, -scrollSize);

      var head=$('.head img'),
          topImgHasClass=head.hasClass('up');//判断有没有这个class
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll',function(){
         var maxY=this.maxScrollY-this.y;
         if (this.y>= 0) {
             !topImgHasClass && head.addClass('turn');
             return '';
         }
         if (maxY >= 0) {
             !bottomImgHasClass && foot.addClass('down');
             return '';
         }
       });


       myScroll.on('scrollEnd',function(){
         if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/lvban/images/ajax-loader.gif');
              // ajax下拉刷新数据

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
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/lvban/images/ajax-loader.gif');
              //上拉加载数据
              $.ajax({
                   url: '/lvban/mock/more.json',
                   data: {
                     rtype: 'more'
                   },
                   success: function (rs) {
                     var newArray = that.tempArr.concat(rs.data);
                     vm.livelist = that.formatData(newArray);
                     that.livelistArray = newArray;
                   }
                 });
                 setTimeout(function () {
                     myScroll.scrollTo(0, self.y + scrollSize-30);
                     head.removeClass('up');
                     $('.foot').html('<b>没有了</b>');
                 }, 1000);

               }
       });


     }
   }
});
//
// });
