import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Column} from 'react-cellblock';
import { SideNav, Wallet, NavBar, MarketInsights, SelectVenture,  Directors, Voting, Shareholders, Bylaws, DashNav, DashView } from './index';
import Appbar from 'muicss/lib/react/appbar';
import Panel from 'muicss/lib/react/panel';

class LayoutComponent extends Component {
  constructor(props) {
    super(props);
  }



  render(){
    let { Venture } = this.props.Venture;

    let view = true;

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
          </Row> : <div>
          <Row>
            <Column width="1/7">
              <DashNav />
            </Column>
            <Column width="6/7">
              <DashView />
            </Column>
          </Row>

          </div>
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
