import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router'

import Dialog from 'material-ui/lib/dialog';
import LinearProgress from 'material-ui/lib/linear-progress';
import * as Network from '../utilities/Network/index';
import Promise from 'bluebird';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class Loading extends Component {
  constructor(props){
    super(props);

    this.state = {
      error : undefined,
      status : {
        syncing : {},
        blockNumber : 0
      }
    }
  }

  componentDidMount(){


    Network.getStatus().then((status) => {
      let { dispatch } = this.props;
      let { push } = routeActions;
      let { syncing, blockNumber } = status;

      this.setState({
        error : undefined,
        status : {
          syncing : syncing,
          blockNumber : blockNumber
        }
      });

      return dispatch(Actions._NETWORK(status));

    }).catch(error => {
      let { dispatch } = this.props;
      this.setState({
        error : error.code
      });

      return dispatch(Actions._ERROR(error));
    });
  }

  syncStatus = () => {
    let { currentBlock, highestBlock} = this.state.status.syncing;
    currentBlock = parseInt(currentBlock, 16);
    highestBlock = parseInt(highestBlock, 16);
    let completed = Number(currentBlock/highestBlock)*100;

    return (
      <div>
        <p>Connected to the Ethereum Blockchain.</p>
        <p>Syncing block {currentBlock} of {highestBlock}.</p>
        <LinearProgress mode="determinate" value={completed} />
      </div>
    );

  }

  loadingEthereum = () => {
    return (
      <div>
        <p>Connecting to Ethereum Network... one moment.</p>
      </div>
    );
  }

  componentWillUnmount() {
    console.log('unmounted');
  }

  render(){
    this.componentDidMount();
    return (
      <Dialog
        title="VEX|DIRECTORATE"
        modal={false}
        open={true}
      >
        {this.state.error == undefined && this.state.status.syncing.highestBlock > 0 ? this.syncStatus() : this.loadingEthereum() }
      </Dialog>

    )
  }

}

export default connect(null, null, null, {pure : false})(Loading)
