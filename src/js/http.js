define(function(require) {
  var RSVP = require('rsvp');

  function Request(url) {
    this.url = url;
    this.xhr = new XMLHttpRequest();
  }

  Request.prototype.send = function httpGet(method, data) {
    var xhr = this.xhr;
    method = method.toUpperCase();

    xhr.open('GET', this.url, true);
    xhr.send();

    return new RSVP.Promise(function(resolve, reject) {
      xhr.onreadystatechange = function readyStateChange() {
        if(xhr.readyState === 4) {
          if(xhr.status >= 200 && xhr.status < 400) {
            var data = xhr.responseText;
            if(xhr.getResponseHeader('Content-Type') === 'application/json') {
              resolve(JSON.parse(data));
            } else {
              resolve(data);
            }
          } else {
            reject(xhr.status, xhr.responseText);
          }
        }
      };
    });
  };

  Request.prototype.get = function httpGet(data) {
    return this.send('get', data);
  };

  Request.prototype.post = function httpPost(data) {
    return this.send('post', data);
  };

  return {
    Request: Request
  };
});
