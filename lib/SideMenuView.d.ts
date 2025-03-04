/**
 * @author Luke Brandon Farrell
 * @title SideMenuView.js
 * @description A swipeable view to open a drawer.
 */
import * as React from 'react';
declare type SwipeFunctionType = () => void;
interface IProps {
    swipeSensitivity: number;
    left: SwipeFunctionType;
    right: SwipeFunctionType;
    sideMargin: number;
    sideMarginLeft: number;
    sideMarginRight: number;
}
declare class SideMenuView extends React.Component<IProps, {}> {
    private isOpened;
    private _panResponderMethods;
    private _leftPanResponder;
    private _rightPanResponder;
    private unsubscribeDrawerClosed;
    static defaultProps: {
        sideMargin: number;
        swipeSensitivity: number;
    };
    /**
     * [ Built-in React method. ]
     *
     * Setup the component. Executes when the component is created
     *
     * @param {object} props
     */
    constructor(props: IProps);
    /**
     * [ Built-in React method. ]
     *
     * Executed when the component is mounted to the screen
     */
    componentDidMount(): void;
    /**
     * Registers all the listenrs for this component
     */
    registerListeners(): void;
    /**
     * Removes all the listenrs from this component
     */
    removeListeners(): void;
    /**
     * [ Built-in React method. ]
     *
     * Allows us to render JSX to the screen
     */
    render(): JSX.Element;
}
export default SideMenuView;
