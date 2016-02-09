import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

class VotingComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Venture } = this.props.Venture
    dispatch(Actions.GET_OPEN_RESOLUTIONS(Venture));
  }

  render(){
    let { Venture } = this.props.Venture;

    return(
      <Card initiallyExpanded={true} >
        <CardHeader
          title="Voting"
          subtitle={`Voting Resolutions for ${Venture.name}`}
        />
        <CardText expandable={true}>
        <Tabs>
         <Tab label="Open Resolutions" >
           <div>
             <h2 >Tab One</h2>
             <p>
               This is an example tab.
             </p>
             <p>
               You can put any sort of HTML or react component in here. It even keeps the component state!
             </p>
           </div>
         </Tab>
         <Tab label="All Resolutions" >
           <div>
             <h2 >Tab Two</h2>
             <p>
               This is another example tab.
             </p>
           </div>
         </Tab>
        </Tabs>
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

const Voting = connect(mapStateToProps)(VotingComponent);

export default Voting;
