import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Column} from 'react-cellblock';
import { SideNav, Wallet, NavBar, MarketInsights, SelectVenture } from './index';
import Appbar from 'muicss/lib/react/appbar';
import Panel from 'muicss/lib/react/panel';

class LayoutComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let { Venture } = this.props.Venture;

    return (
      <Grid >
        <NavBar />
        <Row>
          <SideNav />
        </Row>
        <br/>
        { Venture == undefined ?
          <Row>
            <Column width="1/1">
              <SelectVenture />
            </Column>
          </Row> : null
        }
      </Grid>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    Venture : state.Venture
  }
}

const Layout = connect(mapStateToProps)(LayoutComponent);

export default Layout;
