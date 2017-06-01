$(document).ready(function (){

	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	console.log("Screen/window size: "+windowWidth+"x"+windowHeight);
	
	$(".loadscreen-loadup").css("height", windowHeight).css("width", windowWidth).css("top", "-"+windowHeight+"px");
	
	
	$("a.triggerAnimation").on("click", function (){		
		$("body").css("overflow", "hidden");		
		$(".loadscreen-loadup").addClass("loadup");
		
		
		
	});

});