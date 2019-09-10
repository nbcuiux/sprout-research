

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}


const SCROLL_BAR_WIDTH = getScrollbarWidth();

export default class Stickytable {

	constructor(el, options = {}) {

		if (el === undefined) {
			return;
		}

		const defaults = {
			rowSelector: "tr",
			wrapperClass: "stickytable-wrapper"
		}

		options = Object.assign({}, defaults, options);

		this._updateScroll = this._updateScroll.bind(this);
		this._onWindowResize = this._onWindowResize.bind(this);

		this.rowSelector = options.rowSelector;

		// Elements
		this.oldEl = el;
		this.parent = el.parentNode;
		this.elMain = el.cloneNode(true);
		this.elTop = el.cloneNode(true);
		this.elSide = el.cloneNode(true);
		this.elCorner =  el.cloneNode(true);

		this.elMainWrapper = document.createElement('div');
		this.elTopWrapper = document.createElement('div');
		this.elSideWrapper = document.createElement('div');
		this.elCornerWrapper = document.createElement('div');
		this.elWrapper = document.createElement('div');

		this.elWrapper.className = options.wrapperClass;
		
		this.elWrapper.appendChild(this.elMainWrapper);
		this.elWrapper.appendChild(this.elTopWrapper);
		this.elWrapper.appendChild(this.elSideWrapper);
		this.elWrapper.appendChild(this.elCornerWrapper);

		this.elMainWrapper.appendChild(this.elMain);
		this.elSideWrapper.appendChild(this.elSide);
		this.elTopWrapper.appendChild(this.elTop);
		this.elCornerWrapper.appendChild(this.elCorner);

		const cellWidth = this._getFirstColumnWidth(el); 
		const cellHeight = this._getFirstRowHeight(el); 
		this._updateStyles(cellWidth, cellHeight);

		// Events
		this.elMainWrapper.addEventListener("scroll", this._updateScroll);
		window.addEventListener("resize", this._onWindowResize);

		// Update DOM
		this.parent.replaceChild(this.elWrapper, el);
	}

	_onWindowResize () {
		this.reset();
	}

	_updateStyles (cellWidth, cellHeight) {

		this.elMain.style.position = "absolute";
		this.elTop.style.position = "absolute";
		this.elSide.style.position = "absolute";
		this.elCorner.style.position = "absolute";

		// Corner
		this.elCornerWrapper.style.position = "absolute";
		this.elCornerWrapper.style.overflow = "hidden";
		this.elCornerWrapper.style.left = "0";
		this.elCornerWrapper.style.top = "0";
		this.elCornerWrapper.style.width = cellWidth + "px";
		this.elCornerWrapper.style.height = cellHeight + "px";
		this.elCornerWrapper.style['pointer-events'] = "none";

		// Top
		this.elTopWrapper.style.position = "absolute";
		this.elTopWrapper.style.left = "0px";
		this.elTopWrapper.style.right = SCROLL_BAR_WIDTH + "px";
		this.elTopWrapper.style.overflow = "hidden";
		this.elTopWrapper.style.height = cellHeight + "px";
		this.elTopWrapper.style['pointer-events'] = "none";

		// Side
		this.elSideWrapper.style.position = "absolute";
		this.elSideWrapper.style.top = "0px";
		this.elSideWrapper.style.bottom = SCROLL_BAR_WIDTH + "px";
		this.elSideWrapper.style.overflow = "hidden";
		this.elSideWrapper.style.width = cellWidth + "px";
		this.elSideWrapper.style['pointer-events'] = "none";

		// Main
		this.elMainWrapper.style.position = "absolute";
		this.elMainWrapper.style.left = "0";
		this.elMainWrapper.style.top = "0";
		this.elMainWrapper.style.right = "0";
		this.elMainWrapper.style.bottom = "0";
		this.elMainWrapper.style.overflow = "scroll";
		this.elMainWrapper.style['-webkit-overflow-scrolling'] = 'touch';
	}

	_updateScroll () {
		const left = this.elMainWrapper.scrollLeft;
		const top = this.elMainWrapper.scrollTop;
		this.elTop.style.left = (-left) + "px";
		this.elSide.style.top = (-top) + "px";
	}

	_getFirstColumnWidth(el) {
		const row = el.querySelector(this.rowSelector);
		const cell = row.firstElementChild;
		const style = getComputedStyle(cell, null);
		const borderLeft = parseInt(style.getPropertyValue("border-left-width"));
		const borderRight = parseInt(style.getPropertyValue("border-bottom-width"));

		let width = cell.offsetWidth;

		if (borderLeft > 0) {
			width = width + borderLeft/2;
		}
		if (borderRight > 0) {
			width = width + borderRight/2;
		}
		return width;		
	}

	_getFirstRowHeight(el) {
		const row = el.querySelector(this.rowSelector);
		const cell = row.firstElementChild;
		const style = getComputedStyle(cell, null);
		const borderTop = parseInt(style.getPropertyValue("border-top-width"));
		const borderBottom = parseInt(style.getPropertyValue("border-bottom-width"));

		let height = cell.offsetHeight;

		if (borderTop > 0) {
			height = height + borderTop/2;
		}
		if (borderBottom > 0) {
			height = height + borderBottom/2;
		}
		return height;
	}

	destroy() {
		this.elMainWrapper.removeEventListener("scroll", this._updateScroll);
		this.parent.replaceChild(this.oldEl, this.elWrapper);
		this.parent = null;
		this.elMain = null;
		this.elTop = null;
		this.elSide = null;
		this.elCorner = null;
		this.elWrapper = null;
		this.elMainWrapper = null;
		this.elSideWrapper = null;
		this.elTopWrapper = null;
		this.elCornerWrapper = null;
	}


	reset() {
		const cellWidth = this._getFirstColumnWidth(this.elMain); 
		const cellHeight = this._getFirstRowHeight(this.elMain); 
		this._updateStyles(cellWidth, cellHeight);
	}




}