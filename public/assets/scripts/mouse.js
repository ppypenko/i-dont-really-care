var mouse = {
    upX: 0,
    upY: 0,
    downX: 0,
    downY: 0
};

function mouseInfo(socket) {
    stage.on("stagemousedown", function (evt) {
        mouseDownX = Math.floor(evt.stageX);
        mouseDownY = Math.floor(evt.stageY);
    });
    stage.on("stagemouseup", function (evt) {
        mouseUpX = Math.floor(evt.stageX);
        mouseUpY = Math.floor(evt.stageY);
        socket.emit('update', mouse);
    });
}