var tplFind=require('../own/find.string');
SPA.defineView('find', {
  html: tplFind,
  plugins:['delegated'],
  init:{
    mySwiper:null
  },
//   bindActions: {
//   'tap.slide': function (e, data) {
//     this.mySwiper.slideTo($(e.el).index())
//   }
// },
bindActions:{
  'goto.resign':function(){
    SPA.open('resign');
  }
}
// bindEvents:{
//   show:function(){
//     var mySwiper=new Swiper('#resign-swiper',{
//       loop:false
//     })
//   }
// }
});
