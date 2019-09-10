
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from "jquery";
import DelayChain from '../lib/DelayChain';




function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}



export default class Timeline extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isSticky: false,
      zoomFactor: 4,
      currentOpenPoint: null,
      currentScrollStep: 0,
      detailIsOpen: false,
      currentOpenCategory: null,
      scrollState: null,
      hoveredIndex: null
    }

    this.onWheel = throttle(this.onWheel, 100);
    this.scrollTimeout = null;
  }

  componentDidMount() {
    this.forceUpdate();
    window.onresize = this.onResize.bind(this);
  }

  clickPoint(point) {
    this.setState({
      currentOpenPoint: point,
      detailIsOpen: true
    });
  }

  closeDetailBox() {
    this.setState({
      detailIsOpen: false
    });
  }

  onWheel(e) {
    if (this.state.detailIsOpen) {
      return;
    }
    if (e.deltaY > 0 && this.state.scrollState !== "backwards") {
      this.scrollBack();
    }
    else if (e.deltaY < 0 && this.state.scrollState !== "forwards") {
      this.scrollForward();
    }
  }

  onResize () {
    let vw = window.innerWidth;
    let zoomFactor;
    if (vw < 600) {
      zoomFactor = 1;
    }
    else if (vw < 800) {
      zoomFactor = 2;
    }
    else if (vw < 1000) {
      zoomFactor = 3;
    }
    else if (vw < 1400) {
      zoomFactor = 4;
    }
    else {
      zoomFactor = 6;
    }
    this.setZoomFactor(zoomFactor);
  }

  scrollForward() {
    let scrollAmt = (this.state.zoomFactor > 2) ? this.state.zoomFactor - 1 : 1;
    let scrollStep = this.state.currentScrollStep + scrollAmt;
    scrollStep = Math.min(scrollStep, this.props.steps.length - this.state.zoomFactor);
    this.setState({
      currentScrollStep: scrollStep,
      scrollState: "forwards"
    });
    this.lockScroll();
  }

  scrollBack() {
    let scrollAmt = (this.state.zoomFactor > 2) ? this.state.zoomFactor - 1 : 1;
    let scrollStep = this.state.currentScrollStep - scrollAmt;
    scrollStep = Math.max(scrollStep, 0);
    this.setState({
      currentScrollStep: scrollStep,
      scrollState: "backwards"
    });
    this.lockScroll();
  }

  scrollTo(step) {

    step = Math.max(0, step);
    step = Math.min(this.props.steps.length - this.state.zoomFactor, step);

    this.setState({
      currentScrollStep: step
    })
  }

  lockScroll() {
    window.clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(()=>{
      this.setState({
        scrollState: null
      });
    }, 600);
  }

  scrollToPhase(scrollStep, zoomFactor) {
    this.setState({
      currentScrollStep: scrollStep-1,
      zoomFactor: zoomFactor
    });
  }

  zoomOut() {
    this.setZoomFactor(this.state.zoomFactor + 2);
  }


  zoomIn() {
    this.setZoomFactor(this.state.zoomFactor - 2);
  }

  setZoomFactor(zoomFactor) {
    let currentScrollStep = this.state.currentScrollStep;
    let numSteps = this.props.steps.length;

    if (zoomFactor < 1) {
      zoomFactor = 1;
    } else if (zoomFactor > numSteps) {
      zoomFactor = numSteps;
    }

    if (currentScrollStep + zoomFactor > numSteps) {
      currentScrollStep = numSteps - zoomFactor;
    }


    this.setState({
      zoomFactor: zoomFactor,
      currentScrollStep: currentScrollStep
    });

  }

  getPointCategory(index) {
    return (this.props.categories[index-1]);
  }

  openCategory(index) {
    let cat = this.getPointCategory(index);
    this.setState({
      currentOpenCategory: cat
    });
  }

  closeCategory() {
    this.setState({
      currentOpenCategory: null
    });
  }

  onMouseMove(e) {


    let sectionWidth = window.innerWidth/this.state.zoomFactor;
    let scrollLeft = this.state.currentScrollStep * sectionWidth;
    let hoveredIndex = Math.floor((e.pageX + scrollLeft)/(sectionWidth));

    if (hoveredIndex !== this.state.hoveredIndex) {
      this.setState({
        hoveredIndex: hoveredIndex
      })
    }
  }

  render() {

    let { steps, phases } = this.props;
    let { zoomFactor, currentOpenPoint, currentScrollStep } = this.state;
    let contHeight;

    if (this.refs.container) {
      contHeight = this.refs.container.clientHeight;
    }
    else {
      contHeight = 0;
    }

    let sectionWidth = window.innerWidth/zoomFactor;
    let graphWidth = steps.length * sectionWidth;
    let scrollLeft = currentScrollStep * sectionWidth * -1;
    let parralaxLeft = scrollLeft * 0.4;

    let plotPoints = steps.map((step, index)=>{
      var xcoord = ((index * (1/zoomFactor)) + (1/(zoomFactor*2))) * window.innerWidth;
      var ycoord = ((1 - parseInt(step.empathy_level)/100)) * contHeight;
      return {
        x: xcoord,
        y: ycoord,
        step: step
      }
    });

    let hideNext = (currentScrollStep + zoomFactor >= steps.length);
    let hideBack = (currentScrollStep <= 0);
    let hideZoomin = zoomFactor === 1;
    let hideZoomout = zoomFactor === steps.length;
    let isBigView = sectionWidth < 200;

    let classnames = ClassNames({
      'timeline': true,
      'timeline--big-view': isBigView
    });

    return (
      <div className={classnames} onWheel={this.onWheel.bind(this)}>
        <div className="timeline-controls">
          <Scrubber scrollTo={this.scrollTo.bind(this)} zoomFactor={zoomFactor} currentScrollStep={currentScrollStep} numSteps={steps.length} />
          <div className="timeline-controls__separator"></div>
          <div
            className={"timeline-controls__zoom-in" + (hideZoomin ? " timeline-controls--hidden" : "")}
            onClick={this.zoomIn.bind(this)}>
            <i className="fa fa-plus"></i>
          </div>
          <div
            className={"timeline-controls__zoom-out" + (hideZoomout ? " timeline-controls--hidden" : "")}
            onClick={this.zoomOut.bind(this)}>
            <i className="fa fa-minus"></i>
          </div>
          <div className="timeline-controls__separator"></div>
          <div
            className={"timeline-controls__back" + (hideBack ? " timeline-controls--hidden" : "")}
            onClick={this.scrollBack.bind(this)}>
            <i className="fa fa-arrow-left"></i>
          </div>
          <div
            className={"timeline-controls__next" + (hideNext ? " timeline-controls--hidden" : "")}
            onClick={this.scrollForward.bind(this)}>
            <i className="fa fa-arrow-right"></i>
          </div>
        </div>
        <div className="timeline-title" dangerouslySetInnerHTML={{__html: this.props.title }}>
        </div>
        <div className="timeline-background" style={{ backgroundPosition: parralaxLeft + "px 0px" }}>
        </div>
        <div className="timeline-inner" ref="scroller" style={{left: scrollLeft }} onMouseMove={this.onMouseMove.bind(this)}>
          <div className="timeline-phases">
            {
              phases.map((phase, index) => {

                let nextPhaseStep = (phases[index+1]) ? phases[index+1].step_number : steps.length+1;
                let phaseStep = parseInt(phase.step_number);
                let width = (nextPhaseStep - phaseStep) * sectionWidth;
                let isCurrent = (currentScrollStep >= phaseStep && currentScrollStep + 1 < nextPhaseStep);

                return (
                    <div className={"timeline-phases__item" + (isCurrent ? " timeline-phases__item--floating" : "")}
                         style={{width: width}} key={index}
                         onClick={this.scrollToPhase.bind(this, phaseStep, nextPhaseStep - phaseStep)}
                         >
                         <div className="timeline-phase__title">
                          { (index+1) }
                          <span className="timeline-phase__title-ext">{ " - " + phase.title }</span>
                        </div>
                         <svg height="100%" width="50" viewBox="0 0 100 100">
                            <path d="M0 -10 L50 50 L0 110"></path>
                         </svg>
                    </div>
                )
              })
            }
            <div className="timeline-phase__end">
              <div className="timeline-phase__title">Finish</div>
            </div>
          </div>
          <div className="timeline-info-wrapper">
            {
              steps.map((step, index) => {
                let isHovered = this.state.hoveredIndex === index;
                return (
                  <StepSection
                    isHovered={isHovered}
                    sectionHeight={contHeight}
                    step={step}
                    key={index}
                    index={index}
                    width={sectionWidth} />
                );
              })
            }
          </div>
          <div ref="container" className="timeline-graph" style={{width: graphWidth }}>
            <svg className="timeline-graph__svg" width="100%" height="100%">
              <StepPath plotPoints={plotPoints} sectionHeight={contHeight} sectionWidth={window.innerWidth/zoomFactor} />
              {

                plotPoints.map((plotPoint, index) => {
                  return (
                    <StepPoint
                      clickPoint={this.clickPoint.bind(this)}
                      x={plotPoint.x}
                      y={plotPoint.y}
                      pointItems={steps[index].points}
                      index={index}
                      key={index}
                      getPointCategory={this.getPointCategory.bind(this)}
                    />
                  )
                })
              }
            </svg>
          </div>
        </div>
        <StepDetailBox
          point={currentOpenPoint}
          detailIsOpen={this.state.detailIsOpen}
          closeDetailBox={this.closeDetailBox.bind(this)}
          getPointCategory={this.getPointCategory.bind(this)}
          openCategory={this.openCategory.bind(this)} />
      </div>
    );
  }
}



class StepSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { step, isHovered, sectionHeight } = this.props;
    let bubbleHeight = 128;
    let arrowColor = (step.arrow_color) ? step.arrow_color : "#48B1E5";
    let numEmojis = 7;
    let emojiClass = "timeline-step__key-emoji-" + Math.ceil((100-step.empathy_level)* 7/100);
    let bubbleTop = parseInt(100 - step.empathy_level);
    let bubbleFallsOffScreen = (bubbleTop * .01 * sectionHeight) + bubbleHeight > sectionHeight;
    let bubbleBottom = parseInt(step.empathy_level);

    console.log("step points", step.points.length);

    let bubbleStyle = !bubbleFallsOffScreen ?
        { top: bubbleTop + "%" }
      :
        { top: ((bubbleTop * .01 * sectionHeight) - bubbleHeight - (step.points.length * 22) + 20) + "px" };


    let classnames = ClassNames({
      'timeline-step': true,
      'timeline-step--hover': isHovered,
      'timeline-step--too-low': bubbleFallsOffScreen
    });


    return (

      <div className={classnames} style={{minWidth:this.props.width}}>
        <div className="timeline-step__inner">
          <div className={ "time-step__arrow" + (step.border_style ? " time-step__arrow-border" : "")} style={{borderColor: arrowColor }}>
          </div>
          <div className="timeline-step__box">
            <div className="time-step__icon">
              <img src={step.icon} />
            </div>
            <div className="time-step__number">{this.props.index+1}</div>
            <div className="time-step__content">
              <div dangerouslySetInnerHTML={{__html:step.description}}>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-step__key">
          <div className="timeline-step__key-top">Empathy Level</div>
          <div className="timeline-step__key-inner">
          </div>
          <div className={"timeline-step__key-bubble " + emojiClass} style={bubbleStyle} ref="bubble">
            <div className="timeline-step__key-percent">
              <div>{ parseInt((step.empathy_level)/10) }</div>
              <div> of 10</div>
            </div>
            <div className="timeline-step__key-emoji">
            </div>
            <div className="empathy-title">Empathy Level</div>
            <svg preserveAspectRatio="none" width="10" height="20" className="timeline-step__key-triangle" viewBox="0 0 100 100">
              <path d="M0,0L100,50L0,100"></path>
            </svg>
          </div>
        </div>
      </div>

    )
  }
}


class Scrubber extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isDragging: false
    }

    this.dropScrubber = () => {
      this.setState({
        isDragging: false
      });
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isDragging && !prevState.isDragging) {
      window.addEventListener("mouseup", this.dropScrubber);
    }
    else if (!this.state.isDragging && prevState.isDragging) {
      window.removeEventListener("mouseup", this.dropScrubber);
    }
  }

  onMouseMove (e) {
    if (this.state.isDragging) {
      e.preventDefault();
      let $el = $(this.refs.container);
      let width = $el.width();
      let xPos = e.pageX - $el.offset().left;
      let scrollStep = Math.floor((xPos/width) * this.props.numSteps);
      this.props.scrollTo(scrollStep);
    }
  }

  onMouseDown (e) {
    e.preventDefault();
    let $el = $(this.refs.container);
    let width = $el.width();
    let xPos = e.pageX - $el.offset().left;
    let scrollStep = Math.floor((xPos/width) * this.props.numSteps);
    this.setState({
      isDragging: true
    });
    this.props.scrollTo(scrollStep);
  }

  render() {

    let style = {
      left: (this.props.currentScrollStep*100/this.props.numSteps) + "%",
      width: (this.props.zoomFactor*100/this.props.numSteps) + "%"
    }

    return (

      <div
        className="timeline-scrubber"
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        ref="container"
      >
        <div className="timeline-scrubber__selected" style={style}>
        </div>
      </div>
    )
  }

}



const stripTags = function(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}



class StepDetailBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCategory: false,
      openPhase: null

    }

    this.dc = new DelayChain();
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.detailIsOpen !== nextProps.detailIsOpen) {

      let dc = this.dc;
      // Makes sure previous animation sequenced is stopped
      dc.cancel();

      if (nextProps.detailIsOpen) {

        this.setState({
          openPhase: "open-setup"
        });
        dc.delay(1, ()=>{
          this.setState({
            openPhase: "open-start"
          })
        }).delay(1, ()=>{
          this.setState({
            openPhase: "opening"
          })
        }).delay(500, ()=>{
          this.setState({
            openPhase: "open-finish"
          })
        });

      } else {

        this.setState({
          openPhase: "close-start"
        });

        dc.delay(1, ()=>{
          this.setState({
            openPhase: "closing"
          })
        }).delay(400, ()=>{
          this.setState({
            openPhase: "close-finish",
            showCategory: false
          })
        });

      }
    }
  }

  getElPosition() {

    let point = this.props.point;

    if (!point) {
      return {top:0,left:0};
    }

    let rect = point.el.getBoundingClientRect();
    let radius = parseFloat(point.el.getAttribute("r"));

    switch (this.state.openPhase) {

      case "opening":
      case "open-finish":
        return {
          top: "50%",
          left: "50%"
        };

      default:
        return {
          top: parseFloat(rect.top) + radius,
          left: parseFloat(rect.left) + radius
        };
    }
  }

  openCategory(catIndex) {
    this.setState({
      showCategory: true
    })
  }

  closeCategory() {
    this.setState({
      showCategory: false
    })
  }

  render() {
    let { point, getPointCategory } = this.props;
    let { openPhase } = this.state;
    let pointCategory = (point && point.category) ? getPointCategory(point.category) : null;
    let catTitleString = (pointCategory) ? stripTags(pointCategory.title) : "";
    let catSecondTitleString = (pointCategory) ? stripTags(pointCategory.second_title) : "";
    let borderColor = (pointCategory) ? pointCategory.color : "#AAAAAA";
    let pos = this.getElPosition();
    let classnames = ClassNames({
      'timeline-box': true,
      'timeline-box--show-category': this.state.showCategory
    });

    classnames = classnames + ' timeline-box--' + openPhase;

    return (
      <div className={classnames}>
        <div ref="mask" className="timeline-mask" onClick={this.props.closeDetailBox}>
        </div>
        <div className="timeline-boxes__wrapper" style={{ top: pos.top, left: pos.left}}>
          <div className="timeline-boxes__flipper">
            <div className="timeline-detail__box" style={{borderColor: borderColor}} >
              {
                point ?
                  <div className="timeline-content">
                    <div className="timeline-detail__close" onClick={this.props.closeDetailBox}><i className="actions-close"></i></div>
                    <div className="timeline-content__scroll">
                      { (pointCategory) ?
                        (
                          <div className="timeline-detail__cat" style={{color:borderColor}}>
                            <img className="timeline-detail__img" src={pointCategory.icon} />
                            <span dangerouslySetInnerHTML={{__html: pointCategory.title }}></span>
                          </div>
                        )
                        :
                        null
                      }
                      <div className="timeline-detail__title">
                        { point.title }
                      </div>
                      <div className="timeline-detail__description" dangerouslySetInnerHTML={{__html: point.description }}>
                      </div>
                    </div>
                    <div onClick={this.openCategory.bind(this, point.category)} className="timeline-detail__cat-link">
                      <div style={{color:borderColor}} className="actions-rotate"></div>
                      <div style={{color:borderColor}}>
                        Read about { catSecondTitleString }...
                      </div>
                    </div>
                  </div>
                :
                  null
              }
            </div>
            {
              (pointCategory) ?
                <div className="timeline-category__box" style={{borderColor: borderColor}}>
                  <div className="timeline-detail__close" onClick={this.props.closeDetailBox}><i className="actions-close"></i></div>
                  <div className="timeline-category__back" onClick={this.closeCategory.bind(this)}>
                    <div className="actions-rotate" style={{color:borderColor}}></div>
                    <div style={{color:borderColor}}>
                      Read about { catTitleString }...
                    </div>
                  </div>
                  <div className="timeline-category__content">
                    <div className="timeline-category__content-inner">
                      <div className="timeline-category__title" style={{color: borderColor }}>
                        <img className="timeline-detail__img" src={pointCategory.icon} />
                        <span dangerouslySetInnerHTML={{__html: pointCategory.second_title  }}></span>
                      </div>
                      <div className="wysiwyg-content" dangerouslySetInnerHTML={{__html: pointCategory.description}}></div>
                    </div>
                  </div>
                </div>
              :
                null
            }
          </div>
        </div>

      </div>
    )
  }
}

class StepPoint extends Component {

  constructor(props) {
    super(props);
  }

  clickPoint(index) {
    let data = this.props.pointItems[index];
    let el = this.refs["point"+index];
    let rect = el.getBoundingClientRect();

    data.top = rect.top;
    data.left = rect.left;
    data.el = el;

    this.props.clickPoint(data);
  }

  render() {
    let { x, y, pointItems } = this.props;
    if (pointItems === "0") {
      pointItems = [];
    }

    let emptyCircle = <rect className="timeline__empty-point" width="4" height="16" x={x-2} y={y-8}></rect>;
    let points = pointItems.map((item, index) => {
      let catInfo = this.props.getPointCategory(item.category);
      let color = catInfo ? catInfo.color : "#000000";
      return (
        <g key={index} className={"timeline-graph__point timeline-graph__point--" + index} width="20" height="20" onClick={this.clickPoint.bind(this, index)} >
          <circle
            ref={"point"+index}
            r="10"
            cx={x}
            cy={y}
            style={{fill: color, stroke: color }}
          >
          </circle>
          <text textAnchor="middle" alignmentBaseline="central" className="timeline-graph__i" x={x} y={y+5}>i</text>
        </g>
      );
    });

    return (
      <g>
        {
          (pointItems.length === 0) ?
              emptyCircle
            :
              points
        }
      </g>
    );
  }
}





class StepPath extends Component {
  constructor(props) {
    super(props);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sectionHeight !== this.props.sectionHeight ||
        nextProps.sectionWidth !== this.props.sectionWidth ) {
      return true;
    }

    return false;
  }


  /*computes control points given knots K, this is the brain of the operation*/
  computeControlPoints(K)
  {
    let p1=new Array();
    let p2=new Array();
    let n = K.length-1;
    let i,m;

    /*rhs vector*/
    let a=new Array();
    let b=new Array();
    let c=new Array();
    let r=new Array();

    /*left most segment*/
    a[0]=0;
    b[0]=2;
    c[0]=1;
    r[0] = K[0]+2*K[1];

    /*internal segments*/
    for (i = 1; i < n - 1; i++)
    {
      a[i]=1;
      b[i]=4;
      c[i]=1;
      r[i] = 4 * K[i] + 2 * K[i+1];
    }

    /*right segment*/
    a[n-1]=2;
    b[n-1]=7;
    c[n-1]=0;
    r[n-1] = 8*K[n-1]+K[n];

    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
    for (i = 1; i < n; i++)
    {
      m = a[i]/b[i-1];
      b[i] = b[i] - m * c[i - 1];
      r[i] = r[i] - m*r[i-1];
    }

    p1[n-1] = r[n-1]/b[n-1];
    for (i = n - 2; i >= 0; --i)
      p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];

    /*we have p1, now compute p2*/
    for (i=0;i<n-1;i++)
      p2[i]=2*K[i+1]-p1[i+1];

    p2[n-1]=0.5*(K[n]+p1[n-1]);

    return {p1:p1, p2:p2};
  }

  render() {

    let { plotPoints, sectionHeight, sectionWidth } = this.props;

    let x = plotPoints.map((plotPoint,index) => {
      return plotPoint.x;
    });

    x.splice(0, 0, 0);
    x.push(sectionWidth * plotPoints.length);

    let y = plotPoints.map((plotPoint,index) => {
      return plotPoint.y;
    });
    y.splice(0, 0, sectionHeight);
    y.push(sectionHeight);

    /*computes control points p1 and p2 for x and y direction*/
    let px = this.computeControlPoints(x);
    let py = this.computeControlPoints(y);
    let d = "M" + x[0] + " " + y[0] + " ";
    for (let i=0; i<x.length-1; i++) {
      d = d + "C" + px.p1[i] + " " +  py.p1[i] + " " + px.p2[i] + " " + py.p2[i] + " " + x[i+1] + " " + y[i+1];
    }

    d = d + " Z";

    return (
      <g>
        <path fill="url(#timeline-pattern)" d={d} className="timeline-graph__area" />
      </g>
    );
  }
}
