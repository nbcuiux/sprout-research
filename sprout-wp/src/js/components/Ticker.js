
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from "jquery";
require("../lib/jquery.smoothdivscroll-1.3-min.js");

export default class Ticker extends Component {


  constructor(props) {
  }

  componentDidMount() {
    $(this.refs.container).smoothDivScroll({
      mousewheelScrolling: "allDirections",
      manualContinuousScrolling: true,
      autoScrollingMode: "onStart"
    });
  }

  render() {
    return (
      <div ref="container">Helllllooo</div>
    );
  }
}
