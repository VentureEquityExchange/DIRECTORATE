/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _immutabilityHelper = require('../utils/immutability-helper');
var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);
var _styles = require('../utils/styles');
var _styles2 = _interopRequireDefault(_styles);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
exports.default = {
  propTypes: {style: _react2.default.PropTypes.object},
  mergeStyles: function mergeStyles() {
    return _immutabilityHelper2.default.merge.apply(this, arguments);
  },
  mergeAndPrefix: function mergeAndPrefix() {
    return _styles2.default.mergeAndPrefix.apply(this, arguments);
  },
  prepareStyles: function prepareStyles() {
    return _styles2.default.prepareStyles.apply(_styles2.default, [this.state && this.state.muiTheme || this.context.muiTheme].concat([].slice.apply(arguments)));
  }
};
module.exports = exports['default'];
