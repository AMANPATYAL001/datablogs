import {configData} from './firebase_config.js';

var firebaseConfig = {
  apiKey: configData.apiKey,
  authDomain: configData.authDomain,
  projectId: configData.projectId,
  storageBucket: configData.storageBucket,
  messagingSenderId: configData.messagingSenderId,
  appId: configData.appId,
  measurementId: configData.measurementId
};


firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

function display(){
  var arr=[]
   
    db.collection('users').orderBy('date','desc').get().then(querySnapshot=>{
      
        querySnapshot.forEach(function(a){
          var dict={id:a.id,link:a.data().link,desc:a.data().desc,dt:a.data().date,icon:a.data().icon};
          arr.push(dict);
      });
        
        arr.forEach(addList);
});}





display();




function addList(e){
  var ul=document.getElementById('d-list');
  


  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//   var url=e['link']
//   var a=url.split('/')
  //   a[0]+a[2]+'/favicon.ico'

  const da=`
  <a href="${e['link']}" class='main' target="_blank">
				<div class="fcontainer">
					<img  src=${'./pics/'+e['icon']+'.ico'} class="fitem i1" width='30'>
          
					

					<h3 class="fitem i3">
          ${e['desc']}
					</h3>

					<div class="fitem i4">
          ${new Date(e.dt*1000).toLocaleDateString("en-US", options)}
					</div>
				</div>
			</a>

  
  `
  ul.insertAdjacentHTML('beforeend',da);
}



let count=document.getElementById('count')
const particleArray=[];
const AnotherparticleArray=[];


const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');

window.addEventListener('resize',function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	
})
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const mouse={
	x:undefined,
	y:undefined,
}
let hue=0;
canvas.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;
	for(let i=0;i<3;i++){
		particleArray.push(new Particle())
		
	}
})

canvas.addEventListener('click',function(event){
	mouse.x=event.x;
	mouse.y=event.y;
	for(let i=0;i<10;i++){
		AnotherparticleArray.push(new AnotherParticle())
	}}
)

class AnotherParticle{
	constructor(){
		this.x=mouse.x;
		this.y=mouse.y;
		this.size=Math.random()*30+1
		this.speedX=Math.random()*3-1.5;
		this.speedY=Math.random()*3-1.5;
		this.color='hsl('+hue+',100%,50%)';
		
	}
	update(){
		this.x+=this.speedX;
		this.y+=this.speedY;
		if(this.size>0.2) this.size-=0.1;
	}
	draw(){
		ctx.strokeStyle=this.color;
		ctx.beginPath();
		ctx.strokeRect(this.x,this.y,this.size,this.size)
		ctx.stroke();
	}
}

function AnotherhandleParticle(){
	for(let i=0;i<AnotherparticleArray.length;i++){
		AnotherparticleArray[i].update();
		AnotherparticleArray[i].draw();
		if(AnotherparticleArray[i].size<=0.8){
			AnotherparticleArray.splice(i,1);
			i--;
		}
	}
}


function Anotherfollow(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	hue+=5;
	AnotherhandleParticle();
	requestAnimationFrame(Anotherfollow);
	handleParticle();
	
}
Anotherfollow();

class Particle{
	constructor(){
		this.x=Math.random()*canvas.width;
		this.y=Math.random()*canvas.height;
		this.size=Math.random()*15+1
		this.speedX=Math.random()*3-1.5;
		this.speedY=Math.random()*3-1.5;
		this.color='hsl('+hue+',100%,50%)';
		
	}
	update(){
		this.x+=this.speedX;
		this.y+=this.speedY;
		if(this.size>0.2) this.size-=0.1
		
	}
	draw(){
		ctx.strokeStyle=this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
		ctx.stroke();
	}
}

		
		function handleParticle(){
			for(let i=0;i<particleArray.length;i++){
				particleArray[i].update();
				particleArray[i].draw();
				
				for(let j=1;j<particleArray.length;j++){
					const dx=particleArray[i].x-particleArray[j].x;
					const dy=particleArray[i].y-particleArray[j].y;
			const distance=Math.sqrt(dx*dx+dy*dy)
			if(distance<100){
				ctx.beginPath();
				ctx.strokeStyle=particleArray[i].color;
				ctx.lineWidth=.6
				ctx.moveTo(particleArray[i].x,particleArray[i].y)
				ctx.lineTo(particleArray[j].x,particleArray[j].y)
				ctx.stroke();	
			}
		}
		if(particleArray[i].size<=0.4){
			particleArray.splice(i,1);
			i--;
		}
	}
}


