var tplDeteil=require('../own/deteil.string');
SPA.defineView('deteil', {
  html: tplDeteil,
  plugins:['delegated',{
    name:'avalon',
    options:function(vm){
      vm.imgsrc="";
      vm.title="";
      vm.num="";
      vm.praise="";
      vm.discuss="";
      vm.isShowLoading = true;
    }
  }],
  bindActions: {
    'return': function () {
      this.hide();
    }
  },
  bindEvents:{

    "beforeShow":function(){
      $('.top li').eq(1).find('i').html(1);
      var vm=this.getVM();
      var d=this.param.data;

      $.ajax({
        url:"/lvban/mock/livelist.json",
        type:'get',
        data:"",
        success:function(rs){
          // setTimeout(function () {
            vm.title=rs.data[d.id].title;
            vm.imgsrc=rs.data[d.id].imgsrc;
            vm.num=rs.data[d.id].num;
            vm.praise=rs.data[d.id].praise;
            vm.discuss=rs.data[d.id].discuss;
            vm.isShowLoading = false;
          // }, 1000);

        }
      });
    },
    "show":function(){
      var m=1;
      var mySwiper = new Swiper ('.swiper-container', {
        loop: false,
        onSlideChangeStart:function (swiper) {
          var index=swiper.activeindex;
            $('.top li').eq(1).find('i').html(index+1);

        }
      })
    }
  }
});
