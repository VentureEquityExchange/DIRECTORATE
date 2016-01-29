import React, { Component } from 'react'
import { Loading, Layout, SelectAccount, Grid } from './index';
import { connect } from 'react-redux';

class DirectorateAppComponent extends Component {

  render(){
    let { set } = this.props.SetAccount.Account;

    return (
      <div>
        <Loading />
        {set ? <Layout /> : null }
        <SelectAccount />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    SetAccount : state.SetAccount
  }
}

const DirectorateApp = connect(mapStateToProps)(DirectorateAppComponent);

export default DirectorateApp;
