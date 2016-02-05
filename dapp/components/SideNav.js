import React, { Component } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import * as Ethereum from '../ethereum/index';
import Promise from 'bluebird';
import { Wallet } from './index';
import Appbar from 'muicss/lib/react/appbar';
import * as Actions from '../actions/index';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/editor/drag-handle';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';
import { connect } from 'react-redux';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class SideNavComponent extends Component {
	constructor(props){
		super(props);
		this.props
	}

	onClick = (side) => {
    let { dispatch } = this.props;

    dispatch(Actions.SIDE_NAV(side, false));
  }

	render() {
		let { left, right } = this.props.Nav;

		return (
			<div>
			<LeftNav
			docked={true}
						width={600}
						open={left}
						onRequestChange={open => this.setState({open})}
				>
				<RaisedButton
          label={"Close Side Nav"}
          onClick={this.onClick.bind(this, 'left')}
					secondary={true}
					style={{width:'100%'}} />

			</LeftNav>
			<LeftNav
			docked={true}
						width={600}
						open={right}
						openRight={true}
						onRequestChange={open => this.setState({open})}
				>
				<RaisedButton
          label={"Close Side Nav"}
          onClick={this.onClick.bind(this, 'right')}
					secondary={true}
					style={{width:'100%'}} />
				<Wallet />
			</LeftNav>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		Nav : state.Navigation
	}
}

const SideNav = connect(mapStateToProps)(SideNavComponent);


export default SideNav;
