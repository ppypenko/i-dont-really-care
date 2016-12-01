var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;
var KEYCODE_S = 83;
var KEYCODE_D = 68;
var KEYCODE_A = 65;
var KEYCODE_SPACE = 32;
var KEYCODE_J = 74;
var KEYCODE_H = 72;
var KEYCODE_M = 77;


var RightPressed, LeftPressed, UpPressed, DownPressed = false;

function handleKeyDown(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
        case KEYCODE_LEFT:
            LeftPressed = true;
            break;
        case KEYCODE_RIGHT:
            RightPressed = true;
            break;
        case KEYCODE_UP:
            UpPressed = true;
            break;
        case KEYCODE_DOWN:
            DownPressed = true;
            break;
        case KEYCODE_W:
            UpPressed = true;
            break;
        case KEYCODE_S:
            DownPressed = true;
            break;
        case KEYCODE_D:
            RightPressed = true;
            break;
        case KEYCODE_A:
            LeftPressed = true;
            break;
        case KEYCODE_SPACE:
            startPower = true;
            break;
        default:
            break;
    }
}


function handleKeyUp(evt) {
    if (!evt) {
        var evt = window.event;
    } //browser compatibility
    switch (evt.keyCode) {
        case KEYCODE_LEFT:
            LeftPressed = false;
            break;
        case KEYCODE_RIGHT:
            RightPressed = false;
            break;
        case KEYCODE_UP:
            UpPressed = false;
            break;
        case KEYCODE_DOWN:
            DownPressed = false;
            break;
        case KEYCODE_W:
            UpPressed = false;
            break;
        case KEYCODE_S:
            DownPressed = false;
            break;
        case KEYCODE_D:
            RightPressed = false;
            break;
        case KEYCODE_A:
            LeftPressed = false;
            break;
        case KEYCODE_SPACE:
            var angle = Math.atan2(stage.mouseY - (ball.y + 25), stage.mouseX - (ball.x + 25));
            angle = (toDegrees(angle) + 180) % 360;


            xdiff = Math.floor(Math.pow((stage.mouseX - ball.x), 2));
            ydiff = Math.floor(Math.pow((stage.mouseY - ball.y), 2));

            totalDiff = Math.floor(Math.sqrt((xdiff + ydiff)) / 50);

            var velocityX = Math.floor(Math.cos((angle) * Math.PI / 180) * (powerNum / 10));
            var velocityY = Math.floor(Math.sin((angle) * Math.PI / 180) * (powerNum / 10));


            if (ballSpeedX === 0 && ballSpeedY === 0) {
                ballSpeedX = velocityX;
                ballSpeedY = velocityY;
            }
            startPower = false;
            break;
    }
}

function resetMovement() {
    UpPressed = false;
    DownPressed = false;
    LeftPressed = false;
    RightPressed = false;
}

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;