import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'
import SelectAccount from './Account/SelectAccount';

function DirectorateApp({ push, children}) {
  return (
    <div>{children}</div>
  );
}

export default connect(
  null,
  routeActions
)(DirectorateApp)
