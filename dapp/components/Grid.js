import React, { Component, propTypes } from 'react';
import ReactGridLayout, { Responsive } from 'react-grid-layout';
import Wallet from './Account/Wallet'
import SideNav from './SideNav';
import SelectAccount from './Account/SelectAccount';
import _ from 'lodash';
import { connect } from 'react-redux';


class GridComponent extends Component {
  constructor(props){
    super(props);
  }

  onLayoutChange = (layout) => {
    this.props.onLayoutChange(layout);
  }

  render() {

    return (
      <ReactGridLayout layout={this.props.layout} onLayoutChange={this.onLayoutChange}>
        <div key={1}><Wallet /></div>
        <div key={2}>Test</div>
        <div key={3}>Test</div>
        <div key={4}>Test</div>
        <div key={5}>Test</div>
        <div key={6}>Test</div>
        <div key={7}>Test</div>
        <div key={8}>Test</div>
        <div key={9}>Test</div>
      </ReactGridLayout>
    );
  }
}

GridComponent.propTypes = { onLayoutChange : React.PropTypes.func.isRequired }

const mapStateToProps = (state) => {
  return {
    className : "layout",
    layout : [
      {x: 0, y: 2, w: 10, h: 3},
      {x: 2, y: 4, w: 3, h: 3},
      {x: 4, y: 6, w: 3, h: 3},
      {x: 6, y: 0, w: 3, h: 3},
      {x: 8, y: 0, w: 3, h: 3},
      {x: 10, y: 0, w: 3, h: 3},
      {x: 2, y: 2, w: 3, h: 3},
      {x: 4, y: 2, w: 3, h: 3}
    ],
    autoSize: false,
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    cols: 12,
    rowHeight: 30,
    initialWidth: 1200,
    margin: [10, 10],
    minH: 1,
    minW: 1,
    maxH: Infinity,
    maxW: Infinity,
    isDraggable: true,
    isResizable: true,
    useCSSTransforms: true,
    listenToWindowResize: true,
    verticalCompact: true
  }
}

const Grid = connect(mapStateToProps)(GridComponent);

export default Grid;
