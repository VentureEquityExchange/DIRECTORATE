System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ],
    "stage": 1,
    "blacklist": []
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "bluebird": "npm:bluebird@3.1.1",
    "core-js": "npm:core-js@1.2.6",
    "crypto": "npm:crypto@0.0.3",
    "deep-freeze": "npm:deep-freeze@0.0.1",
    "expect": "npm:expect@1.13.4",
    "history": "npm:history@2.0.0-rc2",
    "jsonfile": "npm:jsonfile@2.2.3",
    "lodash": "npm:lodash@4.0.0",
    "material-ui": "npm:material-ui@0.14.2",
    "path": "npm:path@0.12.7",
    "react": "npm:react@0.14.6",
    "react-cellblock": "npm:react-cellblock@2.0.0",
    "react-dom": "npm:react-dom@0.14.6",
    "react-grid-layout": "npm:react-grid-layout@0.10.0-beta1",
    "react-redux": "npm:react-redux@4.0.6",
    "react-router": "npm:react-router@2.0.0-rc5",
    "redux": "npm:redux@3.0.5",
    "redux-devtools": "npm:redux-devtools@3.0.1",
    "redux-devtools-dock-monitor": "npm:redux-devtools-dock-monitor@1.0.1",
    "redux-devtools-log-monitor": "npm:redux-devtools-log-monitor@1.0.2",
    "redux-promise": "npm:redux-promise@0.5.0",
    "redux-promise-middleware": "npm:redux-promise-middleware@2.3.3",
    "redux-simple-router": "npm:redux-simple-router@2.0.3",
    "rxjs-es": "npm:rxjs-es@5.0.0-beta.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:asap@2.0.3": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@6.3.19": {
      "core-js": "npm:core-js@1.2.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bluebird@3.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserslist@1.1.0": {
      "caniuse-db": "npm:caniuse-db@1.0.30000386",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:caniuse-api@1.4.1": {
      "browserslist": "npm:browserslist@1.1.0",
      "caniuse-db": "npm:caniuse-db@1.0.30000386",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "lodash.memoize": "npm:lodash.memoize@2.4.1",
      "lodash.uniq": "npm:lodash.uniq@3.2.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "shelljs": "npm:shelljs@0.5.3"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:define-properties@1.1.2": {
      "foreach": "npm:foreach@2.0.5",
      "object-keys": "npm:object-keys@1.0.9"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:es-abstract@1.5.0": {
      "es-to-primitive": "npm:es-to-primitive@1.1.1",
      "function-bind": "npm:function-bind@1.0.2",
      "is-callable": "npm:is-callable@1.1.2",
      "is-regex": "npm:is-regex@1.0.3"
    },
    "npm:es-to-primitive@1.1.1": {
      "is-callable": "npm:is-callable@1.1.2",
      "is-date-object": "npm:is-date-object@1.0.1",
      "is-symbol": "npm:is-symbol@1.0.1"
    },
    "npm:expect@1.13.4": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "is-equal": "npm:is-equal@1.4.2",
      "is-regex": "npm:is-regex@1.0.3",
      "object-inspect": "npm:object-inspect@1.1.0"
    },
    "npm:fbjs@0.2.1": {
      "core-js": "npm:core-js@1.2.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:fbjs@0.6.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:flux-standard-action@0.6.0": {
      "lodash.isplainobject": "npm:lodash.isplainobject@3.2.0"
    },
    "npm:has@1.0.1": {
      "function-bind": "npm:function-bind@1.0.2"
    },
    "npm:history@2.0.0-rc2": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "deep-equal": "npm:deep-equal@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "query-string": "npm:query-string@3.0.0",
      "warning": "npm:warning@2.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inline-style-prefixer@0.5.4": {
      "bowser": "npm:bowser@1.0.0",
      "caniuse-api": "npm:caniuse-api@1.4.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:invariant@2.2.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:is-arrow-function@2.0.3": {
      "is-callable": "npm:is-callable@1.1.2"
    },
    "npm:is-equal@1.4.2": {
      "has": "npm:has@1.0.1",
      "is-arrow-function": "npm:is-arrow-function@2.0.3",
      "is-boolean-object": "npm:is-boolean-object@1.0.0",
      "is-callable": "npm:is-callable@1.1.2",
      "is-date-object": "npm:is-date-object@1.0.1",
      "is-generator-function": "npm:is-generator-function@1.0.3",
      "is-number-object": "npm:is-number-object@1.0.3",
      "is-regex": "npm:is-regex@1.0.3",
      "is-string": "npm:is-string@1.0.4",
      "is-symbol": "npm:is-symbol@1.0.1",
      "object.entries": "npm:object.entries@1.0.3"
    },
    "npm:jsonfile@2.2.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:lodash._basecallback@3.3.1": {
      "lodash._baseisequal": "npm:lodash._baseisequal@3.0.7",
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.pairs": "npm:lodash.pairs@3.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._baseisequal@3.0.7": {
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.istypedarray": "npm:lodash.istypedarray@3.0.3",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash._baseuniq@3.0.3": {
      "lodash._baseindexof": "npm:lodash._baseindexof@3.1.0",
      "lodash._cacheindexof": "npm:lodash._cacheindexof@3.0.2",
      "lodash._createcache": "npm:lodash._createcache@3.1.2"
    },
    "npm:lodash._createassigner@3.1.1": {
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
      "lodash.restparam": "npm:lodash.restparam@3.6.1"
    },
    "npm:lodash._createcache@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1"
    },
    "npm:lodash.debounce@3.1.1": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1"
    },
    "npm:lodash.isplainobject@3.2.0": {
      "lodash._basefor": "npm:lodash._basefor@3.0.3",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.5",
      "lodash.keysin": "npm:lodash.keysin@3.0.8"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.5",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.keysin@3.0.8": {
      "lodash.isarguments": "npm:lodash.isarguments@3.0.5",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.memoize@2.4.1": {
      "lodash._keyprefix": "npm:lodash._keyprefix@2.4.2",
      "lodash.isfunction": "npm:lodash.isfunction@2.4.1"
    },
    "npm:lodash.merge@3.3.2": {
      "lodash._arraycopy": "npm:lodash._arraycopy@3.0.0",
      "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
      "lodash._createassigner": "npm:lodash._createassigner@3.1.1",
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.5",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.isplainobject": "npm:lodash.isplainobject@3.2.0",
      "lodash.istypedarray": "npm:lodash.istypedarray@3.0.3",
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "lodash.keysin": "npm:lodash.keysin@3.0.8",
      "lodash.toplainobject": "npm:lodash.toplainobject@3.0.0"
    },
    "npm:lodash.pairs@3.0.1": {
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.throttle@3.0.4": {
      "lodash.debounce": "npm:lodash.debounce@3.1.1"
    },
    "npm:lodash.toplainobject@3.0.0": {
      "lodash._basecopy": "npm:lodash._basecopy@3.0.1",
      "lodash.keysin": "npm:lodash.keysin@3.0.8"
    },
    "npm:lodash.uniq@3.2.2": {
      "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
      "lodash._baseuniq": "npm:lodash._baseuniq@3.0.3",
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@4.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.1.0": {
      "js-tokens": "npm:js-tokens@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:material-ui@0.14.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inline-style-prefixer": "npm:inline-style-prefixer@0.5.4",
      "lodash.merge": "npm:lodash.merge@3.3.2",
      "lodash.throttle": "npm:lodash.throttle@3.0.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.6",
      "react-addons-create-fragment": "npm:react-addons-create-fragment@0.14.6",
      "react-addons-pure-render-mixin": "npm:react-addons-pure-render-mixin@0.14.6",
      "react-addons-transition-group": "npm:react-addons-transition-group@0.14.6",
      "react-addons-update": "npm:react-addons-update@0.14.6",
      "react-dom": "npm:react-dom@0.14.6",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@0.2.1",
      "warning": "npm:warning@2.1.0"
    },
    "npm:object.entries@1.0.3": {
      "define-properties": "npm:define-properties@1.1.2",
      "es-abstract": "npm:es-abstract@1.5.0",
      "function-bind": "npm:function-bind@1.0.2",
      "has": "npm:has@1.0.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path@0.12.7": {
      "process": "npm:process@0.11.2",
      "util": "npm:util@0.10.3"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promise@7.1.1": {
      "asap": "npm:asap@2.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:query-string@3.0.0": {
      "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
    },
    "npm:react-addons-create-fragment@0.14.6": {
      "react": "npm:react@0.14.6"
    },
    "npm:react-addons-pure-render-mixin@0.14.6": {
      "react": "npm:react@0.14.6"
    },
    "npm:react-addons-transition-group@0.14.6": {
      "react": "npm:react@0.14.6"
    },
    "npm:react-addons-update@0.14.6": {
      "react": "npm:react@0.14.6"
    },
    "npm:react-cellblock@2.0.0": {
      "babel-runtime": "npm:babel-runtime@5.8.35",
      "cellblock": "npm:cellblock@1.1.2",
      "classnames": "npm:classnames@2.2.3",
      "eventlistener": "npm:eventlistener@0.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "react": "npm:react@0.14.6",
      "react-dom": "npm:react-dom@0.14.6"
    },
    "npm:react-dock@0.2.3": {
      "lodash.debounce": "npm:lodash.debounce@3.1.1",
      "object-assign": "npm:object-assign@4.0.1",
      "react": "npm:react@0.14.6"
    },
    "npm:react-dom@0.14.6": {
      "react": "npm:react@0.14.6"
    },
    "npm:react-draggable@1.1.3": {
      "classnames": "npm:classnames@2.2.3",
      "object-assign": "npm:object-assign@4.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-grid-layout@0.10.0-beta1": {
      "deep-equal": "npm:deep-equal@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "object-assign": "npm:object-assign@4.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react-draggable": "npm:react-draggable@1.1.3",
      "react-resizable": "npm:react-resizable@1.0.1"
    },
    "npm:react-json-tree@0.3.0": {
      "babel-runtime": "npm:babel-runtime@5.8.34",
      "react": "npm:react@0.14.6",
      "react-mixin": "npm:react-mixin@1.7.0"
    },
    "npm:react-mixin@1.7.0": {
      "object-assign": "npm:object-assign@2.1.1",
      "smart-mixin": "npm:smart-mixin@1.2.1"
    },
    "npm:react-redux@4.0.6": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.3",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.6",
      "redux": "npm:redux@3.0.5"
    },
    "npm:react-resizable@1.0.1": {
      "object-assign": "npm:object-assign@4.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react-draggable": "npm:react-draggable@1.1.3"
    },
    "npm:react-router@2.0.0-rc5": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "history": "npm:history@2.0.0-rc2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "warning": "npm:warning@2.1.0"
    },
    "npm:react-tap-event-plugin@0.2.1": {
      "fbjs": "npm:fbjs@0.2.1",
      "react": "npm:react@0.14.6"
    },
    "npm:react@0.14.6": {
      "fbjs": "npm:fbjs@0.6.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:redux-devtools-dock-monitor@1.0.1": {
      "babel-runtime": "npm:babel-runtime@6.3.19",
      "parse-key": "npm:parse-key@0.2.1",
      "react": "npm:react@0.14.6",
      "react-dock": "npm:react-dock@0.2.3",
      "react-pure-render": "npm:react-pure-render@1.0.2",
      "redux-devtools": "npm:redux-devtools@3.0.1"
    },
    "npm:redux-devtools-log-monitor@1.0.2": {
      "react": "npm:react@0.14.6",
      "react-json-tree": "npm:react-json-tree@0.3.0",
      "react-pure-render": "npm:react-pure-render@1.0.2",
      "redux-devtools": "npm:redux-devtools@3.0.1",
      "redux-devtools-themes": "npm:redux-devtools-themes@1.0.0"
    },
    "npm:redux-devtools-themes@1.0.0": {
      "base16": "npm:base16@1.0.0"
    },
    "npm:redux-devtools@3.0.1": {
      "lodash": "npm:lodash@3.10.1",
      "react": "npm:react@0.14.6",
      "react-redux": "npm:react-redux@4.0.6",
      "redux": "npm:redux@3.0.5"
    },
    "npm:redux-promise-middleware@2.3.3": {
      "redux": "npm:redux@3.0.5"
    },
    "npm:redux-promise@0.5.0": {
      "flux-standard-action": "npm:flux-standard-action@0.6.0"
    },
    "npm:redux@3.0.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:shelljs@0.5.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:warning@2.1.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
