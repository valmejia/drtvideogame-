const canvas = document.getElementById('inicio')
const ctx = canvas.getContext('2d')
//canvas.width = innerWidth
//canvas.height = innerHeight 


/////////////////////////////////////// IMAGES ////////////////////////////////////////
const calixto = new Image()
calixto.src = "../img/calixtoporelmomento.png"

const carie = new Image()
carie.src = "../img/cariepem.png"

const corazon = new Image()
corazon.src = "../img/corazonvidas.png"

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

 const enemies = []



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
    constructor(x, y, ctx, img) {
        this.x = x
        this.y = y
        this.vida = 20
        this.velocidad = 1
        this.ctx = ctx
        this.img = img;
        this.dibujandoMonitos()
    }

    keepdamage(damage) {
        this.vida -= damage
    }

    movetofront() {
        this.x += 2
    }

    movetoback() {
        this.x -= 2
    }

    jump() {
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
        this.ctx.drawImage(this.img, this.x, this.y, 50, 50)
    }
}


///////////////////////////// CLASES DE LOS PERSONAJES /////////////////////////////

class Drt extends personajes {
    constructor(x, y, ctx, image) {
        super(x, y, ctx, image)
        this.kills = 0
    }
}

class Enemies extends personajes{
    constructor(x, y, ctx, image) {
        super(x, y, ctx, image)
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
        case "ArrowLeft":
            drt.movetoback(); console.log('rigth');
            break;
        case "ArrowRight":
            drt.movetofront();  console.log('left'); 
            break;
        case "ArrowDown":
            drt.bajar(); console.log('bajando')
            break;
        case "Enter":
            drt.disparar(); console.log('disparo')
         break;
        case " ":
           drt.jump(); console.log('jumping')
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

      ctx.drawImage(this.img, this.x, 0,);
        if (this.speed < 0) {
          ctx.drawImage(this.img, this.x + canvas.width, 0, );
        } else {
          ctx.drawImage(this.img, this.x - this.img.width, 0,);
        }
    },
};
// start calling updateCanvas once the image is loaded
backimag.onload = updateCanvas;

/////////////////////////////////// CAJAS DE LOS PERSONAJES ////////////////////////////
const drt = new Drt(0,0, ctx, drtu) 


function updateCanvas() {
    backgroundImage.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    drt.dibujandoMonitos();
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

function liveshearts(vida){

    ctx.drawImage(this.corazon)
}


///////////////////////////////////// crear enemigos //////////////////////////////////
/*function makeEnemigo (){
    const enemigoAleatorio = Math.floor(Math.random * canvas.height)
    if(enemigoAleatorio){
        console.log("Agrega un enemigo")
        let typeOfEnemie = calixto
    } elseif(enemigoAleatorio){
        console.log("Agrega un enemigo")
        let typeOfEnemie = carie
    } else{
        let typeOfEnemie = infeccion
    }
     const enemies = new Enemies(0,0, ctx, typeOfEnemie)
     enemigos.push(enemies)
}*/

  