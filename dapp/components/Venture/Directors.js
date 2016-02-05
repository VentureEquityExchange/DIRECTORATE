import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
// material-ui components
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Griddle from 'griddle-react';

class DirectorsComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(`Hello World; we're here.`)
    let { dispatch, Venture } = this.props;
    let { Directors } = Venture.Venture.contract;

    dispatch(Actions.DAV_DIRECTORS(Directors));

  }

  render(){
    let { Venture, Directors } = this.props.Venture;

    console.log(Directors);

    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={`${Venture.name} | Directors`}
          subtitle={`Venture Address: ${Venture.DAV}`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Griddle results={Directors} showFilter={true} showSettings={true} columns={["address"]}/>
        </CardText>
      </Card>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    Venture : state.Venture,
    Account : state.Account
  }
}

const Directors = connect(mapStateToProps)(DirectorsComponent);


export default Directors;
