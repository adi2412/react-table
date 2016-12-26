'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTable = function (_React$Component) {
  _inherits(ReactTable, _React$Component);

  _createClass(ReactTable, null, [{
    key: 'propTypes',
    value: function propTypes() {
      return {
        data: _react.PropTypes.array,
        columns: _react.PropTypes.array,
        onPageChange: _react.PropTypes.func,
        onSort: _react.PropTypes.func,
        onFilter: _react.PropTypes.func
      };
    }
  }]);

  function ReactTable(props) {
    _classCallCheck(this, ReactTable);

    // Initial setup
    var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this, props));

    _this.initialState = {};

    if (props.onPageChange) {
      _this.initialState.currentPage = 1;
      _this.initialState.lastObject = props.data[props.data.length - 1];
    }
    if (props.onFilter) {
      _this.initialState.filterInput = '';
    }

    _this.state = _this.initialState;
    return _this;
  }

  _createClass(ReactTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Might have unnecessary updates.
      this.setState({ lastObject: nextProps.data[nextProps.data.length - 1] });
    }
  }, {
    key: 'sortColumn',
    value: function sortColumn(column) {
      if (this.props.onSort) {
        this.props.onSort(column);
      }
    }
  }, {
    key: 'generateColumn',
    value: function generateColumn(col, index) {
      return _react2.default.createElement(
        'th',
        { key: col.name, onClick: this.sortColumn.bind(this, col) },
        col.name
      );
    }
  }, {
    key: 'showPrevious',
    value: function showPrevious() {
      if (this.props.onPageChange) {
        this.props.onPageChange(this.state.currentPage, this.state.lastObject, this.state.currentPage - 1);
        this.setState({ currentPage: this.state.currentPage - 1 });
      }
    }
  }, {
    key: 'showNext',
    value: function showNext() {
      if (this.props.onPageChange) {
        this.props.onPageChange(this.state.currentPage, this.state.lastObject, this.state.currentPage + 1);
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    }
  }, {
    key: 'renderPagination',
    value: function renderPagination() {
      return _react2.default.createElement(
        'div',
        { className: 'rt-pagination' },
        this.state.currentPage != 1 ? _react2.default.createElement(
          'div',
          { className: 'previous-page' },
          _react2.default.createElement(
            'a',
            { onClick: this.showPrevious.bind(this) },
            'Previous'
          )
        ) : '',
        _react2.default.createElement(
          'div',
          { className: 'next-page' },
          _react2.default.createElement(
            'a',
            { onClick: this.showNext.bind(this) },
            'Next'
          )
        )
      );
    }
  }, {
    key: 'onFilterInputChange',
    value: function onFilterInputChange(e) {
      this.setState({ filterInput: e.target.value });
      if (this.props.onFilter) {
        this.props.onFilter(e.target.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          columns = _props.columns,
          onPageChange = _props.onPageChange,
          onFilter = _props.onFilter,
          onSort = _props.onSort,
          props = _objectWithoutProperties(_props, ['data', 'columns', 'onPageChange', 'onFilter', 'onSort']);

      return _react2.default.createElement(
        'div',
        { className: 'react-table' },
        this.props.onFilter ? _react2.default.createElement(
          'div',
          { className: 'rt-filter' },
          _react2.default.createElement('input', { type: 'text', placeholder: 'Search table', value: this.state.filterInput, onChange: this.onFilterInputChange.bind(this) })
        ) : '',
        _react2.default.createElement(
          'table',
          props,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              { key: 'table-header' },
              this.props.columns.map(this.generateColumn, this)
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.props.data.map(function (row, rowIndex) {
              return _react2.default.createElement(
                'tr',
                { key: rowIndex },
                _this2.props.columns.map(function (col, colIndex) {
                  var rowHtml = void 0;

                  if (typeof col.accessor === "function") {
                    rowHtml = _react2.default.createElement(
                      'td',
                      { key: col.name + rowIndex },
                      col.accessor(row, rowIndex)
                    );
                  } else {
                    rowHtml = _react2.default.createElement(
                      'td',
                      { key: col.name + rowIndex },
                      row[col.accessor.toString()]
                    );
                  }

                  return rowHtml;
                })
              );
            })
          )
        ),
        this.props.onPageChange ? this.renderPagination() : ''
      );
    }
  }]);

  return ReactTable;
}(_react2.default.Component);

exports.default = ReactTable;