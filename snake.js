var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var grid=32;
let snake=[];
snake[0]={
  x:5*grid,
  y:5*grid
};
let beer={
  bx:Math.floor(Math.random()*17+1)*grid,
  by:Math.floor(Math.random()*15+1)*grid
};
let d;
var g=document.getElementById("bground");
var b=document.getElementById("beerimg");
document.addEventListener("keydown",(e)=>{
   let k = e.keyCode;
   if( k == 37 && d !="right"){
    d="left"
  }else if(k == 38 && d != "down"){
    d="up"
  }else if(k == 39 && d != "left"){
    d="right"
  }else if(k == 40 && d != "up"){
    d="down"
  }
  console.log(d);
})
function collision(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}
function draw(){
  ctx.drawImage(g,0,0);
  for(let i=0;i<snake.length;i++)
  {
    ctx.fillStyle=(i==0)?"red":"black";
    ctx.fillRect(snake[i].x,snake[i].y,grid,grid);
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x,snake[i].y,grid,grid);
  }
  ctx.drawImage(b,beer.bx,beer.by);
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if(d=="left") snakeX -= grid;
  if(d=="up") snakeY -= grid;
  if(d=="right") snakeX += grid;
  if(d=="down") snakeY += grid;

  if(beer.bx==snake[0].x&&beer.by==snake[0].y)
  {
    beer={
      bx:Math.floor(Math.random()*17+1)*grid,
      by:Math.floor(Math.random()*15+1)*grid
    }
  }
  else {

      snake.pop();

  }
  let newpos = {
     x : snakeX,
     y : snakeY
 }
  if(snakeX < grid || snakeX > 17 * grid || snakeY < grid || snakeY > 15*grid|| collision(newpos,snake) ){
      clearInterval(game);
   }

  snake.unshift(newpos);

}

var game=setInterval(draw,100);
