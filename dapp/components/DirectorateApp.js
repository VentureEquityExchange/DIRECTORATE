import React, { Component } from 'react'
import { Loading, Layout, SelectAccount } from './index';

export default class DirectorateApp extends Component {

  render(){
    return (
      <div>
        <Loading />
        <Layout />
        <SelectAccount />
      </div>
    );
  }
}
