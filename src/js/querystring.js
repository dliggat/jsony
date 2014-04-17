define(function(require) {
  var qs = {};

  var params = location.search.substr(1).split('&');
  for(var i = 0; i < params.length; i++) {
    var pairs = params[i].split('=');
    var name = pairs[0];
    var value = pairs[1];

    qs[name] = value;
  }

  return qs;
});
