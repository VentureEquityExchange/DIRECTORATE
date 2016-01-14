/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _stylePropable = require('./mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _autoPrefix = require('./styles/auto-prefix');
var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
var _themeManager = require('./styles/theme-manager');
var _themeManager2 = _interopRequireDefault(_themeManager);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}
var BeforeAfterWrapper = _react2.default.createClass({
  displayName: 'BeforeAfterWrapper',
  propTypes: {
    afterElementType: _react2.default.PropTypes.string,
    afterStyle: _react2.default.PropTypes.object,
    beforeElementType: _react2.default.PropTypes.string,
    beforeStyle: _react2.default.PropTypes.object,
    children: _react2.default.PropTypes.node,
    elementType: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default],
  getDefaultProps: function getDefaultProps() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div'
    };
  },
  getInitialState: function getInitialState() {
    return {muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)};
  },
  getChildContext: function getChildContext() {
    return {muiTheme: this.state.muiTheme};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },
  render: function render() {
    var _props = this.props;
    var beforeStyle = _props.beforeStyle;
    var afterStyle = _props.afterStyle;
    var beforeElementType = _props.beforeElementType;
    var afterElementType = _props.afterElementType;
    var elementType = _props.elementType;
    var other = _objectWithoutProperties(_props, ['beforeStyle', 'afterStyle', 'beforeElementType', 'afterElementType', 'elementType']);
    var beforeElement = undefined,
        afterElement = undefined;
    beforeStyle = _autoPrefix2.default.all({boxSizing: 'border-box'});
    afterStyle = _autoPrefix2.default.all({boxSizing: 'border-box'});
    if (this.props.beforeStyle)
      beforeElement = _react2.default.createElement(this.props.beforeElementType, {
        style: this.prepareStyles(beforeStyle, this.props.beforeStyle),
        key: '::before'
      });
    if (this.props.afterStyle)
      afterElement = _react2.default.createElement(this.props.afterElementType, {
        style: this.prepareStyles(afterStyle, this.props.afterStyle),
        key: '::after'
      });
    var children = [beforeElement, this.props.children, afterElement];
    var props = other;
    props.style = this.prepareStyles(this.props.style);
    return _react2.default.createElement(this.props.elementType, props, children);
  }
});
exports.default = BeforeAfterWrapper;
module.exports = exports['default'];
