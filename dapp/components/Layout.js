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
      <Grid >
        <NavBar />
        <Row>
          <SideNav />
        </Row>
        <br/>
        <Row>
        <Column width="1/1">
          <Wallet />
        </Column>
        </Row>
        <br/>
        <Row>
          <Column width="1/15">
            <Wallet />
          </Column>
          <Column width="7/15">
            <Wallet />
            <br/>
            <Wallet />
          </Column>
          <Column width="7/15">
            <Wallet />
            <br/>
            <Wallet />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column width="2/3">
            <Wallet />
            <br/>
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
