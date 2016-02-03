$(function () {
	
	function sizeAngle() {
		var windowWidth = $(window).width(),
			angleDepth = Math.round(windowWidth * 0.25);
		$('#background .angle').css({
			'border-left-width': windowWidth + 'px',
			'border-top-width': angleDepth + 'px'
		});
	}
	sizeAngle();
	$(window).resize(sizeAngle);

	if (typeof VideoHandler !== "undefined") {
		VideoHandler.init();
	}
});