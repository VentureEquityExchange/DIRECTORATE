import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class VotingComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  render(){
    console.log(this.props);
    return(
      <Card>
        <CardHeader
          title="Voting"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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

const Voting = connect(mapStateToProps)(VotingComponent);

export default Voting;
