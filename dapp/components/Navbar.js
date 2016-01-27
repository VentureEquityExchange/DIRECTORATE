import React from 'react';
import { connect } from 'react-redux';
import Appbar from 'muicss/lib/react/appbar';


const NavBarStyle = {
  backgroundColor:'#263238',
  width:'200%',
  color:'white',
  marginLeft:'-7%',
  height:'34px',
  marginTop:'-10px',
  paddingTop : '21px',
  paddingLeft : '100px',
  fontFamily: 'Roboto',
  fontStyle: 'italic',
  fontSize: '21px'
}



class NavBarComponent extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		return (
      <Appbar style={NavBarStyle} >
        {this.props.title}
      </Appbar>
    );
	}
}

const mapStateToProps = (state) => {
  return {
    title : 'VEX|DIRECTORATE'
  }
}

const NavBar = connect(mapStateToProps)(NavBarComponent);

export default NavBar;
