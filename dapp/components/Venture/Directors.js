import React, { Component } from 'react';
import { connect } from 'react-redux';

// material-ui components
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


class DirectorsComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(`Hello World; we're here.`)
  }

  render(){
    let { Venture } = this.props.Venture;

    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          title={`${Venture.name} | Directors`}
          subtitle={`Venture Address: ${Venture.address}`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lets put a table here perhaps
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="What Do we want to do with Directors?"/>
          <FlatButton label="Anything?"/>
        </CardActions>
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
