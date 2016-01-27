import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Column} from 'react-cellblock';
import { SideNav, Wallet, NavBar } from './index';
import Appbar from 'muicss/lib/react/appbar';
import Panel from 'muicss/lib/react/panel';

class LayoutComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Grid>
        <Row>
          <NavBar />
        </Row>
        <br/>
        <Row>
          <Column width="1/2">
            <Wallet />
          </Column>
          <Column width="1/2">
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="2/3">
            <Wallet />
          </Column>
          <Column width="1/3">
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="2/3">
            <Wallet />
          </Column>
          <Column width="1/3">
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="2/3">
            <Wallet />
          </Column>
          <Column width="1/3">
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="1/3">
            <Wallet />
          </Column>
          <Column width="2/3">
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="1/1">
            <Wallet />
          </Column>
        </Row>

      </Grid>
    );
  }

}

const mapStateToProps = (state) => {
  return {

  }
}

const Layout = connect(mapStateToProps)(LayoutComponent);

export default Layout;
