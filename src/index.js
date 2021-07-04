import './index.scss';
import SenseWalk from './assets/Female-1-Walk.png';

const canvas = document.getElementById('game');
const blockW = canvas.offsetWidth;
const blockH = canvas.offsetHeight;
const ctx = canvas.getContext("2d");
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let cycleY = 0;
let bottomPress = false;
let upPress = false;
let leftPress = false;
let rightPress = false;

let pY = blockH / 2 - spriteH / 2;
let pX = blockW / 2 - spriteW / 2;

function keyUpHandler (e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        bottomPress = false;
    }
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        upPress = false;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPress = false;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPress = false;
    }

}

function keyDownHandler (e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        bottomPress = true;
    }
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        upPress = true;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPress = true;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPress = true;
    }
}

document.addEventListener('keyup', keyUpHandler);
document.addEventListener('keydown', keyDownHandler);

const img = document.createElement('img');
img.src = SenseWalk;

function tree() {
    ctx.fillStyle = "green";
    ctx.moveTo(30, 5);
    ctx.lineTo(18, 15);
    ctx.lineTo(42, 15);
    ctx.moveTo(30, 11);
    ctx.lineTo(12, 22);
    ctx.lineTo(46, 22);
    ctx.moveTo(30, 15);
    ctx.lineTo(12, 30);
    ctx.lineTo(48, 30);
    ctx.fill();
    ctx.fillStyle = "brown";
    ctx.fillRect(28, 30, 3, 6);
}

function background() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,blockW,blockH);
    tree();
}

img.addEventListener('load', ()=>{
    setInterval(() => {
        if (bottomPress) {
            pY += 10;
            cycle = (cycle + 1) % shots;
            cycleY = 0;
            ctx.clearRect(pX,pY-10, spriteW, 600);
        }
        if (upPress) {
            pY -= 10;
            cycle = (cycle + 1) % shots;
            cycleY = spriteH * 3;
            ctx.clearRect(pX,pY+10, spriteW, 600);
        }
        if (rightPress) {
            pX += 10;
            cycle = (cycle + 1) % shots;
            cycleY = spriteH * 2;
            ctx.clearRect(pX -10,pY, spriteW, 600);
        }
        if (leftPress) {
            pX -= 10;
            cycle = (cycle + 1) % shots;
            cycleY = spriteH * 1;
            ctx.clearRect(pX +10,pY, spriteW, 600);
        }
        if(pX >= blockW - spriteW ) {
            pX = blockW - spriteW;
        }
        if(pY >= blockH -spriteH ) {
            pY = blockH - spriteH;
        }
        if (pY <= 0) {
            pY = 0;
        }
        if (pX <= 0) {
            pX = 0;
        }
        background();
        ctx.drawImage(img, cycle * spriteW, cycleY, spriteW, spriteH, pX, pY, 48, 48);
    }, 120)
})

