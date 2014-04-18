define(function(require) {
  var utils = require('utils');

  var DEFAULTWIDTH = 100;

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

  function createStyleSheet(id, numCols, widths) {
    var width = widths[0];
    var left = width;

    var rules = '#sheet-' + id + ' .cell.label-col {' +
        'left: 0; ' +
        'width: ' + width +  'px;' +
      '}\n';

    for(var i = 1; i <= numCols; i++) {
      width = widths[i] || DEFAULTWIDTH;
      rules += '' +
        '#sheet-' + id + ' .cell.col-' + columnName(i) + ' {' +
          'left: ' + left +  'px; ' +
          'width: ' + width +  'px;' +
        '}' +
        '\n';
      left += width;
    }

    return utils.customStyleSheet(rules);
  }

  var count = 0;

  function SpreadSheet() {
    // var stylesheet = css.sheet;

    // TODO: compute rows cols that will fit in viewport

    this.id = count++;

    var numRows = 20, numCols = 15;
    var labels = {
      cols: {
        width: [45]
      },
      rows: {
        height: []
      }
    };

    var styleEl = createStyleSheet(this.id, numCols, labels.cols.width);
    styleEl.id = 'spreadsheet-rules-' + this.id;

    function createLabelRow() {
      var labelRow = utils.createElement('div', { 'class': 'label-row' });

      var emptyEl = createLabelCell('label-col label-empty');

      labelRow.appendChild(emptyEl);

      for(var i = 1; i <= numCols; i++) {
        var name = columnName(i);
        labelRow.appendChild(createLabelCell('col-' + name, name));
      }

      return labelRow;
    }

    function createLabelCell(className, text) {
      return utils.createElement('div', {
        'class': ['cell label ' + className]
      }, text);
    }

    function createRow(num) {
      var row = utils.createElement('div', {
        'class': 'row row-' + num
      });

      var label = createLabelCell('label-col', num);
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

    this.el = utils.createElement('div', {
      id: 'sheet-' + this.id,
      'class': 'sheet'
    });

    this.el.appendChild(createLabelRow());

    for(var j = 1; j <= numRows; j++) {
      this.el.appendChild(createRow(j));
    }

    document.getElementById('sheets').appendChild(this.el);
  }

  SpreadSheet.prototype.show = function spreadSheetLoad() {
    this.el.classList.add('active');
  };

  SpreadSheet.prototype.show = function spreadSheetLoad() {
    this.el.classList.remove('active');
  };

  SpreadSheet.prototype.load = function spreadSheetLoad(data) {
    // TODO: load data
  };

  return SpreadSheet;
});
