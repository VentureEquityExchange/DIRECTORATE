import React from 'react';
import ReactDOM from 'react-dom';
import SideNav from './SideNav';

export default class DirectorateApp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DirectorateApp';
    }
    render() {
        return (<div><SideNav /></div>);
    }
}
