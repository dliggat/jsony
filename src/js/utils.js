define(function(require) {
  "use strict";

  var head = document.getElementsByTagName('head')[0];

  function isSomething(val) {
    return val !== undefined && val !== null;
  }

  function querySelector(selector) {
    return document.querySelector(selector);
  }

  function createElement(name, attrs, text) {
    var el = document.createElement(name);

    for(var attr in attrs) {
      var value = attrs[attr];
      if(isSomething(value)) {
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

  function findAncestor(node, className) {
    do {
      if(node.classList.contains(className)) { return node; }
    } while((node = node.parentNode));
    return null;
  }

  function columnName(num) {
    var name = '';

    while(num > 0) {
      var remainder = (num - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      num = parseInt((num - remainder) / 26, 10);
    }

    return name;
  }

  return {
    $: querySelector,
    createElement: createElement,
    customStyleSheet: customStyleSheet,
    findAncestor: findAncestor,
    columnName: columnName
  };
});
