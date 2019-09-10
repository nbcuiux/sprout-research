import $ from "jquery"

export default function setupSplash() {
	window.setTimeout(()=> {
		$("body").addClass("splash-extruded");
	}, 300);

	window.setTimeout(()=> {
		window.addEventListener("mousemove", tiltSegments);
	}, 1000);

	let segments = $(".splash-segment");
	let tiltSegments = function(e) {
		let vh = window.innerHeight;
		let vw = window.innerWidth;
		let xPercent = e.clientX/vw;
		let yPercent = e.clientY/vh;
		segments.each((index, el)=>{
			let translateX, translateY;
			translateX = xPercent * 10;
			translateY = yPercent * 10;			
			if (index === 0) {
				translateX = xPercent * 10;
				translateY = yPercent * 10;
			}
			if (index === 1) {
				translateX = xPercent * 10;
				translateY = yPercent * -10;
			}
			if (index === 3) {
				translateX = xPercent * -10;
				translateY = yPercent * 10;
			}
			if (index === 4) {
				translateX = xPercent * 10;
				translateY = yPercent * 10;
			}							
			$(el).find(".splash-segment__tilt").css({
				transform: "translate(" + translateX + "px, " + translateY + "px)"
			});
		});	
	}

}