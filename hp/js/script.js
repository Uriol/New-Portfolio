
var intro_video = document.getElementById('intro_video'); 
var width = window.innerWidth;
var AR_height;

$(function(){

	resize();
	function resize(){
		width = window.innerWidth;
		AR_height = width*9/16;
		$('#img_intro').css('height', AR_height);

	}

	window.addEventListener( 'resize', resize, false );

	

	//playVideo();
	// function playVideo(){
	// 	intro_video.load();
	// 	intro_video.play();

	// }


	// $('#intro_controls').on('click', function(){
	// 	$('#intro_controls').css('background-image', 'none')
	// 	if (intro_video.paused) {
	// 		intro_video.play();
	// 		$('#play_button').hide();
	// 		$('#pause_button').show();
	// 	} else {
	// 		intro_video.pause();
	// 		$('#play_button').show();
	// 		$('#pause_button').hide();
	// 	}
	// })

	// intro_video.addEventListener("ended", intro_ended);
	// function intro_ended(){
	// 	$('#intro_controls').css('background-image', 'url(img/bg_video.png)')
	// }



	// // Show controls on hover
	// // $('.play_pause').hide();
	// $('#intro_controls').on( "mouseenter", showControls );
	// $('#intro_controls').on( "mouseleave", hideControls );
	// function showControls(){
	// 	$('.play_pause').show();
	// 	if (intro_video.paused) {
	// 		$('#play_button').show();
	// 		$('#pause_button').hide();
	// 	} else {
	// 		$('#pause_button').show();
	// 		$('#play_button').hide();
	// 	}
	// }
	// function hideControls(){
	// 	$('.play_pause').hide();
	// 	$('#play_button').hide();
	// 	$('#pause_button').hide();
	// }
})