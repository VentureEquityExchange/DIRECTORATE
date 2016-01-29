import React, { Component } from 'react'
import { Loading, Layout, SelectAccount, Grid } from './index';
import { connect } from 'react-redux';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))
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
