
function onLoad(){
	// Remove loading div
	$('#loading').fadeOut(1000);
	
	// start scrolling when everything is loaded
	$('body').css('overflow-y', 'scroll');
}

// HP canvas
var canvas_back, context_back;
var canvas_front, context_front;
var particles = [], totalParticles;
var randomContext;
var canvas_width;
var canvas_height;



$(function(){

	// remove black background after loading
	onLoad();



	var md = new MobileDetect(window.navigator.userAgent);
	var w, project_w;

	if(md.mobile() && !md.tablet()){

		totalParticles = 15;

		projectHeight_phone();
		window.addEventListener( 'resize', projectHeight_phone, false );
		setCanvasSize_mobile();
		window.addEventListener( 'resize', setCanvasSize_mobile, false );
	} else {	
		
		totalParticles = 25;
		projectHeight();
		window.addEventListener( 'resize', projectHeight, false );
		
		setCanvasSize_desktop();
		window.addEventListener( 'resize', setCanvasSize_desktop, false );
	}


	// Adjust project image height
	function projectHeight(){

		w = window.innerWidth;
		project_w = w/3;

		if (w <= 960) {
			project_w = w/3;
			$('.project').css('height', project_w + 'px');
			$('#hp_logo').css('height', project_w + 'px');
		} else {

			$('.project').css('height', 320 + 'px');
			$('#hp_logo').css('height', 320 + 'px');
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
		$('#hp_logo').css('height', project_w + 'px');
		$('#hp_logo').css('background-image', 'url(img/hp_logo_16_9.png)');
		$('#hp').css('background-image', 'url(img/hp_fire_16_9.png)');

	}

	// Canvas
	canvas_back = document.getElementById('canvas_back');
	context_back = canvas_back.getContext('2d');
	canvas_front = document.getElementById('canvas_front');
	context_front = canvas_front.getContext('2d');

	function setCanvasSize_mobile(){
		w = window.innerWidth;
			canvas_width = w;
			canvas_height = w/16*9;
			$('#canvas_back').attr('width', w);
			$('#canvas_back').attr('height',  canvas_height);

			$('#canvas_front').attr('width', w);
			$('#canvas_front').attr('height',  canvas_height);
	}
	
	function setCanvasSize_desktop(){
		 
		if (w >= 960) {
			canvas_height = 320;
			canvas_width = 960;
			$('#canvas_back').attr('width', canvas_width);
			$('#canvas_back').attr('height',  canvas_height);

			$('#canvas_front').attr('width', canvas_width);
			$('#canvas_front').attr('height',  canvas_height);
		} else {
			w = window.innerWidth;
			canvas_width = w;
			canvas_height = w/3;
			$('#canvas_back').attr('width', w);
			$('#canvas_back').attr('height',  canvas_height);

			$('#canvas_front').attr('width', w);
			$('#canvas_front').attr('height',  canvas_height);
		}
	}


	// Create particles
	createParticles();
	function createParticles(){
		for(var i = 0; i < totalParticles; i++){
			particles[i] = new Particle();
			particles[i].reset();
		}
	}

	// Define particle
	function Particle(){

		this.settings = { max_radius: 6, x_speed_max: 0.4, y_speed_max: 0.5, rt:1};

		// Set positions and size
		this.reset = function(){

			this.x = canvas_width*Math.random();
			this.y = canvas_height*Math.random();
			this.radius = Math.floor(Math.random() * 3) + 4;
			this.x_speed = (Math.random()*this.settings.x_speed_max) * (Math.random() < .5 ? -1 : 1);
			this.y_speed = (Math.random()*this.settings.y_speed_max) * (Math.random() < .5 ? -1 : 1);
			this.rate = Math.floor(Math.random() * 30) + 10;
			this.hl = (8000/this.rate )*(this.radius/this.settings.max_radius);
			this.rt = Math.random()*this.hl;
			this.stop = Math.random()*.2+.4;
			this.canvas = (Math.random() < .5 ? -1 : 1);
		}

		this.fade = function(){
			this.rt += this.settings.rt;
		}


		// Draw particles
		this.draw = function(){

			// restart blink
			if (this.rt <= 0 || this.rt >= this.hl) this.settings.rt *= -1;

			if (this.canvas == 1) {
				randomContext = context_front;
			} else {
				randomContext = context_back;
			}

			randomContext.beginPath();
			randomContext.arc(this.x, this.y, this.radius, 0 , Math.PI*2, true);
			randomContext.closePath();

			// gradient increment
			var gradient_increment = 1-(this.rt/this.hl);
			// gradient radius
			var gradient_radius = this.radius*gradient_increment;

			var color = randomContext.createRadialGradient(this.x, this.y, 0, this.x, this.y, (gradient_radius <= 0 ? 1 : gradient_radius));
			if (this.canvas == 1) {
			color.addColorStop(0.0, 'rgba(205,0,0,'+gradient_increment+')');
			color.addColorStop(this.stop, 'rgba(205,0,0,'+(gradient_increment*0.6)+')'); // light color
			color.addColorStop(1.0, 'rgba(150,0,0,0)'); 
			} else {
				color.addColorStop(0.0, 'rgba(255,50,0,'+gradient_increment+')');
				color.addColorStop(this.stop, 'rgba(255,50,0,'+(gradient_increment*0.6)+')'); // light color
				color.addColorStop(1.0, 'rgba(255,0,0,0)'); 
			}

			randomContext.fillStyle = color;
			
			randomContext.fill();
		}

		this.move = function(){
			
			this.x += this.x_speed;
			if (this.x > canvas_width+10 || this.x < -10) this.x_speed *= -1;
			this.y += this.y_speed;
			if (this.y > canvas_height+10 || this.y < -10) this.y_speed *= -1;
		}

		this.get_x = function() { return this.x; }
		this.get_y = function() { return this.y; }

	}

	// Draw particles
	function draw(){
		context_back.clearRect(0,0, canvas_width, canvas_height);
		context_front.clearRect(0,0, canvas_width, canvas_height);

		for (var i = 0; i < particles.length; i++) {

			particles[i].fade();
			particles[i].move();
			particles[i].draw();

		}
	}

	render();
	function render(){
		requestAnimationFrame(render);
		draw();

	}


})