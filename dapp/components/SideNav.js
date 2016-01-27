import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import * as Ethereum from '../ethereum/index';
import Promise from 'bluebird';
import Wallet from './Account/Wallet';
import Appbar from 'muicss/lib/react/appbar';

import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/editor/drag-handle';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';


@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

export default class SideNav extends React.Component {
	constructor(props){
		super(props);
		this.props.account;
		this.state = {
			open : false,
			account : this.props.account
		};
	}


	handleToggle = () => {this.setState({open: !this.state.open});}

	handleClose = () => {this.setState({open: false});}

	render() {
		return (<div><Appbar></Appbar></div>);
	}
}



/*
<div style={{marginTop:'-10px', marginLeft:'-7%', width:'125%'}}>
<AppBar
		title="Title"
		iconElementLeft={<IconButton style={{marginLeft:'25px'}} onClick={this.handleToggle}><Menu /></IconButton>}
		iconElementRight={
			<IconMenu
				iconButtonElement={
					<IconButton onClick={this.handleToggle}><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
			</IconMenu>
		}
	/>

	<LeftNav
		docked={true}
					width={600}
					open={this.state.open}
					onRequestChange={open => this.setState({open})}
			>
		<AppBar
				title={<small>Hello</small>}
				iconElementLeft={<IconButton></IconButton>}
				iconElementRight={<IconButton onClick={this.handleToggle}><Menu /></IconButton>}
			/>


	</LeftNav>
</div>

*/
