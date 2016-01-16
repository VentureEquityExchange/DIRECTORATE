import React from 'react';
import ReactDOM from 'react-dom';
import SideNav from './SideNav';
import Loading from './Loading';
import Wallet from './Account/Wallet';
import SelectAccount from './Account/SelectAccount';
import Grid from './Grid';

export default class DirectorateApp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DirectorateApp';
        this.state = {
          view : this.props.view,
          account : this.props.account
        }

    }

    render() {
        switch(this.state.view){
        	case 'loading':
        		return (<Loading format="modal"/>);
        		break;
          case 'select-account':
            return (<SelectAccount />)
            break;
          case 'wallet':
            return (<Wallet account={this.state.account}  />)
            break;
          case 'grid':
              return (<Grid account={this.state.account}/>);
              break;
          default:
        		return (<SideNav account={this.state.account}/>);
        		break;
        }

    }
}
