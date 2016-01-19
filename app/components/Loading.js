import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';

import {RouterContext, hashHistory} from 'react-router';


export default class Loading extends Component {


  render() {
    let { state } = this.props;
    let { blockNumber, syncing } = state.network;
    let { accounts } = state.accounts;

    console.log(state);

    if(!syncing){
      return (
        <div>
          Current block: { blockNumber }
        </div>
      )
    } else {
      return (
        <div>
          <p>Starting Block: { parseInt(syncing.startingBlock, 16) }</p>
          <p>Current Block: { parseInt(syncing.currentBlock, 16) }</p>
          <p>Highest Block: { parseInt(syncing.highestBlock, 16) }</p>
          <p>% Completed: { (parseInt(syncing.currentBlock, 16)/parseInt(syncing.highestBlock, 16))*100 }</p>
        </div>
      )
    }
  }
}








// Loading Status upon fresh launch..

// const account = (state, action) => {
//   switch(action.type){
//     case ''
//   }
// }
//
// const accounts = ( state = [], action) => {
//   switch(action.type){
//     case 'GET_ACCOUNTS':
//       return [
//         ...state,
//         account(undefined, action)
//       ];
//     default:
//       return state;
//   }
// }

// const status = ( state = {}, action) => {
//   switch(action.type){
//     case 'LOADING':
//       return action.status;
//     default:
//       return state;
//   }
// }
//
// const DApp = combineReducers({
//   // accounts,
//   status
// });
//
// let store = createStore(DApp);
//
// store.dispatch({
//   type: 'LOADING',
//   status : {
//     error : null,
//     result : false
//   }
// })
//
// console.log(store.getState());
//
// export default class Loading extends Component {
//   status = () => {
//     Ethereum.syncing().then(status => {
//       console.log(status);
//     }).catch(error => {
//       let EADDRNOTAVAIL = new RegExp('EADDRNOTAVAIL');
//       if(error.match(EADDRNOTAVAIL)){
//         console.log('Dispatching State');
//         store.dispatch({
//           type: 'LOADING',
//           status : {
//             error : error,
//             result : null
//           }
//         })
//       };
//     });
//     console.log(store.getState());
//   }
//
//   render() {
//     this.status();
//     return (
//       <div onClick={this.status}>
//         <p >Loading Status</p>
//       </div>
//     )
//   }
// }


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
