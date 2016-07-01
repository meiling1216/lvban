var tplMy=require('../own/my.string');
SPA.defineView('my', {
  html: tplMy,
  bindActions:{
    'goto.resign':function(){
      SPA.open('resign');
    }
  }
});
