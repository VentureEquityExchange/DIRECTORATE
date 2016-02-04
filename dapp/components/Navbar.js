import React from 'react';
import { connect } from 'react-redux';
// import Appbar from 'muicss/lib/react/appbar';
import * as Actions from '../actions/index';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import DoubleBarIcon from 'material-ui/lib/svg-icons/editor/drag-handle';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const NavBarStyle = {
  fontFamily: 'Roboto',
  fontSize: '21px',

}

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class NavBarComponent extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      value : 1
    }
	}

  handleChange = (event, index, value) => {
    // instead of changing the value, let's dispatch some actions
    let { dispatch } = this.props;

    switch(value){
      case 2:
        let Account = {
          address : undefined,
          alias : undefined,
          password : undefined,
          set : false
        }
        dispatch(Actions.SET_ACCOUNT(Account))
      case 3:
        dispatch(Actions.SET_VENTURES());
    };

    // this.setState({value});
  }

  onClick = (side) => {
    let { dispatch } = this.props;
    console.log(side);
    dispatch(Actions.SIDE_NAV(side, true));
  }

	render() {
    let { Account } = this.props.Account;

    return (
      <Toolbar style={NavBarStyle}>
        <ToolbarGroup firstChild={true} float="left">
        <IconButton onClick={this.onClick.bind(this, 'left')}>
          <DoubleBarIcon />
        </IconButton>

        </ToolbarGroup>
        <ToolbarGroup float="right">

          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText={`${Account.alias}`}/>
            <MenuItem value={2} primaryText="Switch Accounts"/>
            <MenuItem value={3} primaryText="Switch Ventures"/>
          </DropDownMenu>
          <IconButton onClick={this.onClick.bind(this, 'right')}>
            <DoubleBarIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
	}
}

const mapStateToProps = (state) => {
  return {
    Account : state.Account

  }
}

const NavBar = connect(mapStateToProps)(NavBarComponent);

export default NavBar;
