/////////////////////////// CLASE PERSONAJE ///////////////////////////////////////

class personajes {
    constructor(x, y, ctx, img) {
        this.x = x
        this.y = y
        this.vida = 20
        this.velocidad = 1
        this.ctx = ctx
        this.img = img;
        this.dibujarse()
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

    dibujarse() {
        this.ctx.fillRect(this.x, this.y, 30, 30)
        this.ctx.drawImage(this.img, this.x, this.y, 60, 60)
    }
}
///////////////////////////// CLASES DE LOS PERSONAJES /////////////////////////////

class drt extends personajes {
    constructor(x, y, ctx, image) {
        super(x, y, ctx, image)
        this.kills = 0
    }
}

class enemies extends personajes {
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

document.addEventListener("keydown", (event) => {
    console.log(event)
    switch (event.key) {
        case "ArrowLeft":
           
            break;

        case "ArrowRight":

            break;

        case "ArrowUp":

          break;

        case "ArrowDown":

            break;

        case " ":
           
            break;
    }
})

//////////////////////////////////// 

const backgroundImage = {
    img: fondoflor,
    x: 0,
    speed: -1,

    move() {
        this.x += this.speed;
        this.x %= canvas.width;
    },

    draw: function () {
        ctx.drawImage(this.img, this.x, 0, 900, 600);
        if (this.speed < 0) {
            ctx.drawImage(this.img, this.x + canvas.width, 0, 900, 600);
        } else {
            ctx.drawImage(this.img, this.x - this.img.width, 0, 900, 600);
        }
    },
};

function StartGame() {
    quitarbuttons()
    canvas.classList.remove('noShow')
    console.log('empezar funciona')
  

    configuracionDelCanvas()

    crearCanvas()

    setInterval(() => {
      makeEnemies()
    }, 500)
}



function crearCanvas() {
    console.log("Actualizando")
    ctx.clearRect(0, 0, 900, 600)
    backgroundImage.draw()
    drtu.dibujarse()

    backgroundImage.move()

    enemigos.forEach((enemigo, index) => {
        enemigo.x -= 2
        enemigo.dibujarse()
        if (enemigo.x === drtu.x + 50 && enemigo.y === drtu.y) {
            drtu.recibirDano(20)
            enemigos.splice(index, 1)
        }
    })

    balas.forEach((bala, indexBala) => {
        bala.x += 2
        bala.dibujarse()

        enemigos.forEach((enemigo, indexEnemigo) => {
            if (enemigo.x === bala.x || enemigo.x === bala.x + 1 || enemigo.x === bala.x - 1) {
                enemigos.splice(indexEnemigo, 1)
                balas.splice(indexBala, 1)
                drtu.kills++
            }
        })
    })

    mostrarDatos(drtu.vida, drtu.x, drtu.y, drtu.kills)
    idFrame = requestAnimationFrame(crearCanvas) 

    if (!drtu.estaVivo()) {
        alert("C murio")
        cancelAnimationFrame(idFrame)
    }

}

function mostrarDatos(vida) {
    ctx.font = "40px Arial"
    ctx.fillText(vida, 450, 40)
    ctx.font = "18px Arial"
    ctx.fillText(`X: ${x},Y: ${y} Kills: ${k}`, 700, 40)
}


function  makeEnemies() {
    const aleatorio = Math.floor(Math.random() * 40)
    const numeros = [1, 32, 5, 38, 29]
    if (numeros.includes(aleatorio)) {
        console.log("Agregaste un enemigo")
        let tipoEnemigo = infeccion
        if (aleatorio % 2 === 0) {
            tipoEnemigo = personajeGoomba
        }
        const enemigo = new Enemigo(860, 450, ctx, tipoEnemigo)
        enemigos.push(enemigo)
    }
}

function configuracionDelCanvas() {

    document.addEventListener("keydown", (event) => {
        //console.log(event)
        switch (event.key) {
            case "ArrowLeft":
                drtu.moverAtras()
                drtu.img 
                break;
            case "ArrowRight":
                drtu.moverAlFrente()
               drtu.img 
                break;
            case "ArrowUp":
                drtu.saltar()
                drtu.img = personajeSalta
                break;
            case "ArrowDown":
                drtu.bajar()
                break;
            case " ":
                if (balas.length < 10) {
                    const nuevaBala = drtu.disparar(drtu.x + 50, drtu.y + 35, balaImagen)
                    balas.push(nuevaBala)
                }
                break;
        }
    })

}