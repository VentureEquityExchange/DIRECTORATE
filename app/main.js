import Babel from 'babel/polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, useRouterHistory } from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import { getNetworkStatus } from './utilities/Redux/Actions';
import * as Ethereum from './ethereum/index';
import Loading from './components/Loading';
import { store } from './utilities/Redux/Store';

const render = () => {

  setTimeout(() => {getNetworkStatus()}, 500);
  // console.log(store.getState());
  ReactDOM.render((
    <Loading state={store.getState()}/>), document.getElementById('DirectorateApp'));
}


store.subscribe(render);
render();

// Old Information

//
//
//
//
//
//
// const customContentStyle = {
//   width: 'auto',
//   maxWidth: 'none',
// };
//
// class LoadingFormat extends React.Component {
//   constructor(props){
//     super(props);
//     this.props.format;
//     this.props.open;
//     this.title = "VΞX|DIRΞCTORATΞ";
//     this.message = "Connecting to the Ξthereum Network... one moment."
//     this.loading = true;
//   }
//
//   render() {
//     switch (this.props.format) {
//       case 'modal':
//         return (
//           <Dialog
//             title={this.title}
//             modal={true}
//             open={this.props.open}
//             contentStyle={customContentStyle}
//           >
//           {this.message}
//           </Dialog>
//         )
//         break;
//       default:
//         return (
//           <div>
//             <h1>VΞX|DIRΞCTORATΞ</h1>
//             <h4>Connecting to the Ξthereum Network... one moment.</h4>
//           </div>
//         )
//     }
//   }
// }
//
//
// export default class Loading extends React.Component {
//   constructor(props){
//     super(props);
//     this.props.format;
//     this.state = {
//       open : true,
//       loaded : false
//     };
//   }
//
//   setContext(){
//     this.context = this._reactInternalInstance._context;
//   }
//
//   handleClose() {
//     setTimeout(() => {
//         this.context.router.replace({query : ''}, '/selectaccount');
//         // this.setState({open : false, loaded : true});
//     }, 5000)
//   }
//
//   render() {
//     this.setContext();
//     this.handleClose();
//     return (
//       <div>
//         {this.state.open ? <LoadingFormat format={this.props.format} open={this.state.open} /> : null}
//         {this.state.loaded ? <DirectorateApp view="select-account" format="modal"/> : null}
//       </div>
//     );
//   }
// }







  // <Router history={hashHistory} createElement={LoadingModal}>
  //   <Route path="/" component={DirectorateApp}>
  //     <IndexRoute  component={LoadingModal}/>
  //     <Route path="/selectaccount/" component={SelectAccount} />
  //   </Route>
  // </Router>
