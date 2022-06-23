const canvas = document.getElementById('inicio')
const ctx = canvas.getContext('2d')
//canvas.width = innerWidth
//canvas.height = innerHeight 


/////////////////////////////////////// IMAGES ////////////////////////////////////////
const calixto = new Image()
calixto.src = "img/calixto.png"

const carie = new Image()
carie.src = "img/carie.png"

const livehearts = new Image()
livehearts.src = "img/corazonvidas.png"

const drtu = new Image()
drtu.src = "img/4.png" 

const infeccion = new Image()
infeccion.src = "img/infeccion.png"

const pastita = new Image()
pastita.src = "img/pasta.png"

const backimag = new Image()
backimag.src = "img/Background.jpeg"

 /////////////////////////////////// enemiessss ////////////////////////////////

 const enemigos = []
 const bala = []
 
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

    ////poner fondo////
    updateCanvas()
    
    setInterval(()  => {
        makeEnemigo() 
    }, 500);
}

function instrucciones(){
 quitarbuttons()
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
        const pastita = new pastota(x, y, img, ctx, this.widthimg, this.heightimg)
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
    constructor(x, y, img, ctx, widthimg, heightimg) {
        this.x = x
        this.y = y
        this.img = img
        this.ctx = ctx
        this.widthimg = widthimg
        this.heightimg = heightimg
    }

    dibujandoMonitos() {
        this.ctx.drawImage(this.img, this.x, this.y, 30, 15)
    }
}

///////////////////////////// FUNCIONAMIENTO DE LAS TECLAS////////////////////////

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
           if(drt.y + 134 < canvas.height){
           } 
           break;
        case "ArrowUp":
            if(drt.y - 80 > 0){
            }
            break;
        case " ":
            const pasta = drt.disparar(drt.x + 80, drt.y + 50, pastita)
            bala.push(pasta) 
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
const drt = new Drt(0, 250, ctx, drtu, 200, 134) 
const cali = new Enemies(280, 0, ctx, calixto, 250,150)
const cari = new Enemies(280,0,ctx, carie, 128,190)
const inf = new Enemies(280,0,ctx, infeccion, 250, 167)


function updateCanvas() {
    backgroundImage.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    drt.dibujandoMonitos();
    mostrarDatos(drt.vida, drt.x, drt.y, drt.kills) 

   vidas()

    bala.forEach((bal, indexbala) => {
        bal.x += 1
        bal.dibujandoMonitos()
        enemigos.forEach((enemie, index) => {
          if(enemie.x <= bal.x + 30 && (enemie.y >= bal.y && enemie.y <= bal.y + bal.heightimg || 
            enemie.y + enemie.heightimg >= bal.y && enemie.y + enemie.heightimg <= bal.y + bal.heightimg)){
              enemigos.splice(index, 1)
              bala.splice(index, 1)
            }
        })
    })


    enemigos.forEach((enemie, index) => {
      enemie.x -= 1
      enemie.dibujandoMonitos()
      if(enemie.x <= drt.x + 30 && (enemie.y >= drt.y && enemie.y <= drt.y + drt.heightimg || 
        enemie.y + enemie.heightimg >= drt.y && enemie.y + enemie.heightimg <= drt.y + drt.heightimg)){
          drt.keepdamage(50) ////////////////////////////////////////
          console.log('choca', drt)
          enemigos.splice(index, 1)
        }
    })
   requestAnimationFrame(updateCanvas); 
}


//// FUNCTION VIDAS ////

function vidas(){
    ctx.drawImage(livehearts, 20, 20, 40, 34);
    ctx.drawImage(livehearts, 70, 20, 40, 34);
    ctx.drawImage(livehearts, 120, 20, 40, 34);
    ctx.drawImage(livehearts, 170, 20, 40, 34);
    ctx.drawImage(livehearts, 220, 20, 40, 34);

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
      
       typeOfEnemie = calixto 
       const enemies = new Enemies(630, ejeY, ctx, typeOfEnemie, 100,100) ///ancho del canvas menos la imagen
       enemigos.push(enemies)  
    }  else if(numeroscari.includes(enemigoAleatorio)){
      
        typeOfEnemie = carie
        const enemies = new Enemies(630,ejeY, ctx, typeOfEnemie, 100, 100)
        enemigos.push(enemies)

    }else if(numerosinf.includes(enemigoAleatorio)){ 
        
        typeOfEnemie = infeccion
        const enemies = new Enemies(630, ejeY, ctx, typeOfEnemie, 100, 100)
        enemigos.push(enemies) 
    }
    
}

// esto es para determinar el enemigo aleatorio que le va a salir, definir afuera y asignar adentro del if 






function mostrarDatos(vida, x, y, k) {
    ctx.font = 'Press Start 2P'
    ctx.fillText(vida, 40, 40)
    ctx.font = "18px Press Start 2P"

    /*if (!drt.estaVivo()) {
        cancelAnimationFrame()
    }*/
}
