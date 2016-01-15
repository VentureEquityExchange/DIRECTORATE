import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import * as Ethereum from '../ethereum/index';
import Promise from 'bluebird';
import Wallet from './Account/Wallet';

export default class SideNav extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open : false,
			account : this.props.account
		};

	}


	handleToggle() {this.setState({open: !this.state.open});}

	handleClose() {this.setState({open: false});}

	render() {
		return (
			<div>
				<RaisedButton
					label="Side Nav"
					onClick={this.handleToggle} />
				<LeftNav
					docked={true}
		          	width={600}
		          	open={this.state.open}
		          	onRequestChange={open => this.setState({open})}
		        >
					<Wallet account={this.state.account} />
				</LeftNav>
			</div>
		);
	}
}
