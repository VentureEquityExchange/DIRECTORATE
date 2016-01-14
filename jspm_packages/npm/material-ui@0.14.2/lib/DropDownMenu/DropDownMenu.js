/* */ 
(function(process) {
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
  var _transitions = require('../styles/transitions');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _arrowDropDown = require('../svg-icons/navigation/arrow-drop-down');
  var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);
  var _menu = require('../menus/menu');
  var _menu2 = _interopRequireDefault(_menu);
  var _menuItem = require('../menus/menu-item');
  var _menuItem2 = _interopRequireDefault(_menuItem);
  var _lightRawTheme = require('../styles/raw-themes/light-raw-theme');
  var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
  var _clearfix = require('../clearfix');
  var _clearfix2 = _interopRequireDefault(_clearfix);
  var _themeManager = require('../styles/theme-manager');
  var _themeManager2 = _interopRequireDefault(_themeManager);
  var _popover = require('../popover/popover');
  var _popover2 = _interopRequireDefault(_popover);
  var _popoverAnimationFromTop = require('../popover/popover-animation-from-top');
  var _popoverAnimationFromTop2 = _interopRequireDefault(_popoverAnimationFromTop);
  var _styles = require('../utils/styles');
  var _styles2 = _interopRequireDefault(_styles);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
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
  var DropDownMenu = _react2.default.createClass({
    displayName: 'DropDownMenu',
    propTypes: {
      autoWidth: _react2.default.PropTypes.bool,
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      disabled: _react2.default.PropTypes.bool,
      displayMember: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'Instead, use composability.'),
      iconStyle: _react2.default.PropTypes.object,
      labelMember: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'Instead, use composability.'),
      labelStyle: _react2.default.PropTypes.object,
      maxHeight: _react2.default.PropTypes.number,
      menuItems: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.array, 'Instead, use composability.'),
      menuStyle: _react2.default.PropTypes.object,
      onChange: _react2.default.PropTypes.func,
      openImmediately: _react2.default.PropTypes.bool,
      selectedIndex: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.number, 'Use value instead to control the component.'),
      style: _react2.default.PropTypes.object,
      underlineStyle: _react2.default.PropTypes.object,
      value: _react2.default.PropTypes.any,
      valueLink: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.object, 'It\'s deprecated by React too.'),
      valueMember: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'Instead, use composability.')
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    getDefaultProps: function getDefaultProps() {
      return {
        autoWidth: true,
        disabled: false,
        openImmediately: false,
        maxHeight: 500
      };
    },
    getInitialState: function getInitialState() {
      return {
        open: this.props.openImmediately,
        selectedIndex: this._isControlled() ? null : this.props.selectedIndex || 0,
        muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)
      };
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentDidMount: function componentDidMount() {
      if (this.props.autoWidth)
        this._setWidth();
      if (this.props.hasOwnProperty('selectedIndex'))
        this._setSelectedIndex(this.props.selectedIndex);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
      if (this.props.autoWidth)
        this._setWidth();
      if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
        return;
      } else if (nextProps.hasOwnProperty('selectedIndex')) {
        this._setSelectedIndex(nextProps.selectedIndex);
      }
    },
    getStyles: function getStyles() {
      var disabled = this.props.disabled;
      var spacing = this.state.muiTheme.rawTheme.spacing;
      var palette = this.state.muiTheme.rawTheme.palette;
      var accentColor = this.state.muiTheme.dropDownMenu.accentColor;
      return {
        control: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          height: '100%',
          position: 'relative',
          width: '100%'
        },
        icon: {
          fill: accentColor,
          position: 'absolute',
          right: spacing.desktopGutterLess,
          top: (spacing.desktopToolbarHeight - 24) / 2
        },
        label: {
          color: disabled ? palette.disabledColor : palette.textColor,
          lineHeight: spacing.desktopToolbarHeight + 'px',
          opacity: 1,
          position: 'relative',
          paddingLeft: spacing.desktopGutter,
          paddingRight: spacing.iconSize + spacing.desktopGutterLess + spacing.desktopGutterMini,
          top: 0
        },
        labelWhenOpen: {
          opacity: 0,
          top: spacing.desktopToolbarHeight / 8
        },
        rootWhenOpen: {opacity: 1},
        root: {
          display: 'inline-block',
          fontSize: spacing.desktopDropDownMenuFontSize,
          height: spacing.desktopSubheaderHeight,
          fontFamily: this.state.muiTheme.rawTheme.fontFamily,
          outline: 'none',
          position: 'relative',
          transition: _transitions2.default.easeOut()
        },
        underline: {
          borderTop: 'solid 1px ' + accentColor,
          bottom: 1,
          left: 0,
          margin: '-1px ' + spacing.desktopGutter + 'px',
          right: 0,
          position: 'absolute'
        }
      };
    },
    getInputNode: function getInputNode() {
      var _this = this;
      var root = this.refs.root;
      var item = this.props.menuItems && this.props.menuItems[this.state.selectedIndex];
      if (item) {
        root.value = item[this.props.displayMember || 'text'];
      }
      root.focus = function() {
        if (!_this.props.disabled) {
          _this.setState({
            open: !_this.state.open,
            anchorEl: _this.refs.root
          });
        }
      };
      return root;
    },
    _setWidth: function _setWidth() {
      var el = this.refs.root;
      if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
        el.style.width = 'auto';
      }
    },
    _setSelectedIndex: function _setSelectedIndex(index) {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(index >= 0, 'Cannot set selectedIndex to a negative index.') : undefined;
      this.setState({selectedIndex: index >= 0 ? index : 0});
    },
    _onControlTouchTap: function _onControlTouchTap(event) {
      event.preventDefault();
      if (!this.props.disabled) {
        this.setState({
          open: !this.state.open,
          anchorEl: this.refs.root
        });
      }
    },
    _onMenuItemTouchTap: function _onMenuItemTouchTap(key, payload, e) {
      var _props = this.props;
      var onChange = _props.onChange;
      var menuItems = _props.menuItems;
      var value = _props.value;
      var valueLink = _props.valueLink;
      var valueMember = _props.valueMember;
      if (menuItems && (this.state.selectedIndex !== key || e.target.value !== value)) {
        var selectedItem = menuItems[key];
        if (selectedItem) {
          e.target.value = selectedItem[valueMember || 'payload'];
        }
        this._onMenuRequestClose();
      }
      if (valueLink) {
        valueLink.requestChange(e.target.value);
      } else if (onChange) {
        onChange(e, key, payload);
      }
      this.setState({
        selectedIndex: key,
        open: false
      });
    },
    _onMenuRequestClose: function _onMenuRequestClose() {
      this.setState({
        open: false,
        anchorEl: null
      });
    },
    _isControlled: function _isControlled() {
      return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
    },
    render: function render() {
      var _this2 = this;
      var _props2 = this.props;
      var autoWidth = _props2.autoWidth;
      var children = _props2.children;
      var className = _props2.className;
      var displayMember = _props2.displayMember;
      var iconStyle = _props2.iconStyle;
      var labelMember = _props2.labelMember;
      var labelStyle = _props2.labelStyle;
      var maxHeight = _props2.maxHeight;
      var menuItems = _props2.menuItems;
      var menuStyle = _props2.menuStyle;
      var style = _props2.style;
      var underlineStyle = _props2.underlineStyle;
      var valueLink = _props2.valueLink;
      var _props2$valueMember = _props2.valueMember;
      var valueMember = _props2$valueMember === undefined ? 'payload' : _props2$valueMember;
      var other = _objectWithoutProperties(_props2, ['autoWidth', 'children', 'className', 'displayMember', 'iconStyle', 'labelMember', 'labelStyle', 'maxHeight', 'menuItems', 'menuStyle', 'style', 'underlineStyle', 'valueLink', 'valueMember']);
      var _state = this.state;
      var anchorEl = _state.anchorEl;
      var open = _state.open;
      var muiTheme = _state.muiTheme;
      var styles = this.getStyles();
      var value = undefined;
      var selectedIndex = this._isControlled() ? null : this.state.selectedIndex;
      if (menuItems && typeof selectedIndex === 'number') {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(menuItems[selectedIndex], 'SelectedIndex of ' + selectedIndex + ' does not exist in menuItems.') : undefined;
      }
      if (valueMember && this._isControlled()) {
        value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
        if (menuItems && value !== null && value !== undefined) {
          for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i][valueMember] === value) {
              selectedIndex = i;
            }
          }
        }
      }
      var displayValue = '';
      if (menuItems) {
        var selectedItem = menuItems[selectedIndex];
        if (selectedItem) {
          displayValue = selectedItem[labelMember || 'text'] || selectedItem[displayMember || 'text'];
        }
      } else {
        _react2.default.Children.forEach(children, function(child) {
          if (value === child.props.value) {
            displayValue = child.props.label || child.props.primaryText;
          }
        });
      }
      var index = 0;
      var menuItemElements = menuItems ? menuItems.map(function(item, idx) {
        return _react2.default.createElement(_menuItem2.default, {
          key: idx,
          primaryText: item[displayMember || 'text'],
          value: item[valueMember],
          onTouchTap: _this2._onMenuItemTouchTap.bind(_this2, idx, item)
        });
      }) : _react2.default.Children.map(children, function(child) {
        var clone = _react2.default.cloneElement(child, {onTouchTap: _this2._onMenuItemTouchTap.bind(_this2, index, child.props.value)}, child.props.children);
        index += 1;
        return clone;
      });
      var popoverStyle = undefined;
      if (anchorEl && !autoWidth) {
        popoverStyle = {width: anchorEl.clientWidth};
      }
      return _react2.default.createElement('div', _extends({}, other, {
        ref: 'root',
        className: className,
        style: _styles2.default.prepareStyles(muiTheme, styles.root, open && styles.rootWhenOpen, style)
      }), _react2.default.createElement(_clearfix2.default, {
        style: _styles2.default.merge(styles.control),
        onTouchTap: this._onControlTouchTap
      }, _react2.default.createElement('div', {style: _styles2.default.prepareStyles(muiTheme, styles.label, open && styles.labelWhenOpen, labelStyle)}, displayValue), _react2.default.createElement(_arrowDropDown2.default, {style: _styles2.default.merge(styles.icon, iconStyle)}), _react2.default.createElement('div', {style: _styles2.default.prepareStyles(muiTheme, styles.underline, underlineStyle)})), _react2.default.createElement(_popover2.default, {
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'top'
        },
        anchorEl: anchorEl,
        style: popoverStyle,
        animation: _popoverAnimationFromTop2.default,
        open: open,
        onRequestClose: this._onMenuRequestClose
      }, _react2.default.createElement(_menu2.default, {
        maxHeight: maxHeight,
        desktop: true,
        value: value,
        style: menuStyle
      }, menuItemElements)));
    }
  });
  exports.default = DropDownMenu;
  module.exports = exports['default'];
})(require('process'));
