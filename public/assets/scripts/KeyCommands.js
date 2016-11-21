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
            UpPressed = true;
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
            UpPressed = false;
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