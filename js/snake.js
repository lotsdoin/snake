window.onload = function(){
   // var width = window.innerWidth > 600 ? 600 : window.innerWidth,
    //    height = window.innerHeight > 600 ? 600 : window.innerHeight;
    width = window.innerWidth - 20;
    height = window.innerHeight - 20;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // build block
    function Rect (x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    // draw block method
    Rect.prototype.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
    }
    // draw snake
    function Snake(){
        var snakeArray = [];
        for(var i = 0; i < 4; i++){
            var rect = new Rect(i*20, 0, 20, 20, this.color);
            snakeArray.splice(0, 0, rect);
        }

        // snake head
        var head = snakeArray[0];
        head.color = "red";

        this.head = snakeArray[0];
        this.snakeArray = snakeArray;
        this.direction = 39;
    }

    // draw snake method
    Snake.prototype.draw = function(){
        for(var i = 0; i < this.snakeArray.length; i++){
            this.snakeArray[i].draw();
        }
    }
    // snake move method
    Snake.prototype.move = function(){
        var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h,this.color);
        this.snakeArray.splice(1, 0, rect);
        if(isEat()){
            food = new getRandomFood();
        }
        else{
            this.snakeArray.pop();
        }
        // left: 37, up: 38, right: 39, down: 40
        switch(this.direction){
            case 37:
                this.head.x -= this.head.w;
                break;
            case 38:
                this.head.y -= this.head.h;
                break;
            case 39:
                this.head.x += this.head.w;
                break;
            case 40:
                this.head.y += this.head.h;
                break;
            default:
                break;
        }
        // gameover
        // bump wall
        if(this.head.x >= canvas.width || this.head.x < 0 || this.head.y >= canvas.height || this.head.y < 0){
            clearInterval(timer);
        }
        // bump self
        for(var i = 1; i < this.snakeArray.length; i++){
            if(this.snakeArray[i].x == this.head.x && this.snakeArray[i].y == this.head.y){
                clearInterval(timer);
            }
        }
    }

    // draw initialize snake
    var snake = new Snake();
    snake.draw();

    var food = new getRandomFood();

    var timer = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.move();
        snake.draw();
    }, 100);


    // build random function
    function getNumberInRange(min, max){
        return Math.floor((max - min) * Math.random() + 1);
    }

    // build food object
    function getRandomFood(){
        var isOnSnake = true;
        var foodColor = ["red", "green", "gray", "yellow", "black", "blue"];
        var setFoodColor = foodColor[getNumberInRange(0, foodColor.length - 1)];
        while(isOnSnake){
            isOnSnake = false;
            var indexX = getNumberInRange(0, canvas.width/20 - 1);
            var indexY = getNumberInRange(0, canvas.height/20 - 1);
            var rect = new Rect(indexX * 20, indexY*20, 20, 20, setFoodColor);
            for(var i = 0; i < snake.snakeArray.length; i++){
                if(snake.snakeArray[i].x == rect.x && snake.snakeArray[i].y == rect.y){
                    isOnSnake = true;
                    break;
                }
            }
        }
        return rect;

    }
    // eat food
    function isEat(){
        if(snake.head.x == food.x && snake.head.y == food.y){
            return true;
        }else{
            return false;
        }
    }


    // don't back
    document.onkeydown = function(e){
        var ev = e || window.event;
        switch(ev.keyCode){
            case 37:{
                if(snake.direction !== 39){
                    snake.direction = 37;
                }
                break;
            }
             case 38:{
                if(snake.direction !== 40){
                    snake.direction = 38;
                }
                break;
            }
              case 39:{
                if(snake.direction !== 37){
                    snake.direction = 39;
                }
                break;
            }
               case 40:{
                if(snake.direction !== 38){
                    snake.direction = 40;
                }
                break;
            }
        }
        ev.preventDefault();
    };

}
