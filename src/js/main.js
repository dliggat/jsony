define(function(require) {
  var qs = require('querystring');
  var http = require('http');
  var sheet = require('sheet');

  var url = qs.url;

  if(url) {
    document.body.className = 'loading';

    new http.Request(url).get().then(function(data) {
      document.body.className = '';
      console.log(data);
    }).catch(function(status, text) {
      console.error(status + ": Unable to fetch file at " + url);
    });
  }

  var container = document.getElementById('sheet');
  container.appendChild(sheet.create());
});
