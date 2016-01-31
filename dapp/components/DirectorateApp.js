import React, { Component } from 'react'
import { Loading, Layout, SelectAccount, Grid, SelectVenture } from './index';
import { connect } from 'react-redux';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))
class DirectorateAppComponent extends Component {

  render(){
    let { set } = this.props.Account.Account;

    console.log(set);

    return (
      <div>
        <Loading />
        {set == true ? <Layout /> : null }
        <SelectAccount />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    Account : state.Account,
    Venture : state.Venture
  }
}

const DirectorateApp = connect(mapStateToProps)(DirectorateAppComponent);

export default DirectorateApp;
