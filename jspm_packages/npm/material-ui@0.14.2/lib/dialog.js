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
  var _reactDom = require('react-dom');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _windowListenable = require('./mixins/window-listenable');
  var _windowListenable2 = _interopRequireDefault(_windowListenable);
  var _keyCode = require('./utils/key-code');
  var _keyCode2 = _interopRequireDefault(_keyCode);
  var _transitions = require('./styles/transitions');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _stylePropable = require('./mixins/style-propable');
  var _stylePropable2 = _interopRequireDefault(_stylePropable);
  var _flatButton = require('./flat-button');
  var _flatButton2 = _interopRequireDefault(_flatButton);
  var _overlay = require('./overlay');
  var _overlay2 = _interopRequireDefault(_overlay);
  var _renderToLayer = require('./render-to-layer');
  var _renderToLayer2 = _interopRequireDefault(_renderToLayer);
  var _paper = require('./paper');
  var _paper2 = _interopRequireDefault(_paper);
  var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
  var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
  var _themeManager = require('./styles/theme-manager');
  var _themeManager2 = _interopRequireDefault(_themeManager);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var _deprecatedPropType = require('./utils/deprecatedPropType');
  var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
  var _reactAddonsTransitionGroup = require('react-addons-transition-group');
  var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);
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
  var TransitionItem = _react2.default.createClass({
    displayName: 'TransitionItem',
    propTypes: {
      children: _react2.default.PropTypes.node,
      style: _react2.default.PropTypes.object
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_stylePropable2.default],
    getInitialState: function getInitialState() {
      return {
        style: {},
        muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)
      };
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
    },
    componentWillEnter: function componentWillEnter(callback) {
      this.componentWillAppear(callback);
    },
    componentWillAppear: function componentWillAppear(callback) {
      var spacing = this.state.muiTheme.rawTheme.spacing;
      this.setState({style: {
          opacity: 1,
          transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)'
        }});
      setTimeout(callback, 450);
    },
    componentWillLeave: function componentWillLeave(callback) {
      var _this = this;
      this.setState({style: {
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        }});
      setTimeout(function() {
        if (_this.isMounted())
          callback();
      }, 450);
    },
    render: function render() {
      var _props = this.props;
      var style = _props.style;
      var children = _props.children;
      var other = _objectWithoutProperties(_props, ['style', 'children']);
      return _react2.default.createElement('div', _extends({}, other, {style: this.prepareStyles(this.state.style, style)}), children);
    }
  });
  var DialogInline = _react2.default.createClass({
    displayName: 'DialogInline',
    propTypes: {
      actionFocus: _react2.default.PropTypes.string,
      actions: _react2.default.PropTypes.node,
      actionsContainerClassName: _react2.default.PropTypes.string,
      actionsContainerStyle: _react2.default.PropTypes.object,
      autoDetectWindowHeight: _react2.default.PropTypes.bool,
      autoScrollBodyContent: _react2.default.PropTypes.bool,
      bodyClassName: _react2.default.PropTypes.string,
      bodyStyle: _react2.default.PropTypes.object,
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      contentClassName: _react2.default.PropTypes.string,
      contentStyle: _react2.default.PropTypes.object,
      modal: _react2.default.PropTypes.bool,
      onRequestClose: _react2.default.PropTypes.func,
      open: _react2.default.PropTypes.bool.isRequired,
      overlayClassName: _react2.default.PropTypes.string,
      overlayStyle: _react2.default.PropTypes.object,
      repositionOnUpdate: _react2.default.PropTypes.bool,
      style: _react2.default.PropTypes.object,
      title: _react2.default.PropTypes.node,
      titleClassName: _react2.default.PropTypes.string,
      titleStyle: _react2.default.PropTypes.object,
      width: _react2.default.PropTypes.any
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_windowListenable2.default, _stylePropable2.default],
    getInitialState: function getInitialState() {
      return {muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)};
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentDidMount: function componentDidMount() {
      this._positionDialog();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
    },
    componentDidUpdate: function componentDidUpdate() {
      this._positionDialog();
    },
    windowListeners: {
      keyup: '_handleWindowKeyUp',
      resize: '_handleResize'
    },
    getStyles: function getStyles() {
      var _props2 = this.props;
      var autoScrollBodyContent = _props2.autoScrollBodyContent;
      var open = _props2.open;
      var width = _props2.width;
      var muiTheme = this.state.muiTheme;
      var rawTheme = muiTheme.rawTheme;
      var spacing = rawTheme.spacing;
      var gutter = spacing.desktopGutter;
      return {
        root: {
          position: 'fixed',
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: muiTheme.zIndex.dialog,
          top: 0,
          left: open ? 0 : -10000,
          width: '100%',
          height: '100%',
          transition: open ? _transitions2.default.easeOut('0ms', 'left', '0ms') : _transitions2.default.easeOut('0ms', 'left', '450ms')
        },
        content: {
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          transition: _transitions2.default.easeOut(),
          position: 'relative',
          width: width || '75%',
          maxWidth: spacing.desktopKeylineIncrement * 12,
          margin: '0 auto',
          zIndex: muiTheme.zIndex.dialog
        },
        body: {
          padding: spacing.desktopGutter,
          overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
          overflowX: 'hidden'
        },
        actionsContainer: {
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          padding: 8,
          marginBottom: 8,
          width: '100%',
          textAlign: 'right'
        },
        paper: {background: rawTheme.palette.canvasColor},
        overlay: {zIndex: muiTheme.zIndex.dialogOverlay},
        title: {
          margin: 0,
          padding: gutter + 'px ' + gutter + 'px 0 ' + gutter + 'px',
          color: rawTheme.palette.textColor,
          fontSize: 24,
          lineHeight: '32px',
          fontWeight: 400
        }
      };
    },
    _getAction: function _getAction(actionJSON) {
      var _this2 = this;
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'using actionsJSON is deprecated on Dialog, please provide an array of\n buttons, or any other components instead. For more information please refer to documentations.') : undefined;
      var props = {
        secondary: true,
        onClick: actionJSON.onClick,
        onTouchTap: function onTouchTap() {
          if (actionJSON.onTouchTap) {
            actionJSON.onTouchTap.call(undefined);
          }
          if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
            _this2._requestClose(true);
          }
        },
        label: actionJSON.text,
        style: {marginRight: 8}
      };
      if (actionJSON.ref) {
        props.ref = actionJSON.ref;
        props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
      }
      if (actionJSON.id) {
        props.id = actionJSON.id;
      }
      return _react2.default.createElement(_flatButton2.default, props);
    },
    _getActionObjects: function _getActionObjects(actions) {
      var _this3 = this;
      var actionObjects = [];
      if (actions) {
        if (_react2.default.isValidElement(actions)) {
          actionObjects.push(actions);
        } else {
          actions.forEach(function(action) {
            if (action) {
              if (!_react2.default.isValidElement(action)) {
                action = _this3._getAction(action);
              }
              actionObjects.push(action);
            }
          });
        }
      }
      return actionObjects;
    },
    _getActionsContainer: function _getActionsContainer(actions, styles, className) {
      var actionObjects = this._getActionObjects(actions);
      return actionObjects.length > 0 && _react2.default.createElement('div', {
        className: className,
        style: this.prepareStyles(styles)
      }, _react2.default.Children.toArray(actionObjects));
    },
    _positionDialog: function _positionDialog() {
      var _props3 = this.props;
      var actions = _props3.actions;
      var autoDetectWindowHeight = _props3.autoDetectWindowHeight;
      var autoScrollBodyContent = _props3.autoScrollBodyContent;
      var bodyStyle = _props3.bodyStyle;
      var open = _props3.open;
      var repositionOnUpdate = _props3.repositionOnUpdate;
      var title = _props3.title;
      if (!open) {
        return;
      }
      var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var container = _reactDom2.default.findDOMNode(this);
      var dialogWindow = _reactDom2.default.findDOMNode(this.refs.dialogWindow);
      var dialogContent = _reactDom2.default.findDOMNode(this.refs.dialogContent);
      var minPaddingTop = 16;
      dialogWindow.style.height = '';
      dialogContent.style.height = '';
      var dialogWindowHeight = dialogWindow.offsetHeight;
      var paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
      if (paddingTop < minPaddingTop)
        paddingTop = minPaddingTop;
      if (repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }
      if (autoDetectWindowHeight || autoScrollBodyContent) {
        var styles = this.getStyles();
        styles.body = this.mergeStyles(styles.body, bodyStyle);
        var maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);
        if (title)
          maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
        var hasActions = this._getActionObjects(actions).length > 0;
        if (hasActions)
          maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
      }
    },
    _requestClose: function _requestClose(buttonClicked) {
      if (!buttonClicked && this.props.modal) {
        return;
      }
      if (this.props.onRequestClose) {
        this.props.onRequestClose(!!buttonClicked);
      }
    },
    _handleOverlayTouchTap: function _handleOverlayTouchTap() {
      this._requestClose(false);
    },
    _handleWindowKeyUp: function _handleWindowKeyUp(event) {
      if (event.keyCode === _keyCode2.default.ESC) {
        this._requestClose(false);
      }
    },
    _handleResize: function _handleResize() {
      if (this.props.open) {
        this._positionDialog();
      }
    },
    render: function render() {
      var _props4 = this.props;
      var actions = _props4.actions;
      var actionsContainerClassName = _props4.actionsContainerClassName;
      var actionsContainerStyle = _props4.actionsContainerStyle;
      var bodyClassName = _props4.bodyClassName;
      var bodyStyle = _props4.bodyStyle;
      var children = _props4.children;
      var className = _props4.className;
      var contentClassName = _props4.contentClassName;
      var contentStyle = _props4.contentStyle;
      var overlayClassName = _props4.overlayClassName;
      var overlayStyle = _props4.overlayStyle;
      var open = _props4.open;
      var titleClassName = _props4.titleClassName;
      var titleStyle = _props4.titleStyle;
      var title = _props4.title;
      var style = _props4.style;
      var styles = this.getStyles();
      styles.root = this.mergeStyles(styles.root, style);
      styles.content = this.mergeStyles(styles.content, contentStyle);
      styles.body = this.mergeStyles(styles.body, bodyStyle);
      styles.actionsContainer = this.mergeStyles(styles.actionsContainer, actionsContainerStyle);
      styles.overlay = this.mergeStyles(styles.overlay, overlayStyle);
      styles.title = this.mergeStyles(styles.title, titleStyle);
      var actionsContainer = this._getActionsContainer(actions, styles.actionsContainer, actionsContainerClassName);
      var titleElement = typeof title === 'string' ? _react2.default.createElement('h3', {
        className: titleClassName,
        style: this.prepareStyles(styles.title)
      }, title) : title;
      return _react2.default.createElement('div', {
        className: className,
        style: this.prepareStyles(styles.root)
      }, _react2.default.createElement(_reactAddonsTransitionGroup2.default, {
        component: 'div',
        ref: 'dialogWindow',
        transitionAppear: true,
        transitionAppearTimeout: 450,
        transitionEnter: true,
        transitionEnterTimeout: 450
      }, open && _react2.default.createElement(TransitionItem, {
        className: contentClassName,
        style: styles.content
      }, _react2.default.createElement(_paper2.default, {
        style: styles.paper,
        zDepth: 4
      }, titleElement, _react2.default.createElement('div', {
        ref: 'dialogContent',
        className: bodyClassName,
        style: this.prepareStyles(styles.body)
      }, children), actionsContainer))), _react2.default.createElement(_overlay2.default, {
        show: open,
        className: overlayClassName,
        style: styles.overlay,
        onTouchTap: this._handleOverlayTouchTap
      }));
    }
  });
  var Dialog = _react2.default.createClass({
    displayName: 'Dialog',
    propTypes: {
      actionFocus: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.string, 'Instead, use a custom `actions` property.'),
      actions: _react2.default.PropTypes.node,
      actionsContainerClassName: _react2.default.PropTypes.string,
      actionsContainerStyle: _react2.default.PropTypes.object,
      autoDetectWindowHeight: _react2.default.PropTypes.bool,
      autoScrollBodyContent: _react2.default.PropTypes.bool,
      bodyClassName: _react2.default.PropTypes.string,
      bodyStyle: _react2.default.PropTypes.object,
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      contentClassName: _react2.default.PropTypes.string,
      contentStyle: _react2.default.PropTypes.object,
      modal: _react2.default.PropTypes.bool,
      onRequestClose: _react2.default.PropTypes.func,
      open: _react2.default.PropTypes.bool.isRequired,
      overlayClassName: _react2.default.PropTypes.string,
      overlayStyle: _react2.default.PropTypes.object,
      repositionOnUpdate: _react2.default.PropTypes.bool,
      style: _react2.default.PropTypes.object,
      title: _react2.default.PropTypes.node,
      titleClassName: _react2.default.PropTypes.string,
      titleStyle: _react2.default.PropTypes.object,
      width: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.any, 'Use the contentStyle.')
    },
    getDefaultProps: function getDefaultProps() {
      return {
        autoDetectWindowHeight: true,
        autoScrollBodyContent: false,
        modal: false,
        repositionOnUpdate: true
      };
    },
    renderLayer: function renderLayer() {
      return _react2.default.createElement(DialogInline, this.props);
    },
    render: function render() {
      return _react2.default.createElement(_renderToLayer2.default, {
        render: this.renderLayer,
        open: true,
        useLayerForClickAway: false
      });
    }
  });
  exports.default = Dialog;
  module.exports = exports['default'];
})(require('process'));
