define(function(require) {
  var utils = require('utils');

  var DEFAULTWIDTH = 100;
  var numRows = 10, numCols = 10;
  var labels = {
    cols: {
      width: [45]
    },
    rows: {
      height: []
    }
  };

  // var stylesheet = css.sheet;

  function createStyleSheet() {
    var width = labels.cols.width[0];
    var left = width;

    var rules = '#sheet .cell.label-col {' +
        'left: 0; ' +
        'width: ' + width +  'px;' +
      '}\n';

    for(var i = 1; i <= numCols; i++) {
      width = labels.cols.width[i] || DEFAULTWIDTH;
      rules += '' +
        '#sheet .cell.col-' + columnName(i) + ' {' +
          'left: ' + left +  'px; ' +
          'width: ' + width +  'px;' +
        '}' +
        '\n';
      left += width;
    }

    var css = utils.customStyleSheet(rules, { id: 'sheet-rules' });
  }

  function columnName(num) {
    num = +num;
    var name = '';

    while(num > 0) {
      var remainder = (num - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      num = parseInt((num - remainder) / 26, 10);
    }

    return name;
  }

  function createLabelRow() {
    var labelRow = utils.createElement('div', { id: 'label-row' });

    var emptyEl = utils.createElement('div', { id: 'label-empty', class: 'cell cell-label label-col' });

    labelRow.appendChild(emptyEl);

    for(var i = 1; i <= numCols; i++) {
      var name = columnName(i);
      labelRow.appendChild(createLabelCell('col-' + name, name));
    }

    return labelRow;
  }

  function createLabelCell(className, text) {
    return utils.createElement('div', {
      'class': ['cell cell-label ' + className]
    }, text);
  }

  function createRow(num) {
    var row = utils.createElement('div', {
      id: 'row-' + num,
      'class': 'row'
    });

    var label = createLabelCell('label label-col', num);
    row.appendChild(label);

    for(var i = 1; i <= numCols; i++) {
      var cell = createCell(num, columnName(i));
      row.appendChild(cell);
    }

    return row;
  }

  function createCell(row, col) {
    return utils.createElement('div', {
      'class': ['cell', 'row-' + row, 'col-' + col]
    });
  }

  function create() {
    createStyleSheet();

    var frag = document.createDocumentFragment();

    frag.appendChild(createLabelRow());

    for(var j = 1; j <= numRows; j++) {
      frag.appendChild(createRow(j));
    }

    return frag;
  }

  function sizeChanged(e) {

  }

  window.addEventListener('resize', sizeChanged, false);

  return {
    create: create
  };
});
