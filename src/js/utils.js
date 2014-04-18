define(function(require) {
  "use strict";

  var head = document.getElementsByTagName('head')[0];

  function isSomething(val) {
    return val !== undefined && val !== null;
  }

  function createElement(name, attrs, text) {
    var el = document.createElement(name);

    for(var attr in attrs) {
      var value = attrs[attr];
      if(isSomething(value)) {
        switch(attr) {
          case 'class':
            if(Array.isArray(value)) {
              value = value.filter(isSomething).join(' ');
            }
            break;
        }
        el.setAttribute(attr, value);
      }
    }

    if(isSomething(text)) {
      el.appendChild(document.createTextNode(text));
    }

    return el;
  }

  function customStyleSheet(css, options) {
    css = css || '';
    options = options || {};

    var sheet = document.createElement('style');
    sheet.type = "text/css";
    sheet.media = 'screen';
    if(options.id) {
      sheet.id = options.id;
    }

    if(sheet.styleSheet) {
      sheet.styleSheet.cssText = css; //IE only
    } else {
      sheet.appendChild(document.createTextNode(css));
    }

    // insert at the top of <head> so later styles can changed by page css.
    head.insertBefore(sheet, options.element || head.firstChild);

    return sheet;
  }

  return {
    createElement: createElement,
    customStyleSheet: customStyleSheet
  };
});
