import React from 'react';
import ReactDOM from 'react-dom';
import SideNav from './SideNav';
import Loading from './Loading';



export default class DirectorateApp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DirectorateApp';
        this.view = 'loading';
    }
    
    setView = (view) => {
    	return this.view = view;
    }

    render() {
        switch(this.view){
        	case 'loading':
        		return (<div><Loading /></div>);
        		break;
        	default:
        		return (<div><SideNav /></div>);
        		break;
        }
        
    }
}
