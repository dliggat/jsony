define(function(require) {
  var utils = require('utils');

  var selectedEl = utils.createElement('div', { 'class': 'selected' });

  function Cell(row, col) {
    var el = utils.createElement('div', {
      'class': 'cell cell-data col-' + utils.columnName(col)
    });

    var textarea = utils.createElement('textarea');

    var view = utils.createElement('div', { 'class': 'view' });

    textarea.addEventListener('blur', function(e) {
      view.textContent = textarea.value;
      this.viewMode();
    }.bind(this), false);

    el.appendChild(textarea);
    el.appendChild(view);

    el.dataset.row = row;
    el.dataset.column = col;

    this.el = el;
  }

  Cell.prototype.select = function() {
    this.isSelected = true;
    this.el.classList.add('selected');
    this.el.appendChild(selectedEl);
  };

  Cell.prototype.unSelect = function() {
    this.isSelected = false;
    this.el.classList.remove('selected');
    if(selectedEl.parentNode === this.el) {
      this.el.removeChild(selectedEl);
    }
  };

  Cell.prototype.viewMode = function() {
    this.el.classList.remove('edit');
  };

  Cell.prototype.editMode = function() {
    this.el.classList.add('edit');
    this.el.querySelector('textarea').focus();
  };

  return Cell;
});
