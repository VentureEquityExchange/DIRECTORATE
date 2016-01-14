/* */ 
'use strict';
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _stylePropable = require('../mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _textField = require('../text-field');
var _textField2 = _interopRequireDefault(_textField);
var _DropDownMenu = require('../DropDownMenu/index');
var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);
var _lightRawTheme = require('../styles/raw-themes/light-raw-theme');
var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
var _themeManager = require('../styles/theme-manager');
var _themeManager2 = _interopRequireDefault(_themeManager);
var _contextPure = require('../mixins/context-pure');
var _contextPure2 = _interopRequireDefault(_contextPure);
var _deprecatedPropType = require('../utils/deprecatedPropType');
var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
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
var SelectField = _react2.default.createClass({
  displayName: 'SelectField',
  propTypes: {
    autoWidth: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    disabled: _react2.default.PropTypes.bool,
    errorStyle: _react2.default.PropTypes.object,
    errorText: _react2.default.PropTypes.node,
    floatingLabelStyle: _react2.default.PropTypes.object,
    floatingLabelText: _react2.default.PropTypes.node,
    fullWidth: _react2.default.PropTypes.bool,
    hintStyle: _react2.default.PropTypes.object,
    hintText: _react2.default.PropTypes.node,
    iconStyle: _react2.default.PropTypes.object,
    labelMember: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'to promote composability.'),
    labelStyle: _react2.default.PropTypes.object,
    menuItems: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.array, 'to promote composability.'),
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    selectFieldRoot: _react2.default.PropTypes.object,
    selectedIndex: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.number, 'with menuItems.'),
    style: _react2.default.PropTypes.object,
    underlineDisabledStyle: _react2.default.PropTypes.object,
    underlineFocusStyle: _react2.default.PropTypes.object,
    underlineStyle: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.any
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default, _contextPure2.default],
  statics: {getChildrenClasses: function getChildrenClasses() {
      return [_textField2.default, _DropDownMenu2.default];
    }},
  getDefaultProps: function getDefaultProps() {
    return {
      autoWidth: false,
      disabled: false,
      fullWidth: false
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
  getStyles: function getStyles() {
    var floatingLabelText = this.props.floatingLabelText;
    return {
      label: {
        paddingLeft: 0,
        top: floatingLabelText ? 6 : -4
      },
      icon: {
        right: 0,
        top: floatingLabelText ? 22 : 14
      },
      hideDropDownUnderline: {borderTop: 'none'}
    };
  },
  render: function render() {
    var styles = this.getStyles();
    var _props = this.props;
    var autoWidth = _props.autoWidth;
    var children = _props.children;
    var style = _props.style;
    var labelStyle = _props.labelStyle;
    var iconStyle = _props.iconStyle;
    var underlineDisabledStyle = _props.underlineDisabledStyle;
    var underlineFocusStyle = _props.underlineFocusStyle;
    var underlineStyle = _props.underlineStyle;
    var errorStyle = _props.errorStyle;
    var selectFieldRoot = _props.selectFieldRoot;
    var disabled = _props.disabled;
    var floatingLabelText = _props.floatingLabelText;
    var floatingLabelStyle = _props.floatingLabelStyle;
    var hintStyle = _props.hintStyle;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var errorText = _props.errorText;
    var onFocus = _props.onFocus;
    var onBlur = _props.onBlur;
    var onChange = _props.onChange;
    var value = _props.value;
    var other = _objectWithoutProperties(_props, ['autoWidth', 'children', 'style', 'labelStyle', 'iconStyle', 'underlineDisabledStyle', 'underlineFocusStyle', 'underlineStyle', 'errorStyle', 'selectFieldRoot', 'disabled', 'floatingLabelText', 'floatingLabelStyle', 'hintStyle', 'hintText', 'fullWidth', 'errorText', 'onFocus', 'onBlur', 'onChange', 'value']);
    return _react2.default.createElement(_textField2.default, {
      style: style,
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      hintStyle: hintStyle,
      hintText: !hintText && !floatingLabelText ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      underlineStyle: underlineStyle,
      errorStyle: errorStyle,
      onFocus: onFocus,
      onBlur: onBlur,
      underlineDisabledStyle: underlineDisabledStyle,
      underlineFocusStyle: underlineFocusStyle
    }, _react2.default.createElement(_DropDownMenu2.default, _extends({
      disabled: disabled,
      style: selectFieldRoot,
      labelStyle: this.mergeStyles(styles.label, labelStyle),
      iconStyle: this.mergeStyles(styles.icon, iconStyle),
      underlineStyle: styles.hideDropDownUnderline,
      autoWidth: autoWidth,
      value: value,
      onChange: onChange
    }, other), children));
  }
});
exports.default = SelectField;
module.exports = exports['default'];
