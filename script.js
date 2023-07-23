let Direction = { x: 0, y: 0 };
let speed = 15;
let score = 0;
let lastPaintTime=0;
let SNAKE = [{ x: 10, y: 10 }];
let food = { x: 5, y: 15 };
const foodSound = new Audio('/food.mp3');
const gameoverSound = new Audio('/gameover.mp3');

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {return;}
    lastPaintTime=ctime;
    gameEngine();
}

function collide(snake) {
    if (snake[0].x <= 0 || snake[0].x >= 20 || snake[0].y <= 0 || snake[0].y >= 20) {
        return true;
    }
    for (let i = 1; i < SNAKE.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
}

function gameEngine() {
    if(collide(SNAKE)){
        gameoverSound.play();
        Direction = {x:0,y:0};
        alert("Game Over. Press ENTER key to play agin !!");
        SNAKE = [{x:10, y:10}];
        score=0; speed=15;
        scoreBox.innerHTML="Score : "+score;}

    if (SNAKE[0].x === food.x && SNAKE[0].y === food.y){
        foodSound.play();
        score+=1;
        if (score>HS){
            HS=score;
            localStorage.setItem("hiscore",JSON.stringify(HS));
            hiscoreBox.innerHTML="HiScore : "+HS;}
        speed+=0.1;
        scoreBox.innerHTML="Score : "+score;
        SNAKE.unshift({x : SNAKE[0].x + Direction.x, y : SNAKE[0].y + Direction.y});
        let a=2; let b=18;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())}
    }

    for (let i=SNAKE.length-2; i>=0; i--){
        SNAKE[i+1]={...SNAKE[i]};}
    SNAKE[0].x+=Direction.x; SNAKE[0].y+=Direction.y;

    box.innerHTML="";
    SNAKE.forEach((e, index)=>{
        snakebody=document.createElement('div');
        snakebody.style.gridColumnStart = e.x;
        snakebody.style.gridRowStart = e.y;
        if (index==0) {snakebody.classList.add('head');}
        else {snakebody.classList.add('snake');}
        box.appendChild(snakebody);
    })
    fooditem=document.createElement('div');
    fooditem.style.gridColumnStart=food.x;
    fooditem.style.gridRowStart=food.y;
    fooditem.classList.add('food')
    box.appendChild(fooditem);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    HS = 0;
    localStorage.setItem("hiscore", JSON.stringify(HS))
}
else {
    HS = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    Direction = { x: 1, y: 0 }
    switch (e.key) {
        case "ArrowUp":
            Direction.x = 0; Direction.y = -1;
            break;
        case "ArrowDown":
            Direction.x = 0; Direction.y = 1;
            break;
        case "ArrowLeft":
            Direction.x = -1; Direction.y = 0;
            break;
        case "ArrowRight":
            Direction.x = 1; Direction.y = 0;
            break;
        default:
            break;
    }
});