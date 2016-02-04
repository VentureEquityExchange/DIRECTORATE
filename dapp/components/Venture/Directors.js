import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
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
    let { dispatch, Venture } = this.props;
    let { Directors } = Venture.Venture.contract;

    console.log(Directors);

    dispatch(Actions.DAV_DIRECTORS(Directors));

  }

  render(){
    let { Venture } = this.props.Venture;

    console.log(Venture);

    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          title={`${Venture.name} | Directors`}
          subtitle={`Venture Address: ${Venture.DAV}`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lets put a table here perhaps
          // Will leave off from here.
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