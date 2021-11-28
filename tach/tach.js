function makeTach(container) {
    var c = document.getElementById(container);
    var ctx = c.getContext("2d");

    var X = c.width / 2;
    var Y = c.height / 2;
    var R = (c.width / 2) - 10;

    ctx.beginPath();
    
    ctx.arc(X, Y, R, 0, 2 * Math.PI, false);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    
    ctx.stroke();
}

makeTach('o-tach');