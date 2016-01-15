import React from 'react';
import ReactDOM from 'react-dom';
import SideNav from './SideNav';
import Loading from './Loading';
import Wallet from './Wallet';
import SelectAccount from './Account/SelectAccount';

export default class DirectorateApp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DirectorateApp';
        this.props.view;
    }



    render = () => {
        switch(this.props.view){
        	case 'loading':
        		return (<div><Loading /></div>);
        		break;
          case 'select-account':
            return (<SelectAccount />)
            break;
          case 'wallet':
            return (<div><Wallet /></div>)
          default:
        		return (<div><SideNav /></div>);
        		break;
        }

    }
}
