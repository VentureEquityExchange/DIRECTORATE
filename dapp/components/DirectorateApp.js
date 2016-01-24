import React, { Component } from 'react'
import SelectAccount from './Account/SelectAccount';
import Loading from './Loading';
import Grid from './Grid';
// import NewAccount from './Account/NewAccount';

export default class DirectorateApp extends Component {

  render(){
    return (
      <div>
        <Loading />
        <Grid />
      </div>
    );
  }
}
