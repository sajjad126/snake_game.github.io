let inpDir = { x:0 , y:0 };
let gamesound = "importing a sound";
let speed_control = document.querySelector("#speed_control");
let speed_option = speed_control.querySelectorAll("li");
let speed_indicator = speed_control.querySelector(".speed_indicator");
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let control_btns = document.querySelectorAll(".control_btn");
let board = document.querySelector(".main");
let scoreBox = document.querySelector(".score");
let snakeArr = [
    {x:12,y:12}
];
let food = {x:8, y:3};

// speed control 
speed_option.forEach((e , i)=>{
    e.addEventListener("click", ()=>{
        speed = i*2+2;
        speed_indicator.innerText = e.innerText;
    })
});


// game functions
// -----------------------------------
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    // console.log(ctime);
    lastPaintTime = ctime ;
    gameEngine();
}

function isCollide(snarr){
    // if you are bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snarr[i].x === snarr[0].x && snarr[i].y === snarr[0].y){
            return true;
        };
    }
    if(snarr[0].x >= 19 || snarr[0].x <= 0  || snarr[0].y >= 19 || snarr[0].y <= 0 ){
        return true;
    };
        
}

function gameEngine(){
    // part 1: Updating the snake and Food 
    if(isCollide(snakeArr)){
        inpDir = { x:0 , y:0 };
        snakeArr = [
            {x:12,y:12}
        ];
        alert(`game over, your score ${score} ! press enter to play again!`);
        score = 0;
        scoreBox.innerText = "SCORE : " + score;
    }

    // if you have eaten the food , incriment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inpDir.x , y:snakeArr[0].y + inpDir.y});
        score += speed;
        scoreBox.innerText = "SCORE : " + score;
        let a = 2;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    // moving the snake 
    for(let i= snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inpDir.x;
    snakeArr[0].y += inpDir.y;


    // part 2: Display the snake and Food
    // display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake_body");
        }
        board.appendChild(snakeElement);
    })
    // display the food 
        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);

}


// main logic start here
// --------------------------------
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
    inpDir = {x:0 , y:1};
    switch (e.key) {
        case "ArrowUp":
            inpDir.x = 0;
            inpDir.y = -1;
            break;
        case "ArrowDown":
            inpDir.x = 0;
            inpDir.y = 1;
            break;
        case "ArrowLeft":
            inpDir.x = -1;
            inpDir.y = 0;
            break;
        case "ArrowRight":
            inpDir.x = 1;
            inpDir.y = 0;
            break;
        default:
            break;
    }
})

// click to snake moveing
control_btns[0].addEventListener("click",()=>{
    // window.requestAnimationFrame(main);
    inpDir.x = 0;
    inpDir.y = -1;
})
control_btns[1].addEventListener("click",()=>{
    // window.requestAnimationFrame(main);
    inpDir.x = 1;
    inpDir.y = 0;
})
control_btns[2].addEventListener("click",()=>{
    // window.requestAnimationFrame(main);
    inpDir.x = 0;
    inpDir.y = 1;
})
control_btns[3].addEventListener("click",()=>{
    // window.requestAnimationFrame(main);
    inpDir.x = -1;
    inpDir.y = 0;
})