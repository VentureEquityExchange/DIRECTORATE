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

const NavBarStyle = {
  fontFamily: 'Roboto',
  fontSize: '21px',

}

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class NavBarComponent extends React.Component {
	constructor(props){
		super(props);

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
          <ToolbarTitle text="VΞX|DIRECTORATE" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton onClick={this.onClick.bind(this, 'right')}>
                <DoubleBarIcon />
              </IconButton>
            }
          >
          </IconMenu>
          <ToolbarSeparator />
          <FlatButton label={Account.alias} secondary={true}/>
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
