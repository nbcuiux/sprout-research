
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from "jquery";
import DelayChain from '../lib/DelayChain';
import WaypointClass from "./WaypointClass";

require("../lib/noframework.waypoints.js");



function getLimitHeight() {
	return 150;
	return Math.floor(window.innerHeight * 0.5);
}


export default class Lifecycle extends React.Component {

	constructor(props) {

		super(props);
		
		// Assign block ids so we can play with them
		let blockIds = 0;
		this.props.stages.forEach((stage,i)=>{
			let blocks = stage.content_block;
			blocks.forEach((block, j) =>{
				block.id = blockIds;
				blockIds++;
			});
		});
	
		this.state = {
			stickyHeader: false,
			currentSection: null,
			currOpenMoreBlock: null,
			floatingBlock: false,
			keyOpen: false
		}
	}

	componentDidMount() {
		this.introWp = new Waypoint({
			element: this.refs.intro,
			handler: (direction)=>{
				if (direction === "up") {
					this.setState({
						stickyHeader: false
					})
				}
				else if (direction === "down") {
					this.setState({
						stickyHeader: true
					})
				}
			},
			offset: function() {
				return -this.element.clientHeight + 70
			}		
		})

		//window.addEventListener("wheel", this.windowScroll.bind(this));
		//$(window).on("mousewheel DOMMouseScroll", this.windowScroll.bind(this));
	}

	setSection(index) {
		let stages = this.props.stages;
		let section = (stages[index]) ? stages[index].section_category : null;
		this.setState({
			currentSection: section
		})
	}

	setFloatingBlock(val, top) {
		this.setState({
			floatingBlock: val,
			floatingTop: top
		})
	}

	toggleKey(e) {
		e.preventDefault();
		this.setState({
			keyOpen: !this.state.keyOpen
		});
	}

	openMore(blockId) {
		let state = {
			currOpenMoreBlock: blockId
		}
		if (!blockId) {
			state.floatingBlock = false;
		}
		this.setState(state);
	}

	render() {

		let { stages, keys } = this.props;
		let { stickyHeader, currentSection, currOpenMoreBlock, keyOpen } = this.state;

		let classnames = ClassNames({
			'lc-main': true,
			'lc-main--sticky-header': stickyHeader,
			'lc-main--key-open': keyOpen
		});

		let stageListWrapperStyle = {};
		let stageListStyle = {};
		let introStyle = {
			backgroundColor: this.props.introColor
		}

		return (
			<div className={classnames}>
				<div className="lc-background">
					{currentSection}
				</div>
				<div className="lc-intro-wrapper" ref="intro">
					<div className="lc-intro" style={introStyle}>
						<img className="lc-intro__img" src={ this.props.introImg } />
						<div className="lc-intro__text">
							{ this.props.title }
						</div>
					</div>
				</div>
				<div className="lc-key">
					<div className="lc-key__title" onClick={this.toggleKey.bind(this)}>
						KEY
						<svg className="lc-key__arrow" width="16" height="9">
	                      <path d="M0 0 L 8 8 L 16 0" />
	                    </svg>
					</div>
					<div className="lc-key__list">
						<div className="lc-key__list-inner">
							{ 
								keys.map((item, index) => {
									return (
										<div className="lc-key__item" key={index}>
											<img className="lc-key__icon" src={item.icon} />
											<div className="lc-key__name">
												{ item.name }
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
				<div className="lc-stage-list__wrapper" ref="stageList" style={stageListWrapperStyle}>
					<div className='lc-stage-list' style={stageListStyle}>
					{
						stages.map((stage, index)=>{
							switch (stage.acf_fc_layout) {
								case "standard_stage":
									return <LifecycleStageItem 
										key={index}
										stage={stage} 
										index={index}
										currOpenMoreBlock={ currOpenMoreBlock } 
										openMore={this.openMore.bind(this)} 
										setSection={this.setSection.bind(this)}
										setFloatingBlock={this.setFloatingBlock.bind(this)} />
								case "cycle_stage":
									return <LifecycleCycleStageItem key={index} stage={stage} index={index} setSection={this.setSection.bind(this)} />
								default:
									return null;
							}
						})
					}
					</div>
				</div>
			</div>
		)
	}

}

class LifecycleStageItem extends React.Component {


	componentDidMount() {

		this.waypoint = new Waypoint({
			element: this.refs.container,
			handler: (direction) => {
				if (direction === "down") {
					this.props.setSection(this.props.index)
				}
				else {
					this.props.setSection(this.props.index-1)
				}
			},
			offset: '100%'
		})

	}

	render() {

		let contentBlocks = this.props.stage.content_block;
		let {currOpenMoreBlock} = this.props;


		let left = contentBlocks.filter((item)=>{
			return item.side === "Left";
		});

		let right = contentBlocks.filter((item)=>{
			return item.side === "Right";
		});

		return (

			<div className="lc-stage" ref="container">
				<div className="lc-stage__inner">
					<WaypointClass enterClassName="lc-stage__dot-enter">
						<div className="lc-stage__dot">
						</div>
					</WaypointClass>
					<div className={"lc-stage__left" + (left.length > 0 ? " lc-stage__has-content" : "")}>
						{ 
							left.map((block,index) => {
								return <LifecycleStageBlock 
									isSelected={currOpenMoreBlock===block.id} 
									key={index} 
									block={block} 
									openMore={this.props.openMore} 
									setFloatingBlock={this.props.setFloatingBlock}
								/>
							})
						}
					</div>
					<div className={"lc-stage__right" + (right.length > 0 ? " lc-stage__has-content" : "")}>
						{ 
							right.map((block, index) => {
								return <LifecycleStageBlock 
									isSelected={currOpenMoreBlock===block.id} 
									key={index} 
									block={block} 
									openMore={this.props.openMore} />
							})
						}
					</div>
				</div>
				{
					this.props.stage.time_label ?
						<WaypointClass enterClassName="lc-stage__time-label-enter">
							<div className="lc-stage__time-label">
								{ this.props.stage.time_label }
							</div>
						</WaypointClass>
					:
						null
				}
			</div>

		)
	}
}

const preventScroll = function(e) {
	e.preventDefault();
	e.stopPropagation();
}




let bigMoreBlockHeight = 400;

class LifecycleStageBlock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}

		this.hijackScroll = this.hijackScroll.bind(this);

		this.scrollToClose = (e) => {
			e.preventDefault();
			e.stopPropagation();
			$(window).off("scroll", this.scrollToClose);
			this.setState({
				isOpen: false
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isOpen !== prevState.isOpen) {
			if (this.state.isOpen && this.isBig()) {

				let $container = $(this.refs.container);
				let $row = $container.find(".lc-stage__block-row");
				let $openMoreWrapper = $(this.refs.moreWrapper);
				
				let limitHeight = bigMoreBlockHeight;
				let actualHeight = $container.find(".lc-stage__more").height();
				let vh = window.innerHeight;

				let scrollTop = ($row.offset().top + $row.height()) - vh + this.getMoreHeight() + 30;
				$("body").animate({
					scrollTop: scrollTop
				}, 600);

				// Get the selected element
				


				// Do we need to implement sticky scroll?
				if (actualHeight <= limitHeight) {
					this.scrollRequired = false;
					$openMoreWrapper.removeClass("more-below");
				}
				else {
					this.scrollRequired = true;
					$openMoreWrapper.addClass("more-below");
					
				}

				$(window).on("mousewheel DOMMouseScroll", this.hijackScroll);
				$("body").addClass("big-overlay-open");
			}
			else {
				$(window).off("mousewheel DOMMouseScroll", this.hijackScroll);
				window.setTimeout(()=>{
					$("body").removeClass("big-overlay-open");
				}, 0);
			}
		}
	}

	hijackScroll(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!this.scrollRequired) {
			return;
		}
		// Scroll the open more container
		let $container = $(this.refs.container);
		let $moreWrapper = $(this.refs.moreWrapper);
		let $more = $container.find(".lc-stage__more");
		let limitedHeight = $container.find(".lc-stage__more-outer").height();
		let moreHeight = $more.height();
		let top = parseInt($more.css("top"));
		let deltaY = e.originalEvent.deltaY;

		// Scrolling down
		if (deltaY > 0) {
			// Scrolled past the end of the block content
			if (top + moreHeight <= limitedHeight + 10) {
				$moreWrapper.removeClass("more-below");
				$more.css("top", (limitedHeight - moreHeight) + "px");
			}
			// Haven't reached the end of content
			else {
				let newTop = Math.max(top - deltaY, limitedHeight - moreHeight);
				$more.css("top", newTop + "px");
				$moreWrapper.addClass("more-above");
			}
		}
		// Scrolling up
		else if (deltaY < 0) {
			// Scrolled past the start of the block content
			if (top >= -10) {
				$moreWrapper.removeClass("more-above");
				$more.css("top", "0px");
			}
			// Haven't reached the top yet
			else {
				let newTop = Math.min(top - deltaY, 0);
				$more.css("top", newTop + "px");
				$moreWrapper.addClass("more-below");
			}
		}
		return false;
	}

	toggleOpen(e) {
		e.preventDefault();
		e.stopPropagation();

		if (this.props.block.more) {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	}

	isBig() {
		return this.props.block.more_size === "Big";
	}

	getMoreHeight() {
		let moreHeight = $(this.refs.more).innerHeight();
		let maxHeight = this.isBig() ? bigMoreBlockHeight : 200;
		let boxMargin = parseInt($(this.refs.moreOuter).css("left"));
		moreHeight = Math.min(moreHeight, maxHeight);
		moreHeight = moreHeight + (boxMargin*2);
		return moreHeight;
	}

	render() {
		let {block, isSelected} = this.props;
		let moreBlock = null;
		let moreHeight = 0;
		let classnames = ClassNames({
			'lc-stage__block': true,
			'lc-stage__block--open': this.state.isOpen,
			'lc-stage__has-more': block.more,
			'lc-stage__block--big': this.isBig()
		});

		if (this.isBig()) {
			let moreStyle;
			if (this.state.isOpen) {
				moreStyle = {
					height: this.getMoreHeight()
				}
			}
			else {
				moreStyle = {
					height: 0
				}
			}
			moreBlock = (block.more) ? (
				<div className="lc-stage__more-wrapper--big" style={moreStyle} ref="moreWrapper">
					<div className="lc-stage__more-scroll-up"></div>
					<div className="lc-stage__more-scroll-down"></div>
					<div className="lc-stage__more-close" onClick={this.toggleOpen.bind(this)}>&times;</div>
					<div className="lc-stage__more-outer" ref="moreOuter">
						<div ref="more" className="lc-stage__more" dangerouslySetInnerHTML={{__html: block.more }}>
						</div>
					</div>
				</div>
			) : null;
		}
		else {
			moreHeight = $(this.refs.more).innerHeight();
			moreBlock = (block.more) ? (
				<div className="lc-stage__more-wrapper--side" ref="moreWrapper">
					<div ref="more" className="lc-stage__more" dangerouslySetInnerHTML={{__html: block.more }}>
					</div>
				</div>
			) : null;
		}

		console.log("block props", block);
		return (
			<div className={classnames} id={"block-" + this.props.block.id} ref="container">
				<div className="lc-stage__more-overlay" onClick={this.toggleOpen.bind(this)}></div>
				<div className="lc-stage__block-row">
					<WaypointClass enterClassName="lc-stage__connector-enter">
						<div className="lc-stage__connector"></div>
					</WaypointClass>
					<WaypointClass enterClassName="lc-stage__icon-enter">
						<div className="lc-stage__icon">
							{
								block.icon !== '0' ? 
									<img src={block.icon} />
								:
									null
							}
						</div>
					</WaypointClass>
					<WaypointClass enterClassName="lc-stage__visible-enter">
						<div className="lc-stage__visible" onClick={this.toggleOpen.bind(this)}>
							<div className="lc-stage__heading">
								{ block.heading }
							</div>
							<div className="lc-stage__blurb">
								{ block.blurb }
							</div>
							{
								block.side === "Left" ?
									<svg className="lc-stage__more-arrow" width="20" height="100" viewBox="0 0 20 100">
										<path d={"M10.5 0 L 10.5 15 L 20 25 L 10.5 35 L 10.5 " + (moreHeight + 3)}/>
									</svg>
								:
									<svg transform="translate(-1, 0)" className="lc-stage__more-arrow" width="20" height="100" viewBox="0 0 20 100">
										<path d={"M10.5 0 L 10.5 15 L 0 25 L 10.5 35 L 10.5 " + (moreHeight + 3)}/>
									</svg>
							}

						</div>
					</WaypointClass>
					{ moreBlock }					
				</div>

			</div>			
		)
	}

}


class LifecycleCycleStageItem extends React.Component {
	
	componentDidMount() {
		this.waypoint = new Waypoint({
			element: this.refs.container,
			handler: (direction) => {
				if (direction === "down") {
					this.props.setSection(this.props.index)
				}
				else {
					this.props.setSection(this.props.index-1)
				}
			},
			offset: '100%'
		})
	}

	render () {


		let contentBlocks = this.props.stage.content_block;
		let circleRadius = 300;

		let leftItems = contentBlocks.filter((item)=>{
			return item.side === "Left";
		});

		let rightItems = contentBlocks.filter((item)=>{
			return item.side === "Right";
		});


		let leftAngleGap = Math.PI / (leftItems.length + 1);		
		let leftEls = leftItems.map((block, index)=> {
			// distribute around left side of circle
			let angle = (leftAngleGap * (index+1)) - (Math.PI/2);
			let top = Math.sin(angle) * circleRadius;
			let right = Math.cos(angle) * circleRadius;
			return (
				<div className="lc-stage-cycle__block lc-stage-cycle__block--left" style={{right: right, top: top}}>
					<LifecycleStageBlock key={index} block={block} />
				</div>
			)
		});


		let rightAngleGap = Math.PI/ (rightItems.length + 1);	
		let rightEls = rightItems.map((block, index)=> {
			// distribute around right side of circle
			let angle = (rightAngleGap * (index+1)) - (Math.PI/2);
			let top = Math.sin(angle) * circleRadius;
			let left = Math.cos(angle) * circleRadius;
			return (
				<div className="lc-stage-cycle__block lc-stage-cycle__block--right" style={{left: left, top: top}}>
					<LifecycleStageBlock key={index} block={block} />
				</div>
			)
		});

		return (
			<div className="lc-stage-cycle" ref="container">
				<WaypointClass enterClassName="lc-stage__circle-enter">
				<div className="lc-stage__circle">
					<div className="lc-stage__circle-content">
						<div className="lc-stage__circle-content-inner">
							<div className="lc-stage__heading">
								{this.props.stage.inner_heading}
							</div>
							<div className="lc-stage__blurb" dangerouslySetInnerHTML={{__html: this.props.stage.inner_content }}>
							</div>
						</div>
					</div>
					<div className="lc-stage-cycle__list">
						<div className={"lc-stage-cycle__left" + (leftItems.length > 0 ? " lc-stage__has-content" : "")}>
							{ leftEls }
						</div>
						<div className={"lc-stage-cycle__right" + (rightItems.length > 0 ? " lc-stage__has-content" : "")}>
							{ rightEls }
						</div>
					</div>
				</div>
				</WaypointClass>
			</div>

		)
	}

}


class LifecycleStageCycleBlock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	componentDidUpdate(prevProps) {
		
	}

	toggleOpen(e) {
		e.preventDefault();
		e.stopPropagation();		
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	render() {
		let {block} = this.props;
		let { isOpen } = this.state; 
		let moreStyle;
		let classnames = ClassNames({
			'lc-stage__block': true,
			'lc-stage__block--open': isOpen,
			'lc-stage__has-more': block.more
		});

		return (
			<div className={classnames} id={"block-" + this.props.block.id}>
				<div className="lc-stage__cycle-block-row">
					{
						block.icon !== '0' ?
							<WaypointClass enterClassName="lc-stage__icon-enter">
								<div className="lc-stage__icon">
									<img src={block.icon} />
								</div>
							</WaypointClass>
						:
							null
					}
					<WaypointClass enterClassName="lc-stage__visible-enter">
						<div className="lc-stage__visible" onClick={this.toggleOpen.bind(this)}>
							<div className="lc-stage__heading">
								{ block.heading }
							</div>
							<div className="lc-stage__blurb">
								{ block.blurb }
							</div>
							{
								block.side === "Left" ?
									<svg className="lc-stage__more-arrow" width="20" height="100" viewBox="0 0 20 100">
										<path d={"M10.5 0 L 10.5 15 L 20 25 L 10.5 35 L 10.5 " + (moreHeight + 3)}/>
									</svg>
								:
									<svg transform="translate(-1, 0)" className="lc-stage__more-arrow" width="20" height="100" viewBox="0 0 20 100">
										<path d={"M10.5 0 L 10.5 15 L 0 25 L 10.5 35 L 10.5 " + (moreHeight + 3)}/>
									</svg>
							}							
						</div>
					</WaypointClass>
					<div ref="more" className="lc-stage-cycle__more" dangerouslySetInnerHTML={{__html: block.more }}>
					</div>
				</div>


			</div>			
		)
	}
}






