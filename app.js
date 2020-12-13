
let gravedad=0.2;
let imagenes=[];
let canvas = document.querySelector('#canvas');
let context=canvas.getContext('2d');

function helloLuis(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
   
    window.addEventListener('mouseover',()=>{
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight; 
    });

    setInterval(()=>{
        context.clearRect(0,0,canvas.width, canvas.height);
        imagenes.map((imagen)=>{
            imagen.move();
            imagen.display();
            imagen.gravity();

        });
    },10);
}

function clickClient(){
    window.addEventListener('click',(e)=>{
        let colorBall=`hsl(${Math.random()*360},100%,50%)`;
        let valorTexto=`${Math.round(Math.random()*10)}`
        let ballNueva= new Ball(context,canvas.width, canvas.height,e.pageX, e.pageY, colorBall,valorTexto);
        imagenes.push(ballNueva);

    })
    
}

class Ball{
    posX;
    posY;
    speed
    

    constructor(context, maxWidth, maxHeight, posX, posY,colorBall,valorTexto ){
        this.context=context;
        this.maxWidth=maxWidth;
        this.maxHeight=maxHeight;
        this.radio=75;
        this.posX=posX;
        this.posY=posY;
        this.speedX=5;
        this.speedY=10;
        this.colorBall=colorBall;
        this.valorTexto=valorTexto;
        
        

    }
    display(){
        this.context.beginPath();
        this.context.fillStyle=this.colorBall;
        this.context.arc(this.posX, this.posY, this.radio, 0, Math.PI*2,true);
        this.context.closePath();
        this.context.fill();
       
       



        this.context.beginPath();
        this.context.fillStyle='black';
        this.context.font = '150px Plank';
        this.context.textAlign= 'center';
        this.context.textBaseline='middle';
        this.context.fillText(this.valorTexto,this.posX, this.posY);
        this.context.closePath();
        this.context.fill();
        

       
    }

    gravity(){
        this.speedY+=gravedad;
    }
        
    move(){     
        this.posY+=this.speedY;
        this.posX+=this.speedX;
        
        if(this.posY+this.radio>this.maxHeight){
            this.speedY*=-0.99;
            // this.posY=this.maxHeight;
        }

        if((this.posX>this.maxWidth-100) || this.posX<0){
            this.speedX*=-1;
            // this.posX=0;
        }
    }  
}

let mensaje = document.querySelector('.mensaje');
mensaje.style.height=`${window.innerHeight}px`;

window.addEventListener('click',()=>{
    mensaje.remove();
});
