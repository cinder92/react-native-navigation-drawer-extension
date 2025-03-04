"use strict";
/**
 * @author Luke Brandon Farrell
 * @title SideMenuView.js
 * @description A swipeable view to open a drawer.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* NPM - Node Package Manage */
var React = require("react");
var react_native_1 = require("react-native");
/* Utils - Project Utilities */
var events_1 = require("./events");
var screenHeight = react_native_1.Dimensions.get('screen').height;
var SideMenuView = /** @class */ (function (_super) {
    __extends(SideMenuView, _super);
    /**
     * [ Built-in React method. ]
     *
     * Setup the component. Executes when the component is created
     *
     * @param {object} props
     */
    function SideMenuView(props) {
        var _this = _super.call(this, props) || this;
        _this.isOpened = false;
        var swipeSensitivity = props.swipeSensitivity, left = props.left, right = props.right;
        _this._panResponderMethods = {
            // Ask to be the responder:
            onStartShouldSetPanResponder: function (_evt, _gestureState) { return true; },
            onStartShouldSetPanResponderCapture: function (_evt, _gestureState) { return true; },
            onMoveShouldSetPanResponder: function (_evt, _gestureState) { return true; },
            onMoveShouldSetPanResponderCapture: function (_evt, _gestureState) { return true; },
            onPanResponderGrant: function (_evt, _gestureState) {
                events_1.dispatch('SWIPE_START');
            },
            onPanResponderRelease: function (_evt, gestureState) {
                var vx = gestureState.vx;
                // Emit this event when the gesture ends
                events_1.dispatch('SWIPE_END', vx > 0 ? 'right' : 'left');
            },
            onPanResponderTerminationRequest: function (_evt, _gestureState) { return false; },
            onShouldBlockNativeResponder: function (_evt, _gestureState) { return false; },
        };
        // LEFT PAN RESPONDER
        _this._leftPanResponder = react_native_1.PanResponder.create(__assign({}, _this._panResponderMethods, { onPanResponderMove: function (_evt, gestureState) {
                var moveX = gestureState.moveX, vx = gestureState.vx;
                // Emit this event on movement
                events_1.dispatch('SWIPE_MOVE', { value: moveX, direction: 'left' });
                // Left Swipe
                if (vx > swipeSensitivity && !_this.isOpened && left) {
                    _this.isOpened = true;
                    left();
                }
            } }));
        // RIGHT PAN RESPONDER
        _this._rightPanResponder = react_native_1.PanResponder.create(__assign({}, _this._panResponderMethods, { onPanResponderMove: function (_evt, gestureState) {
                var moveX = gestureState.moveX, vx = gestureState.vx;
                // Emit this event on movement
                events_1.dispatch('SWIPE_MOVE', { value: moveX, direction: 'right' });
                // Right Swipe
                if (vx > -swipeSensitivity && !_this.isOpened && right) {
                    _this.isOpened = true;
                    right();
                }
            } }));
        _this.registerListeners = _this.registerListeners.bind(_this);
        _this.removeListeners = _this.removeListeners.bind(_this);
        return _this;
    }
    /**
     * [ Built-in React method. ]
     *
     * Executed when the component is mounted to the screen
     */
    SideMenuView.prototype.componentDidMount = function () {
        this.registerListeners();
    };
    /**
     * Registers all the listenrs for this component
     */
    SideMenuView.prototype.registerListeners = function () {
        var _this = this;
        // Event fires when drawer is closed
        this.unsubscribeDrawerClosed = events_1.listen('DRAWER_CLOSED', function () {
            _this.isOpened = false;
        });
    };
    /**
     * Removes all the listenrs from this component
     */
    SideMenuView.prototype.removeListeners = function () {
        this.unsubscribeDrawerClosed();
    };
    /**
     * [ Built-in React method. ]
     *
     * Allows us to render JSX to the screen
     */
    SideMenuView.prototype.render = function () {
        /** Props */
        var _a = this.props, children = _a.children, left = _a.left, right = _a.right, sideMargin = _a.sideMargin, sideMarginLeft = _a.sideMarginLeft, sideMarginRight = _a.sideMarginRight, _swipeSensitivity = _a.swipeSensitivity, props = __rest(_a, ["children", "left", "right", "sideMargin", "sideMarginLeft", "sideMarginRight", "swipeSensitivity"]);
        return (React.createElement(react_native_1.View, __assign({}, props),
            children,
            left ? (React.createElement(react_native_1.View, __assign({ style: {
                    left: 0,
                    position: 'absolute',
                    width: sideMargin || sideMarginLeft,
                    height: screenHeight,
                } }, this._leftPanResponder.panHandlers))) : null,
            right ? (React.createElement(react_native_1.View, __assign({ style: {
                    position: 'absolute',
                    right: 0,
                    width: sideMargin || sideMarginRight,
                    height: screenHeight,
                } }, this._rightPanResponder.panHandlers))) : null));
    };
    SideMenuView.defaultProps = {
        sideMargin: 15,
        swipeSensitivity: 0.2,
    };
    return SideMenuView;
}(React.Component));
exports.default = SideMenuView;
