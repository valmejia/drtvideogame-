const canvas = document.getElementById('inicio')
const ctx = canvas.getContext('2d')
//canvas.width = innerWidth
//canvas.height = innerHeight 


/////////////////////////////////////// IMAGES ////////////////////////////////////////
const calixto = new Image()
calixto.src = "../img/calixtoporelmomento.png"

const carie = new Image()
carie.src = "../img/cariepem.png"

const livehearts = new Image()
livehearts.src = "../img/corazonvidas.png"

const drtu = new Image()
drtu.src = "../img/drtporlomientras.png"

const fondoflor = new Image()
fondoflor.src="../img/fondo.jpeg"

const infeccion = new Image()
infeccion.src = "../img/infeccionpem.png"

const pastita = new Image()
pastita.src = "../img/pasta.png"

const backimag = new Image()
backimag.src = "../img/backmac.jpeg"

 /////////////////////////////////// enemiessss ////////////////////////////////

 const enemigos = []
 


///////////////////////////// FUNCIONES PARA BOTONES /////////////////////////////////

function quitarbuttons(){
    const btnStartGame = document.getElementById('start')
    btnStartGame.classList.add('noShow')
    const btninstrucciones = document.getElementById('instrucciones')
    btninstrucciones.classList.add('noShow')
    const btnagradecimientos = document.getElementById('agradecimientos')
    btnagradecimientos.classList.add('noShow')
}

function StartGame(){
    /////poner botones////
   quitarbuttons()
    canvas.classList.remove('noShow')
    console.log('empezar funciona')

    ////poner fondo////
    updateCanvas()
    
    setInterval(()  => {
        makeEnemigo() 
    }, 500);
}

function instrucciones(){
 quitarbuttons()
 console.log('instruciones funciona')
}

function agradecimientos(){
   quitarbuttons()
    canvas.classList.remove('noShow')
    console.log('agradecimientos funciona')
    updateCanvascredits()
}

/////////////////////////// VENTANA EMERGENTE INSTRUCCIONES ////////////////////////////

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btninstrucciones = document.getElementById('instrucciones')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btninstrucciones.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  console.log('tache funciona')
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//////////////////////////// CLASE PERSONAJE ///////////////////////////////////////

class personajes {
    constructor(x, y, ctx, img, widthimg, heightimg) {
        this.x = x
        this.y = y
        this.vida = 100
        this.velocidad = 1
        this.ctx = ctx
        this.img = img;
        this.widthimg = widthimg
        this.heightimg = heightimg
        this.dibujandoMonitos()
    }

    keepdamage(damage) {
        this.vida -= damage
    }

    subir() {
        this.y -= 85
    }

    bajar() {
        this.y += 85
    }

    disparar(x, y, img) {
        const pastita = new pastota(x, y, img, ctx)
        return pastita
    }

    estaVivo() {
        if (this.vida > 0) {
            return true
        }
        return false
    }

    dibujandoMonitos() {
        this.ctx.drawImage(this.img, this.x, this.y, this.widthimg, this.heightimg)
    }
} 


///////////////////////////// CLASES DE LOS PERSONAJES /////////////////////////////

class Drt extends personajes {
    constructor(x, y, ctx, image, width, height) {
        super(x, y, ctx, image, width, height)
        this.kills = 0
    }
}

class Enemies extends personajes{
    constructor(x, y, ctx, image, width, height) {
        super(x, y, ctx, image, width, height)
    }
} 

//////////////////////////////////////// CLASE PASTA ////////////////////////////////
class pastota {
    constructor(x, y, img, ctx) {
        this.x = x
        this.y = y
        this.img = img
        this.ctx = ctx
    }

    dibujarse() {
        this.ctx.drawImage(this.img, this.x, this.y, 30, 15)
    }
}

///////////////////////////// FUNCIONAMIENTO DE LAS TECLAS////////////////////////

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
           if(drt.y + 85 < canvas.height){
            drt.bajar(); console.log('bajando')
           } 
           break;
        case "ArrowUp":
            if(drt.y - 85 > 0){
                drt.subir(); console.log('subir')
            }
            break;
        case " ":
            drt.disparar(); console.log('disparo')
         break;
    }
})

////////////////////////////////// BACKGROUND IMAGES //////////////////////////////////

const backgroundImage = {
    img: backimag, //background 
    x: 0,
    speed: -1,

    move: function(){
        this.x += this.speed;
        this.x %= canvas.width;
        this.x %= canvas.height;
    },

    draw: function() {
        /*ctx.drawImage(this.img, this.x, 0,  innerWidth, innerHeight);
        if (this.speed < 0) {
          ctx.drawImage(this.img, this.x + canvas.width, 0, innerWidth, innerHeight);
        } else {
          ctx.drawImage(this.img, this.x - this.img.width, 0, innerWidth, innerHeight);
        }
      },*/

      ctx.drawImage(this.img, this.x, 0, 720,360);
        if (this.speed < 0) {
          ctx.drawImage(this.img, this.x + canvas.width, 0, 720, 360);
        } else {
          ctx.drawImage(this.img, this.x - this.img.width, 0, 720, 360);
        }
    },
};
// start calling updateCanvas once the image is loaded
backimag.onload = updateCanvas;

/////////////////////////////////// CAJAS DE LOS PERSONAJES ////////////////////////////
const drt = new Drt(0, 280, ctx, drtu, 80, 80) 
const cali = new Enemies(280, 0, ctx, calixto, 100,100)
const cari = new Enemies(280,0,ctx, carie, 100,100)
const inf = new Enemies(280,0,ctx, infeccion, 100,100)

function updateCanvas() {
    backgroundImage.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    drt.dibujandoMonitos();
    
    enemigos.forEach((enemies, index) => {
      enemies.x -= 2
      enemies.dibujandoMonitos()
    })

   requestAnimationFrame(updateCanvas); 
}

 



//////////////////////////////// BACKGROUND IMAGES CREDITOS/////////////////////////////////////

const backgroundImageCreditos = {
    img: backimag, //background 
    x: 0,
    y: 0, 
    speed: -1, 
    move: function(){
        this.y += this.speed;
        this.y %= canvas.height;
    },

    draw: function() {
        ctx.drawImage(this.img, this.y, 0);
        if (this.speed < 0) {
          ctx.drawImage(this.img, this.y + canvas.height, 0);
        } else {
          ctx.drawImage(this.img, this.y - this.img.height, 0);
        }
    },
};


function updateCanvascredits() {
  backgroundImageCreditos.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImageCreditos.draw();
  requestAnimationFrame(updateCanvascredits);
};

backimag.onload = updateCanvascredits;

//////////////////////////////////////////////////////////////////////////

//// FUNCTION VIDAS ////

function liveshearts(){

    ctx.drawImage()
}


///////////////////////////////////// crear enemigos //////////////////////////////////
function makeEnemigo (){
    const enemigoAleatorio = Math.floor(Math.random() * 60)
    const numeros = [1, 5, 11, 38]
    const numeroscari = [9, 50, 60, 27]
    const numerosinf = [40, 24, 52, 33]
    let typeOfEnemie = calixto
    let ejeY = Math.floor(Math.random() * (canvas.height - 100) ) 

    if(numeros.includes(enemigoAleatorio)){
       console.log("Agrega un enemigo")
       typeOfEnemie = calixto 
       const enemies = new Enemies(630, ejeY, ctx, typeOfEnemie, 100,100) ///ancho del canvas menos la imagen
       enemigos.push(enemies)  
    }  else if(numeroscari.includes(enemigoAleatorio)){
        console.log("enemigo")
        typeOfEnemie = carie
        const enemies = new Enemies(630,ejeY, ctx, typeOfEnemie, 100, 100)
        enemigos.push(enemies)

    }else if(numerosinf.includes(enemigoAleatorio)){ 
        console.log("infecciones")
        typeOfEnemie = infeccion
        const enemies = new Enemies(630,ejeY, ctx, typeOfEnemie, 100, 100)
        enemigos.push(enemies) 
    }
    
}

// esto es para determinar el enemigo aleatorio que le va a salir, definir afuera y asignar adentro del if 

/*if (!drtu.estaVivo()) {
    alert("game over")
    cancelAnimationFrame()
}*/


