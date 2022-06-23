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