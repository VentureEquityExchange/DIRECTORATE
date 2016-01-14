import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SideNav extends React.Component {
	constructor(props){
		super(props);
		this.state = {open : false};
	}


	handleToggle = () => {this.setState({open: !this.state.open});}

	handleClose = () => {this.setState({open: false});}

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
					<RaisedButton
						label="Close Side Nav"
						onClick={this.handleClose} />
				</LeftNav>
			</div>
		);
	}
}