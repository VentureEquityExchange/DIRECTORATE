import React, { Component } from 'react'
import { Loading, Layout, SelectAccount, Grid, SelectVenture, Welcome } from './index';
import { connect } from 'react-redux';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))
class DirectorateAppComponent extends Component {

  render(){
    let { set } = this.props.Account.Account;
    let { compiled } = this.props.Venture;

    console.log(set);
    console.log(compiled);

    return (
      <div>
        <Loading />
        {set ? <Layout /> : null }
        {compiled ? <SelectAccount /> : <Welcome /> }
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
