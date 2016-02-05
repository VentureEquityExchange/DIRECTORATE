import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Propose Change</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);


class BylawsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Venture } = this.props.Venture;

    dispatch(Actions.GET_BYLAWS(Venture));
  }

  render(){
    let { Bylaws } = this.props.Venture;

    console.log(Bylaws.DAV);

    return(
      <Card initiallyExpanded={true} >
        <CardHeader
          title="Bylaws"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={{height:'500px', overflow:'scroll'}}>
          <List subheader="" >
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="DAV"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.DAV}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="Ordinary Resolution Threshold"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.ORT}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="Extra-Ordinary Resolution Threshold"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.EORT}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="Open Resolutions Limit"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.ORL}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="Open Resolutions Time Limit"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.resolutionPeriod}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
              rightIconButton={rightIconMenu}
              primaryText="Equity Weighting"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>{Bylaws.equalWeighted ? "Equal Weighted" : "Share Weighted"}</span><br/>
                </p>
              }
              secondaryTextLines={2}
            />
          </List>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Action1"/>
          <FlatButton label="Action2"/>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Venture : state.Venture
  }
}

const Bylaws = connect(mapStateToProps)(BylawsComponent);

export default Bylaws;
