console.log('ola')

var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');

color='aquamarine'
let loop=100, t=0, vy=0, t1=0, vy1=0, loop1=100, numero=0 , vy2=0, t2=0, loop2=100, vy3=0, t3=0, loop3=100, t4=0, vy4=0, loop4=100, t5=0, vy5=0, loop5=100, loop6=0, t6=0, vy6=0, loop7=100, vy7=0,t7=0, loop8=100, vy8=0, t8=0, loop9=100, t9=0, vy9=0, loop10=100, vy10=0, t10=0, loop11=100, t11=0, vy11=0, loop12=100, vy12=0, t12=0, loop13=100, vy13=0, t13=0, loop14=100, t14=0, vy14=0;
let r=Math.min(window.innerHeight/22,window.innerWidth/22);
let dx=2*r+Math.max(window.innerWidth/80,window.innerHeight/80);
var dxx=2*r-dx;
let xx=(window.innerWidth/2.250-(7*r+3*dxx))+3*dx;
let yy=window.innerHeight/4+5*dx;
let posicao2=(window.innerWidth/2.250-(7*r+3*dxx))+4*dx;
let posicao3=(window.innerWidth/2.250-(7*r+3*dxx))+5*dx;
let posicao4=(window.innerWidth/2.250-(7*r+3*dxx))+6*dx;
let posicao5=(window.innerWidth/2.250-(7*r+3*dxx))+dx;
let posicao1=(window.innerWidth/2.250-(7*r+3*dxx))+2*dx;
let posicaoy2=window.innerHeight/4+4*dx;
let posicaoy3=window.innerHeight/4+3*dx;
let posicaoy4=window.innerHeight/4+2*dx;
function animate(){
	if (numero < 70){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	numero+=1
    var i;
    var x=(window.innerWidth/2.250-(7*r+3*dxx));
	for (i=0; i<7; i++){
		var j;
		var y=window.innerHeight/4;
		for (j=0; j<6; j++){
			c.beginPath();
			c.strokeStyle='black';
			c.arc(x,y,r,0,2*Math.PI,false);
			c.closePath();
			c.stroke();
			y+=dx;
		}
		x+=dx;
	}
	c.shadowColor='black'
		c.shadowBlur=15
	c.beginPath();
	c.strokeStyle='yellow';
	c.arc(posicao1,loop,r,0,2*Math.PI,false);
	c.fillStyle='yellow';
	c.fill();
	c.closePath();
	c.stroke();
	if ((loop >= yy) && (vy > 0) ) {
		if (vy>0){
			if (vy<0.55){
				console.log(numero)	
                return loop		
                t=0;
				}
			vy=-0.3*vy;
			t=0;
			loop+=vy;	
		}
	}
	else {
		t+=0.1;
		vy+=3*t;
		loop+=vy;
		if (loop<490 && vy>0 && vy<2 && loop>110){
			t=0;
		}
	} 
	}
	else if (numero>=70 && numero <140){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,loop1,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop1 >= yy) && (vy1 > 0) ) {
			if (vy1>0){
				if (vy1<0.55){
					console.log(numero)	
					return loop1		
					t1=0;
				}
				vy1=-0.3*vy1;
				t1=0;
				loop1+=vy1;	
			}
		}
		else {
			t1+=0.1;
			vy1+=3*t1;
			loop1+=vy1;
			if (loop1<490 && vy1>0 && vy1<2 && loop1>110){
				t1=0;
			}
		} 
	}
	else if (numero>=140 && numero <192){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,loop2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop2 >= posicaoy2) && (vy2 > 0) ) {
			if (vy2>0){
				if (vy2<0.55){
					console.log(numero)	
					return loop2		
					t2=0;
				}
				vy2=-0.25*vy2;
				t2=0;
				loop2+=vy2;	
			}
		}
		else {
			t2+=0.1;
			vy2+=2*t2;
			loop2+=vy2;
			if (loop2<490 && vy2>0 && vy2<2 && loop2>110){
				t2=0;
			}
		} 
	}
	else if (numero>=192 && numero <350){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,loop3,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop3 >= yy) && (vy3 > 0) ) {
			if (vy3>0){
				if (vy3<0.55){
					console.log(numero)	
					return loop3		
					t3=0;
				}
				vy3=-0.45*vy3;
				t3=0;
				loop3+=vy3;	
			}
		}
		else {
			t3+=0.1;
			vy3+=3*t3;
			loop3+=vy3;
			if (loop3<490 && vy3>0 && vy3<2 && loop3>110){
				t3=0;
			}
		} 
	}
	else if (numero>=350 && numero <406){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,loop4,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop4 >= yy) && (vy4 > 0) ) {
			if (vy4>0){
				if (vy4<0.55){
					console.log(numero)	
					return loop4		
					t4=0;
				}
				vy4=-0.25*vy4;
				t4=0;
				loop4+=vy4;	
			}
		}
		else {
			t4+=0.1;
			vy4+=3*t4;
			loop4+=vy4;
			if (loop4<490 && vy4>0 && vy4<2 && loop4>110){
				t4=0;
			}
		} 
	}
	else if (numero>=406 && numero <478){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,loop5,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop5 >= yy) && (vy5 > 0) ) {
			if (vy5>0){
				if (vy5<0.55){
					console.log(numero)	
					return loop5		
					t5=0;
				}
				vy5=-0.3*vy5;
				t5=0;
				loop5+=vy5;	
			}
		}
		else {
			t5+=0.1;
			vy5+=3*t5;
			loop5+=vy5;
			if (loop5<490 && vy5>0 && vy5<2 && loop5>110){
				t5=0;
			}
		} 
	}
	else if (numero>=478 && numero <540){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,loop6,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop6 >= posicaoy2) && (vy6 > 0) ) {
			if (vy6>0){
				if (vy6<0.55){
					console.log(numero)	
					return loop6		
					t6=0;
				}
				vy6=-0.3*vy6;
				t6=0;
				loop6+=vy6;	
			}
		}
		else {
			t6+=0.1;
			vy6+=3*t6;
			loop6+=vy6;
			if (loop6<490 && vy6>0 && vy6<2 && loop6>110){
				t6=0;
			}
		} 
	}
	else if (numero>=540 && numero <585){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,loop7,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop7 >= posicaoy2) && (vy7 > 0) ) {
			if (vy7>0){
				if (vy7<0.65){
					console.log(numero)	
					return loop7		
					t7=0;
				}
				vy7=-0.19*vy7;
				t7=0;
				loop7+=vy7;	
			}
		}
		else {
			t7+=0.1;
			vy7+=3*t7;
			loop7+=vy7;
			if (loop7<490 && vy7>0 && vy7<2 && loop7>110){
				t7=0;
			}
		} 
	}
	else if (numero>=585 && numero <645){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,loop8,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop8 >= posicaoy3) && (vy8 > 0) ) {
			if (vy8>0){
				if (vy8<0.55){
					console.log(numero)	
					return loop8		
					t8=0;
				}
				vy8=-0.3*vy8;
				t8=0;
				loop8+=vy8;	
			}
		}
		else {
			t8+=0.1;
			vy8+=3*t8;
			loop8+=vy8;
			if (loop8<490 && vy8>0 && vy8<2 && loop8>110){
				t8=0;
			}
		} 
	}
	else if (numero>=645 && numero <795){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,loop9,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop9 >= yy) && (vy9 > 0) ) {
			if (vy9>0){
				if (vy9<0.55){
					console.log(numero)	
					return loop9		
					t9=0;
				}
				vy9=-0.45*vy9;
				t9=0;
				loop9+=vy9;	
			}
		}
		else {
			t9+=0.1;
			vy9+=3*t9;
			loop9+=vy9;
			if (loop9<490 && vy9>0 && vy9<2 && loop9>110){
				t9=0;
			}
		} 
	}
	else if (numero>=795 && numero <850){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,loop10,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop10 >= posicaoy3) && (vy10 > 0) ) {
			if (vy10>0){
				if (vy10<0.55){
					console.log(numero)	
					return loop10		
					t10=0;
				}
				vy10=-0.3*vy10;
				t10=0;
				loop10+=vy10;	
			}
		}
		else {
			t10+=0.1;
			vy10+=3*t10;
			loop10+=vy10;
			if (loop10<490 && vy10>0 && vy10<2 && loop10>110){
				t10=0;
			}
		} 
	}
	else if (numero>=850 && numero <901){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao1,loop11,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop11 >= posicaoy2) && (vy11 > 0) ) {
			if (vy11>0){
				if (vy11<0.55){
					console.log(numero)	
					return loop11		
					t11=0;
				}
				vy11=-0.19*vy11;
				t11=0;
				loop11+=vy11;	
			}
		}
		else {
			t11+=0.1;
			vy11+=2.2*t11;
			loop11+=vy11;
			if (loop11<490 && vy11>0 && vy11<2 && loop11>110){
				t11=0;
			}
		} 
	}
	else if (numero>=901 && numero <966){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao1,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,loop12,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop12 >= posicaoy3) && (vy12 > 0) ) {
			if (vy12>0){
				if (vy12<0.55){
					console.log(numero)	
					return loop12		
					t12=0;
				}
				vy12=-0.3*vy12;
				t12=0;
				loop12+=vy12;	
			}
		}
		else {
			t12+=0.1;
			vy12+=3*t12;
			loop12+=vy12;
			if (loop12<490 && vy12>0 && vy12<2 && loop12>110){
				t12=0;
			}
		} 
	}
	else if (numero>=966 && numero <1022){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao1,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,loop13,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop13 >= posicaoy3) && (vy13 > 0) ) {
			if (vy13>0){
				if (vy13<0.55){
					console.log(numero)	
					return loop13		
					t13=0;
				}
				vy13=-0.3*vy13;
				t13=0;
				loop13+=vy13;	
			}
		}
		else {
			t13+=0.1;
			vy13+=3*t13;
			loop13+=vy13;
			if (loop13<490 && vy13>0 && vy13<2 && loop13>110){
				t13=0;
			}
		} 
	}
	else if (numero>=1022 && numero <1230){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		numero+=1
		var i;
		var x=(window.innerWidth/2.250-(7*r+3*dxx));
		for (i=0; i<7; i++){
			var j;
			var y=window.innerHeight/4;
			for (j=0; j<6; j++){
				c.beginPath();
				c.strokeStyle='black';
				c.arc(x,y,r,0,2*Math.PI,false);
				c.closePath();
				c.stroke();
				y+=dx;
			}
			x+=dx;
		}
		c.shadowColor='black'
		c.shadowBlur=15
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(xx,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.stroke();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao2,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,yy,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao4,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao5,yy,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(xx,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao1,posicaoy2,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao1,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='red';
		c.arc(posicao3,posicaoy3,r,0,2*Math.PI,false);
		c.fillStyle='red';
		c.fill();
		c.closePath();
		c.beginPath();
		c.strokeStyle='yellow';
		c.arc(posicao3,loop14,r,0,2*Math.PI,false);
		c.fillStyle='yellow';
		c.fill();
		c.closePath();
		c.stroke();
		if ((loop14 >= posicaoy4) && (vy14 > 0) ) {
			if (vy14>0){
				if (vy14<0.53){
					console.log(numero)	
					return loop14		
					t14=0;
				}
				vy14=-0.55*vy14;
				t14=0;
				loop14+=vy14;	
			}
		}
		else {
			t14+=0.1;
			vy14+=2*t14;
			loop14+=vy14;
			if (loop14<490 && vy14>0 && vy14<2 && loop14>110){
				t14=0;
			}
		} 
	}
	else {
		c.strokeStyle='white';
		c.lineWidth = 5;
		c.shadowColor='blue'
		c.shadowBlur=5
		c.beginPath();
		c.arc(posicao3,posicaoy4,r,0,2*Math.PI,true);
		c.closePath();
		c.stroke();
		c.beginPath();
		c.arc(posicao2,posicaoy3,r,0,2*Math.PI,false);
		c.closePath();
		c.stroke();
		c.beginPath();
		c.arc(xx,posicaoy2,r,0,2*Math.PI,false);
		c.closePath();
		c.stroke();
		c.beginPath();
		c.arc(posicao1,yy,r,0,2*Math.PI,false);
		c.closePath();
		c.stroke();

	}
}


animate()
