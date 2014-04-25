define(function(require) {
  var utils = require('utils');
  var Cell = require('cell');

  var DEFAULTWIDTH = 100;

  function createStyleSheet(id, numCols, widths) {
    var width = widths[0];
    var left = width - 1;

    var rules = '#sheet-' + id + ' .cell.label-col {' +
        'left: 0; ' +
        'width: ' + width +  'px;' +
      '}\n';

    for(var i = 1; i <= numCols; i++) {
      width = widths[i] || DEFAULTWIDTH;
      rules += '' +
        '#sheet-' + id + ' .cell.col-' + utils.columnName(i) + ' {' +
          'left: ' + left +  'px; ' +
          'width: ' + width +  'px;' +
        '}' +
        '\n';
      left += width - 1;
    }

    return utils.customStyleSheet(rules);
  }

  function createLabelRow(numCols) {
    var labelRow = utils.createElement('div', { 'class': 'label-row' });

    var emptyEl = createLabelCell('label-col label-empty');

    labelRow.appendChild(emptyEl);

    for(var i = 1; i <= numCols; i++) {
      var name = utils.columnName(i);
      var cell = createLabelCell('col-' + name, name);
      var handle = utils.createElement('div', { 'class': 'handle' });
      cell.appendChild(handle);
      labelRow.appendChild(cell);
    }

    return labelRow;
  }

  function createLabelCell(className, text) {
    return utils.createElement('div', {
      'class': 'cell label ' + className
    }, text);
  }

  var count = 0;

  function SpreadSheet() {
    // var stylesheet = css.sheet;

    this.id = count++;

    this.cells = [];
    // this.selection = [1, 1];

    this.el = utils.createElement('div', {
      id: 'sheet-' + this.id,
      'class': 'sheet'
    });

    this.el.addEventListener('dblclick', function(e) {
      var target = e.target;

      var cellEl = utils.findAncestor(e.target, 'cell-data');

      if(cellEl) {
        var row = +cellEl.dataset.row;
        var col = +cellEl.dataset.column;
        this.cells[row - 1][col - 1].editMode();
      }
    }.bind(this), false);

    this.el.addEventListener('click', function(e) {
      var target = e.target;

      var cellEl = utils.findAncestor(e.target, 'cell-data');

      if(cellEl) {
        var row = +cellEl.dataset.row;
        var col = +cellEl.dataset.column;
        this.currentCell.unSelect();
        this.currentCell = this.cells[row - 1][col - 1];
        this.currentCell.select();
      }
    }.bind(this), false);

    // TODO: compute rows cols that will fit in viewport
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

    var createRow = function createRow(num) {
      var row = utils.createElement('div', {
        'class': 'row'
      });

      var label = createLabelCell('label-col', num);
      row.appendChild(label);

      var cells = [];
      for(var i = 1; i <= numCols; i++) {
        var cell = new Cell(num, i);
        row.appendChild(cell.el);
        cells.push(cell);
      }
      this.cells.push(cells);

      return row;
    }.bind(this);

    this.el.appendChild(createLabelRow(numCols));

    for(var j = 1; j <= numRows; j++) {
      this.el.appendChild(createRow(j));
    }

    this.currentCell = this.cells[0][0];
    this.currentCell.select();

    utils.$('#sheets').appendChild(this.el);
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
