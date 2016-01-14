/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = require('react-dom');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _keyCode = require('./utils/key-code');
  var _keyCode2 = _interopRequireDefault(_keyCode);
  var _stylePropable = require('./mixins/style-propable');
  var _stylePropable2 = _interopRequireDefault(_stylePropable);
  var _autoPrefix = require('./styles/auto-prefix');
  var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
  var _transitions = require('./styles/transitions');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _windowListenable = require('./mixins/window-listenable');
  var _windowListenable2 = _interopRequireDefault(_windowListenable);
  var _overlay = require('./overlay');
  var _overlay2 = _interopRequireDefault(_overlay);
  var _paper = require('./paper');
  var _paper2 = _interopRequireDefault(_paper);
  var _menu = require('./menu/menu');
  var _menu2 = _interopRequireDefault(_menu);
  var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
  var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
  var _themeManager = require('./styles/theme-manager');
  var _themeManager2 = _interopRequireDefault(_themeManager);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var _deprecatedPropType = require('./utils/deprecatedPropType');
  var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var openNavEventHandler = null;
  var LeftNav = _react2.default.createClass({
    displayName: 'LeftNav',
    propTypes: {
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      disableSwipeToOpen: _react2.default.PropTypes.bool,
      docked: _react2.default.PropTypes.bool,
      header: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.element, 'Instead, use composability.'),
      menuItemClassName: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'It will be removed with menuItems.'),
      menuItemClassNameLink: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'It will be removed with menuItems.'),
      menuItemClassNameSubheader: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'It will be removed with menuItems.'),
      menuItems: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.array, 'Instead, use composability.'),
      onChange: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.func, 'It will be removed with menuItems.'),
      onNavClose: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.func, 'Instead, use onRequestChange.'),
      onNavOpen: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.func, 'Instead, use onRequestChange.'),
      onRequestChange: _react2.default.PropTypes.func,
      open: _react2.default.PropTypes.bool,
      openRight: _react2.default.PropTypes.bool,
      overlayClassName: _react2.default.PropTypes.string,
      overlayStyle: _react2.default.PropTypes.object,
      selectedIndex: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.number, 'It will be removed with menuItems.'),
      style: _react2.default.PropTypes.object,
      swipeAreaWidth: _react2.default.PropTypes.number,
      width: _react2.default.PropTypes.number
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_stylePropable2.default, _windowListenable2.default],
    getDefaultProps: function getDefaultProps() {
      return {
        disableSwipeToOpen: false,
        docked: true,
        open: null,
        openRight: false,
        swipeAreaWidth: 30,
        width: null
      };
    },
    getInitialState: function getInitialState() {
      this._maybeSwiping = false;
      this._touchStartX = null;
      this._touchStartY = null;
      this._swipeStartX = null;
      return {
        open: this.props.open !== null ? this.props.open : this.props.docked,
        swiping: null,
        muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)
      };
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentDidMount: function componentDidMount() {
      this._updateMenuHeight();
      this._enableSwipeHandling();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      var newState = {muiTheme: newMuiTheme};
      if (this.props.docked !== nextProps.docked)
        newState.open = nextProps.docked;
      if (nextProps.open !== null)
        newState.open = nextProps.open;
      this.setState(newState);
    },
    componentDidUpdate: function componentDidUpdate() {
      this._updateMenuHeight();
      this._enableSwipeHandling();
    },
    componentWillUnmount: function componentWillUnmount() {
      this._disableSwipeHandling();
    },
    windowListeners: {
      keyup: '_onWindowKeyUp',
      resize: '_onWindowResize'
    },
    toggle: function toggle() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
      if (this.state.open)
        this.close();
      else
        this.open();
      return this;
    },
    close: function close() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
      this.setState({open: false});
      if (this.props.onNavClose)
        this.props.onNavClose();
      return this;
    },
    open: function open() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'using methods on left nav has been deprecated. Please refer to documentations.') : undefined;
      this.setState({open: true});
      if (this.props.onNavOpen)
        this.props.onNavOpen();
      return this;
    },
    getStyles: function getStyles() {
      var muiTheme = this.state.muiTheme;
      var theme = muiTheme.leftNav;
      var rawTheme = muiTheme.rawTheme;
      var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
      var styles = {
        root: {
          height: '100%',
          width: this.props.width || theme.width,
          position: 'fixed',
          zIndex: muiTheme.zIndex.leftNav,
          left: 0,
          top: 0,
          transform: 'translate3d(' + x + 'px, 0, 0)',
          transition: !this.state.swiping && _transitions2.default.easeOut(null, 'transform', null),
          backgroundColor: theme.color,
          overflow: 'auto'
        },
        menu: {
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100%',
          borderRadius: '0'
        },
        overlay: {
          zIndex: muiTheme.zIndex.leftNavOverlay,
          pointerEvents: this.state.open ? 'auto' : 'none'
        },
        menuItem: {
          height: rawTheme.spacing.desktopLeftNavMenuItemHeight,
          lineHeight: rawTheme.spacing.desktopLeftNavMenuItemHeight + 'px'
        },
        rootWhenOpenRight: {
          left: 'auto',
          right: 0
        }
      };
      styles.menuItemLink = this.mergeStyles(styles.menuItem, {
        display: 'block',
        textDecoration: 'none',
        color: rawTheme.palette.textColor
      });
      styles.menuItemSubheader = this.mergeStyles(styles.menuItem, {overflow: 'hidden'});
      return styles;
    },
    _shouldShow: function _shouldShow() {
      return this.state.open || !!this.state.swiping;
    },
    _close: function _close(reason) {
      if (this.props.open === null)
        this.setState({open: false});
      if (this.props.onRequestChange)
        this.props.onRequestChange(false, reason);
      return this;
    },
    _open: function _open(reason) {
      if (this.props.open === null)
        this.setState({open: true});
      if (this.props.onRequestChange)
        this.props.onRequestChange(true, reason);
      return this;
    },
    _updateMenuHeight: function _updateMenuHeight() {
      if (this.props.header) {
        var menu = _reactDom2.default.findDOMNode(this.refs.menuItems);
        if (menu) {
          var container = _reactDom2.default.findDOMNode(this.refs.clickAwayableElement);
          var menuHeight = container.clientHeight - menu.offsetTop;
          menu.style.height = menuHeight + 'px';
        }
      }
    },
    _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
      if (this.props.onChange && this.props.selectedIndex !== key) {
        this.props.onChange(e, key, payload);
      }
      if (!this.props.docked)
        this._close('clickaway');
    },
    _onOverlayTouchTap: function _onOverlayTouchTap(event) {
      event.preventDefault();
      this._close('clickaway');
    },
    _onWindowKeyUp: function _onWindowKeyUp(e) {
      if (e.keyCode === _keyCode2.default.ESC && !this.props.docked && this.state.open) {
        this._close('escape');
      }
    },
    _onWindowResize: function _onWindowResize() {
      this._updateMenuHeight();
    },
    _getMaxTranslateX: function _getMaxTranslateX() {
      var width = this.props.width || this.state.muiTheme.leftNav.width;
      return width + 10;
    },
    _getTranslateMultiplier: function _getTranslateMultiplier() {
      return this.props.openRight ? 1 : -1;
    },
    _enableSwipeHandling: function _enableSwipeHandling() {
      if (!this.props.docked) {
        document.body.addEventListener('touchstart', this._onBodyTouchStart);
        if (!openNavEventHandler) {
          openNavEventHandler = this._onBodyTouchStart;
        }
      } else {
        this._disableSwipeHandling();
      }
    },
    _disableSwipeHandling: function _disableSwipeHandling() {
      document.body.removeEventListener('touchstart', this._onBodyTouchStart);
      if (openNavEventHandler === this._onBodyTouchStart) {
        openNavEventHandler = null;
      }
    },
    _onBodyTouchStart: function _onBodyTouchStart(e) {
      var swipeAreaWidth = this.props.swipeAreaWidth;
      var touchStartX = e.touches[0].pageX;
      var touchStartY = e.touches[0].pageY;
      if (swipeAreaWidth !== null && !this.state.open) {
        if (this.props.openRight) {
          if (touchStartX < document.body.offsetWidth - swipeAreaWidth)
            return;
        } else {
          if (touchStartX > swipeAreaWidth)
            return;
        }
      }
      if (!this.state.open && (openNavEventHandler !== this._onBodyTouchStart || this.props.disableSwipeToOpen)) {
        return;
      }
      this._maybeSwiping = true;
      this._touchStartX = touchStartX;
      this._touchStartY = touchStartY;
      document.body.addEventListener('touchmove', this._onBodyTouchMove);
      document.body.addEventListener('touchend', this._onBodyTouchEnd);
      document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
    },
    _setPosition: function _setPosition(translateX) {
      var leftNav = _reactDom2.default.findDOMNode(this.refs.clickAwayableElement);
      var transformCSS = 'translate3d(' + this._getTranslateMultiplier() * translateX + 'px, 0, 0)';
      this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
      _autoPrefix2.default.set(leftNav.style, 'transform', transformCSS);
    },
    _getTranslateX: function _getTranslateX(currentX) {
      return Math.min(Math.max(this.state.swiping === 'closing' ? this._getTranslateMultiplier() * (currentX - this._swipeStartX) : this._getMaxTranslateX() - this._getTranslateMultiplier() * (this._swipeStartX - currentX), 0), this._getMaxTranslateX());
    },
    _onBodyTouchMove: function _onBodyTouchMove(e) {
      var currentX = e.touches[0].pageX;
      var currentY = e.touches[0].pageY;
      if (this.state.swiping) {
        e.preventDefault();
        this._setPosition(this._getTranslateX(currentX));
      } else if (this._maybeSwiping) {
        var dXAbs = Math.abs(currentX - this._touchStartX);
        var dYAbs = Math.abs(currentY - this._touchStartY);
        var threshold = 10;
        if (dXAbs > threshold && dYAbs <= threshold) {
          this._swipeStartX = currentX;
          this.setState({swiping: this.state.open ? 'closing' : 'opening'});
          this._setPosition(this._getTranslateX(currentX));
        } else if (dXAbs <= threshold && dYAbs > threshold) {
          this._onBodyTouchEnd();
        }
      }
    },
    _onBodyTouchEnd: function _onBodyTouchEnd(e) {
      if (this.state.swiping) {
        var currentX = e.changedTouches[0].pageX;
        var translateRatio = this._getTranslateX(currentX) / this._getMaxTranslateX();
        this._maybeSwiping = false;
        var swiping = this.state.swiping;
        this.setState({swiping: null});
        if (translateRatio > 0.5) {
          if (swiping === 'opening') {
            this._setPosition(this._getMaxTranslateX());
          } else {
            this._close('swipe');
          }
        } else {
          if (swiping === 'opening') {
            this._open('swipe');
          } else {
            this._setPosition(0);
          }
        }
      } else {
        this._maybeSwiping = false;
      }
      document.body.removeEventListener('touchmove', this._onBodyTouchMove);
      document.body.removeEventListener('touchend', this._onBodyTouchEnd);
      document.body.removeEventListener('touchcancel', this._onBodyTouchEnd);
    },
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var docked = _props.docked;
      var header = _props.header;
      var menuItemClassName = _props.menuItemClassName;
      var menuItemClassNameSubheader = _props.menuItemClassNameSubheader;
      var menuItemClassNameLink = _props.menuItemClassNameLink;
      var menuItems = _props.menuItems;
      var openRight = _props.openRight;
      var overlayClassName = _props.overlayClassName;
      var overlayStyle = _props.overlayStyle;
      var selectedIndex = _props.selectedIndex;
      var style = _props.style;
      var styles = this.getStyles();
      var overlay = undefined;
      if (!docked) {
        overlay = _react2.default.createElement(_overlay2.default, {
          ref: 'overlay',
          show: this._shouldShow(),
          className: overlayClassName,
          style: this.mergeStyles(styles.overlay, overlayStyle),
          transitionEnabled: !this.state.swiping,
          onTouchTap: this._onOverlayTouchTap
        });
      }
      var children = undefined;
      if (menuItems === undefined) {
        children = this.props.children;
      } else {
        children = _react2.default.createElement(_menu2.default, {
          ref: 'menuItems',
          style: this.mergeStyles(styles.menu),
          zDepth: 0,
          menuItems: menuItems,
          menuItemStyle: this.mergeStyles(styles.menuItem),
          menuItemStyleLink: this.mergeStyles(styles.menuItemLink),
          menuItemStyleSubheader: this.mergeStyles(styles.menuItemSubheader),
          menuItemClassName: menuItemClassName,
          menuItemClassNameSubheader: menuItemClassNameSubheader,
          menuItemClassNameLink: menuItemClassNameLink,
          selectedIndex: selectedIndex,
          onItemTap: this._onMenuItemClick
        });
      }
      return _react2.default.createElement('div', null, overlay, _react2.default.createElement(_paper2.default, {
        ref: 'clickAwayableElement',
        zDepth: 2,
        rounded: false,
        transitionEnabled: !this.state.swiping,
        className: className,
        style: this.mergeStyles(styles.root, openRight && styles.rootWhenOpenRight, style)
      }, header, children));
    }
  });
  exports.default = LeftNav;
  module.exports = exports['default'];
})(require('process'));
