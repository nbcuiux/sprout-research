


// Sample code to set up React and JQuery



var React     = window.React = require('react');
var $ = require("./lib/tooltipster.bundle.js");
window.jQuery = $;

require("./lib/jquery.marquee.js");


import ReactDOM from 'react-dom';
import setupSplash from "./lib/splash.js";


import NavMenu from "./components/NavMenu.js";
import Header from "./components/Header.js";
import Pagination from "./components/Pagination.js";
import Search from "./components/Search.js";
import Timeline from "./components/Timeline.js";
import Lifecycle from "./components/Lifecycle.js";
import Accordion from "./components/Accordion.js";
import Stickytable from "./lib/Stickytable.js";

window.components = {
	NavMenu, Header, Pagination, Search, Timeline, Lifecycle
}



window.ReactDOM = ReactDOM;
window.setupSplash = setupSplash;





window.setupSectionNav = function() {
	$(".section-nav__item a").on("click", function(e) {
		e.preventDefault();
		let id = $(this).attr("href");
		let $el = $(id);

		$("html, body").animate({
			scrollTop: $el.offset().top - 100
		}, 500);
	});

	let numItems = $(".section-nav__item").length;
	let numClass = "";

	if (numItems < 8) {
		numClass = "section-nav__item-list--sm";
	}
	else if (numItems < 12) {
		numClass = "section-nav__item-list--md";
	}
	else if (numItems < 16) {
		numClass = "section-nav__item-list--lg";
	}
	$(".section-nav__item-list").addClass(numClass);
}




window.setupWidgets = function() {

	// Accordion widget
	$("[data-accordion]").each((index, el)=>{
		let items = [];
		let sections = $(el).find("[data-accordion-title]");
		// Extract data from the rendered markup
		sections.each((index, titleEl) => {
			let $titleEl = $(titleEl);
			let title = $titleEl.html();
			let content = $titleEl.next().html();
			items.push({
				title: title,
				content: content
			})
		});
		ReactDOM.render(
	    	React.createElement(Accordion, {items: items}),
	    	el
	    );
	});

	// Tooltip widget
	$('.reference-link').tooltipster({
		theme: 'tooltipster-shadow'
	});


	// Nav menu
	const navEl = document.getElementById("nav");
	if (navEl) {
		let props = Object.assign({}, window.MENU_DATA, { logoSrc: window.OPTIONS_DATA.menu_logo })
		ReactDOM.render(
	    	React.createElement(window.components.NavMenu, props),
	    	navEl
	    );
	}

	// Sticky tables
	let stickytable = new Stickytable($("table")[0]);

	var elem = document.querySelector('.index-landing');

}







