/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict";
//import modules

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrcusApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//create our OrcusApp class
var OrcusApp = function (_React$Component) {
    _inherits(OrcusApp, _React$Component);

    function OrcusApp(props, context) {
        _classCallCheck(this, OrcusApp);

        return _possibleConstructorReturn(this, (OrcusApp.__proto__ || Object.getPrototypeOf(OrcusApp)).call(this, props, context));
    }

    _createClass(OrcusApp, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return OrcusApp;
}(_react2.default.Component);
//define default props
OrcusApp.defaultProps = {
    icon: "th-large",
    initialOpened: false,
    initialPosition: [0, 0, 100, 100]
};
//define props
OrcusApp.propTypes = {
    slug: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string,
    initialOpened: _propTypes2.default.bool,
    initialPosition: _propTypes2.default.arrayOf(_propTypes2.default.number)
};
//define context
OrcusApp.contextTypes = {};
//export OrcusApp class
exports.OrcusApp = OrcusApp;