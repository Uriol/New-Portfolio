
$(function(){


	var md = new MobileDetect(window.navigator.userAgent);
	var w, project_w;

	if(md.mobile() && !md.tablet()){
		projectHeight_phone();
		// Adjust project height on window resize
		window.addEventListener( 'resize', projectHeight_phone, false );
	} else {
		
		projectHeight();
		// Adjust project height on window resize
		window.addEventListener( 'resize', projectHeight, false );
	}


	// Adjust project image height
	function projectHeight(){

		w = window.innerWidth;
		project_w = w/3;

		if (w <= 1024) {
			$('.project').css('height', project_w + 'px');
		}

	}

	// Adjust project image height for phone
	function projectHeight_phone(){

		w = window.innerWidth;

		if (w >= 400) {
			project_w = w/3;
		
		} else {
			project_w = w/16*9;
			
		}

		$('.project').css('height', project_w + 'px');

	}


})