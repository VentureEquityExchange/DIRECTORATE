import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';

import Dialog from 'material-ui/lib/dialog';


class Loading extends Component {
  // ({ loading, Actions })

  componentDidMount(){
    let { dispatch } = this.props
    console.log(dispatch);

    let action = Actions._LOADING(false);
    console.log(action);
    dispatch(action);
  }

  render(){
    let { loading, dispatch } = this.props;

    let boundActionCreators = bindActionCreators(Actions, dispatch)
    console.log(boundActionCreators)

    return (
      <div {...boundActionCreators}>
      <Dialog
        title="VEX|DIRECTORATE"
        modal={false}
        open={true}
      >
        <div>Loading Ethereum blockchain</div>
      </Dialog>
      </div>

    )
  }

}

export default connect(
  state => ({loading : state.loading})
)(Loading)
