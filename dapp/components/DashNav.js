import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

import Badge from 'material-ui/lib/badge';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const DashNavList = ['Bylaws', 'Directors', 'Voting', 'Shareholders', 'Financials', 'Securities & Exchange'];


class DashNavComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Venture } = this.props.Venture;

    // dispatch(Actions.GET_BYLAWS(Venture));
  }

  setMainView = (item) => {
    console.log('Set main view to: '+item);
    let { dispatch } = this.props;

    dispatch(Actions.SET_DASHVIEW(item));
  }

  render(){

    let DashNavListItems = DashNavList.map((item, index) => {
      return (
        <ListItem
          key={index}
          onTouchTap={this.setMainView.bind(this, item)}
          secondaryText={
            <h3>{item}</h3>
          }
          secondaryTextLines={1}
        />
      )
    })

    return(
      <Card initiallyExpanded={true}>
        <CardText expandable={true}>
          <List subheader="">
            {DashNavListItems}
          </List>
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Venture : state.Venture
  }
}

const DashNav = connect(mapStateToProps)(DashNavComponent);

export default DashNav;
