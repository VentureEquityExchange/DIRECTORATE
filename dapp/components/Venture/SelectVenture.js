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
    console.log('Make call to DirectorIndex contract and send back results');

    setTimeout(() => {
      dispatch(Actions.GET_VENTURES());
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

    if(!this.state.expand){
      this.setState({expand : !expand});
    } else {
      let directors = venture.directors.map((director) => {
        return (`- Director: ${director}`);
      });
      let confidence = confirm(`
        Confirm new venture with the following details:

        - Name: ${venture.name}
        ${directors}`
      );

      if(!confidence){
      } else {
        dispatch(Actions.NEW_VENTURE(venture));
      }

    }
  }

  render(){
    let { set, address } = this.props.Account.Account;
    let { expand } = this.state;

    console.log(this.props);
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={"Select Venture"}
        />
        {
          !expand ? null : <CardText>
            <TextField
              hintText={`Enter Venture Name`}
              defaultValue=""
              type="text"
              onChange={this.ventureName.bind(this)}
              style={{width:'100%', marginTop:'1%'}} />
              Enter Venture Name
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
              {`Enter Director Addresses as a quoted, comma separated list of ethereum addresses. See example above.`}
            <br/>
          </CardText>
        }

        <CardActions expandable={true}>
          <RaisedButton secondary={true} label="New Venture" style={customContentStyle} onClick={this.newVenture}/>
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
