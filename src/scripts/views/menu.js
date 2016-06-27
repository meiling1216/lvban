//var sa = require('../action/swiper.animate1.0.2.min.js');
var tplMenu=require('../own/menu.string');
SPA.defineView('menu', {
  html: tplMenu,
  plugins:['delegated'],
  bindActions:{
    // 'close':function(){
    //   this.hide()
    // },
    'goto.pictalk':function(){
      SPA.open('pictalk')
    }

  }
});
