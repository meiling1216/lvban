var tplResign=require('../own/resign.string');
SPA.defineView('resign', {
  html: tplResign,
    plugins: ['delegated'],
    bindActions: {
      'return': function () {
        this.hide();
      },
      'send': function(){
          $('.resign p').css('display',"block")
          setTimeout(function(){
            $('.resign p').css('display',"none")
          },1000);
      }
    },
});
