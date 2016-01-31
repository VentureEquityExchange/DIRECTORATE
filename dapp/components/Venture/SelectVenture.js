import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import * as Actions from '../../actions/index';

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}


class SelectVentureComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand : false,
      venture : {
        title : undefined
      }
    }
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Account } = this.props.Account;
    console.log('Make call to DirectorIndex contract and send back results');

    setTimeout(() => {
      dispatch(Actions.GET_VENTURES(Account));
    }, 2000)

  }

  ventureName = (event) => {
    let name = event.target.value;
    this.state.venture.name = name;
  }

  ventureDirectors = (event) => {
    let directors = JSON.parse(String("["+event.target.value+"]"));

    console.log(typeof directors);
    console.log(directors);
    this.state.venture.directors = directors;
  }

  newVenture = () => {
    let { dispatch } = this.props;
    let { expand, venture } = this.state;
    let { Account } = this.props.Account;

    console.log(Account);

    if(!this.state.expand){
      this.setState({expand : !expand});
    } else {
      let directors = venture.directors.map((director) => {
        return (`- Director: ${director}`);
      });

      if(!confirm(`
        Confirm new venture with the following details:

        - Name: ${venture.name}
        ${directors}`
      )){
        console.log('Canceled.');
      } else {
        dispatch(Actions.NEW_VENTURE(Account, venture));
        this.setState({expand : !expand});
      }

    }
  }

  SelectVenture = (venture) => {
    console.log(venture);
  }

  render(){
    let { set, address } = this.props.Account.Account;
    let { expand } = this.state;
    let { Ventures } = this.props.Venture;
    console.log(this.props);

    let DAVs;

    if(Ventures.length > 0){
      DAVs = Ventures.map((venture, i) => {
        return (
          <RaisedButton key={i} label={venture.name} style={customContentStyle} onClick={this.SelectVenture.bind(this, venture)}/>
        );
      })
    }


    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={"Select DAV"}
        />
        <CardActions expandable={true}>
          { Ventures.length > 0 ? DAVs : null }
        </CardActions>
        {
          !expand ? null : <CardText>
            <TextField
              hintText={`Enter DAV Name`}
              defaultValue=""
              type="text"
              onChange={this.ventureName.bind(this)}
              style={{width:'100%', marginTop:'1%'}} />
              Enter DAV Name
            <br/>
            <TextField
              hintText={`
                "${address}",
                "0xa601ea86ae7297e78a54f4b6937fbc222b9d87f4",
                "0x16977469ddee3b4c32f408c08f725bdb6f4d7366"`}
              multiLine={true}
              rows={3}
              rowsMax={100}
              type="text"
              onChange={this.ventureDirectors.bind(this)}
              style={{width:'100%', marginTop:'3%'}} />
              {`Enter director addresses of DAV as a quoted, comma separated list of Ethereum addresses. See example above.`}
            <br/>
          </CardText>
        }

        <CardActions expandable={true}>
          <RaisedButton secondary={true} label="New Decentralized Autonomous Venture | DAV" style={customContentStyle} onClick={this.newVenture}/>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Account : state.SetAccount,
    Venture : state.Venture,
    Balance : state.Balance
  }
}

const SelectVenture = connect(mapStateToProps)(SelectVentureComponent);

export default SelectVenture;
