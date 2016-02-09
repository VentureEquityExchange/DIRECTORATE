import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';


class BylawsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      bylawsItem : '',
      title : undefined,
      oldValue : undefined,
      newValue : undefined,
      equalWeighted : 1,
      resolutionPeriod : 2,
      type : 'number'
    }
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Venture } = this.props.Venture;

    dispatch(Actions.GET_BYLAWS(Venture));
  }



  amendBylaws = (bylaw, title, value) => {

    // Amend Bylaws makes a call to the Voting Contract, calling a specific function for Amending Bylaws.

    let { dispatch } = this.props;
    let { Venture } = this.props.Venture;
    let { type } = this.state;
    console.log(Venture);
    console.log(bylaw);

    { bylaw.match(RegExp("resolutionPeriod")) || bylaw.match(RegExp("equalWeighted")) ? type="text" : type="number" }

    this.setState({open : !this.state.open, bylawsItem : bylaw, title : title, oldValue : value, type:type});


  }

  amendBylaw(){
    let { dispatch } = this.props;
    let { Account } = this.props.Account;
    let { Venture } = this.props.Venture;

    console.log(this.props);
    // Arguments for Voting.sol => NewResolution();
    //
    // address proposedBy, string proposal, bool EOR, bytes32 voteItem, bytes32 proposedValue, bytes32 currentValue

    let newBylawResolution = {
      venture : Venture.DAV,
      proposedBy : Account.address,
      proposal : `Amend ${this.state.title}`,
      EOR : true,
      voteItem : this.state.bylawsItem,
      proposedValue : this.state.newValue,
      currentValue : this.state.oldValue
    }

    console.log(newBylawResolution);

    dispatch(Actions.AMEND_BYLAWS(Account, newBylawResolution));

  }

  setValue = (event) => {

    switch(this.state.type){
      case "text":
        this.state.newValue = String(event.target.value);
        break;
      default:
        this.state.newValue = Number(event.target.value);
    }

    console.log(this.state);

  }

  setWeighting = (event, index, value) => {
    switch(value){
      case 1:
        this.state.newValue = "Equal Weighted (amongst Directors)";
      case 0:
        this.state.newValue = "Share Weighted (amongst Shareholders)"
    }

    this.state.equalWeighted = value;
    this.setState({equalWeighted : value});
  }

  setResolutionPeriod = (event, index, value) => {
    switch(value){
      case 1:
        this.state.newValue = "One Week";
        this.state.resolutionPeriod = value;
        break;
      case 2:
        this.state.newValue = "Two Weeks";
        this.state.resolutionPeriod = value;
        break;
      case 3:
        this.state.newValue = "Three Weeks";
        this.state.resolutionPeriod = value;
        break;
      case 4:
        this.state.newValue = "Four Weeks";
        this.state.resolutionPeriod = value;
        break;
      case 5:
        this.state.newValue = "Five Weeks";
        this.state.resolutionPeriod = value;
        break;
    }


    this.setState({resolutionPeriod : value});
  }



  render(){
    let { Bylaws, Venture } = this.props.Venture;

    let pText;
    let sText;
    let ListItems = Object.keys(Bylaws).map((item, index ) => {

      if(item.match(RegExp("DAV"))){
        pText = "DAV Address";
        sText = Bylaws[item];
      } else if(item.match(RegExp("EORT"))){
        pText = "Extra-Ordinary Resolution Threshold";
        sText = Bylaws[item];
      } else if(item.match(RegExp("ORT"))){
        pText = "Ordinary Resolution Threshold";
        sText = Bylaws[item];
      } else if(item.match(RegExp("resolutionPeriod"))){
        pText = "Open Resolution Time Period Limit";
        sText = Bylaws[item];
      } else if(item.match(RegExp("equalWeighted"))){
        pText = "Voting Weight";
        { Bylaws[item] == 1 ? sText = "Equal Weighted (amongst Directors)" : sText = "Share Weighted (amongst Shareholders)" }
      } else if(item.match(RegExp("ORL"))){
        pText = "Open Resolution Limit";
        sText = Bylaws[item];
      } else {
        pText = item;
        sText = Bylaws[item];
      };



      return (
        <div key={index}>
          <ListItem
            rightIconButton={ item.match(RegExp("DAV")) ? null :
              <IconMenu iconButtonElement={
                <IconButton
                  touch={true}
                  tooltip={`Amend ${pText}`}
                  tooltipPosition="bottom-left"
                >
                  <MoreVertIcon color={Colors.grey400} />
                </IconButton>
              }>
                <MenuItem onTouchTap={this.amendBylaws.bind(this, item, pText, sText)}>Propose Amending {pText}</MenuItem>
              </IconMenu>


            }
            primaryText={pText}
            secondaryText={
              <p>
                <span style={{color: Colors.darkBlack}}>{sText}</span><br/>
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
        </div>
      );


    })


    return(
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
            title="Bylaws"
            subtitle={`Operating Agreements for ${Venture.name}`}
          />
          <CardText expandable={true} style={{height:'500px', overflow:'scroll'}}>
            <List subheader="" >
              {ListItems}
            </List>
          </CardText>
        </Card>
        <Dialog
          title={`Amend ByLaw: ${this.state.title}`}
          modal={true}
          open={this.state.open}
        >
            <TextField
              hintText={`${this.state.title}: Previous Value`}
              floatingLabelText={`${this.state.title}: ${this.state.oldValue}`}
              min={1}
              max={100}
              defaultValue={this.state.oldValue}
              disabled={true}
              type={this.state.type}
              style={{width:'100%', marginTop:'1%'}}
              onChange={null} />
            { this.state.bylawsItem.match(RegExp("equalWeighted")) ||
              this.state.bylawsItem.match(RegExp("resolutionPeriod")) ?
              <div>
                { this.state.bylawsItem.match(RegExp("resolutionPeriod")) ?
                    <SelectField value={this.state.resolutionPeriod} onChange={this.setResolutionPeriod}>
                      <MenuItem value={1} primaryText="One Week"/>
                      <MenuItem value={2} primaryText="Two Weeks"/>
                      <MenuItem value={3} primaryText="Three Weeks"/>
                      <MenuItem value={4} primaryText="Four Weeks"/>
                      <MenuItem value={5} primaryText="Five Weeks"/>
                    </SelectField> :
                    <SelectField value={this.state.equalWeighted} onChange={this.setWeighting}>
                        <MenuItem value={1} primaryText="Equal Weighted"/>
                        <MenuItem value={0} primaryText="Share Weighted"/>
                    </SelectField>
                }
              </div> :
              <TextField
                hintText={`${this.state.title}: Proposed Value`}
                floatingLabelText={`${this.state.title}: Proposed Value`}
                min={1}
                max={100}
                defaultValue=""
                type={this.state.type}
                style={{width:'100%', marginTop:'1%'}}
                onChange={this.setValue.bind(this)} />
            }

            <RaisedButton
                label="New Proposal"
                style={{width:'100%', marginTop:'1%'}}
                onClick={this.amendBylaw.bind(this, )} />
            <RaisedButton
                label="Cancel"
                secondary={true}
                style={{width:'100%', marginTop:'1%'}}
                onClick={this.amendBylaws.bind(this, '', undefined, undefined)} />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Venture : state.Venture,
    Account : state.Account
  }
}

const Bylaws = connect(mapStateToProps)(BylawsComponent);

export default Bylaws;
