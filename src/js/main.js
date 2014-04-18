define(function(require) {
  var qs = require('querystring');
  var http = require('http');
  var SpreadSheet = require('sheet');

  var url = qs.url;

  var activeSheet = new SpreadSheet();
  activeSheet.show();

  if(url) {
    document.body.className = 'loading';

    new http.Request(url).get().then(function(data) {
      document.body.className = '';
      activeSheet.load(data);
      console.log(data);
    }).catch(function(status, text) {
      console.error(status + ": Unable to fetch file at " + url);
    });
  }

});
