var tplResign=require('../own/resign.string');
SPA.defineView('resign', {
  html: tplResign,
    plugins: ['delegated'],
    bindActions: {
      'return': function () {
        this.hide();
      },
      'send': function(){

      }
    },
});
