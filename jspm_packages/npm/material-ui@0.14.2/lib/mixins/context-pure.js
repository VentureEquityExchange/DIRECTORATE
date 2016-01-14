/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _shallowEqual = require('../utils/shallow-equal');
var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function relevantContextKeysEqual(classObject, currentContext, nextContext) {
  if (classObject.getRelevantContextKeys) {
    var currentContextKeys = classObject.getRelevantContextKeys(currentContext);
    var nextContextKeys = classObject.getRelevantContextKeys(nextContext);
    if (!(0, _shallowEqual2.default)(currentContextKeys, nextContextKeys)) {
      return false;
    }
  }
  if (classObject.getChildrenClasses) {
    var childrenArray = classObject.getChildrenClasses();
    for (var i = 0; i < childrenArray.length; i++) {
      if (!relevantContextKeysEqual(childrenArray[i], currentContext, nextContext)) {
        return false;
      }
    }
  }
  return true;
}
exports.default = {shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState)) {
      return true;
    }
    if (!this.context.muiTheme && !nextContext.muiTheme) {
      return false;
    }
    if (this.context.muiTheme && nextContext.muiTheme) {
      return !this.context.muiTheme.static && !relevantContextKeysEqual(this.constructor, this.context.muiTheme, nextContext.muiTheme);
    }
    return true;
  }};
module.exports = exports['default'];
