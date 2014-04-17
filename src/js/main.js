require.config({
  shim: {
    "rsvp": {
      "exports": "RSVP"
    }
  },
  paths: {
    'rsvp': '/lib/bower/rsvp/rsvp'
  },
  // enforceDefine: true,
  // packages: [
  //   'rsvp',
  //   {
  //     name: 'rsvp',
  //     location: '/lib/bower/rsvp',
  //     main: 'rsvp.amd'
  //   }
  // ]
});

define(function(require) {
  var qs = require('querystring');
  var http = require('http');

  var url = qs.url;

  new http.Request(url).get().then(function(data) {
    console.log(data);
  }).catch(function(status, text) {
    console.error(status + ": Unable to fetch file at " + url);
  });

  console.log(qs);
});

