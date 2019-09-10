
import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import ClassNames from 'classnames';
import $ from "jquery";
import DelayChain from '../lib/DelayChain';
require("../lib/noframework.waypoints.js");


export default class WaypointClass extends React.Component {

	componentDidMount () {

		let node = this.refs.container.children[0];

		this.waypoint = new Waypoint({
		  element: node,
		  handler: (direction) => {
		  	if (direction === "down") {
		  		$(node).addClass(this.props.enterClassName);
		  	}
		  	else {
		  		$(node).removeClass(this.props.enterClassName);
		  	}
		  },
		  offset: '90%'
		});


	}

	render () {
		return (
			<span ref="container">
				{this.props.children}
			</span>
		)
	}

}