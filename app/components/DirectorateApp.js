import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

function DirectorateApp({ push, children}) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/selectaccount">Foo</Link>
      </header>
      <div>
        <button onClick={() => push('/selectaccount')}>Go to /foo</button>
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  );
}

export default connect(
  null,
  routeActions
)(DirectorateApp)
