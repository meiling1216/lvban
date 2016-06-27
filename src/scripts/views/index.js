var tplIndex=require('../own/index.string');
// var scp=document.body.innerHTML();
// document.body.innerHTML=tplIndex+scp;
SPA.defineView('index', {

  html: tplIndex,
  plugins:['delegated'],

  modules:[{
    name:'content',
    views:['home','find','search','my','more','pictalk'],
    defaultTag:'home',
    container:'.m-content'
  }],
  // bindEvents: {
  //   show: function () {
  //   }
  // }
  bindActions:{
    'switch.tabs':function(e,data){
      // var index=$(e.el).index();
          $(e.el).addClass("active").siblings().removeClass("active");
          $(e.el).parent().find("img:nth-child(1)").removeClass("none").siblings().addClass("none");
          $(e.el).find("img").eq(0).addClass("none").siblings().removeClass("none");
          this.modules.content.launch(data.tag);
          // this.hide();
    }

  }

});
document.ontouchmove=function(e){
  if(e.target.tagName.tollpperCase()!=='IFRAME'){
    e.preventDefault();
  }
}
