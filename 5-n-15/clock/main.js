var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var min = 0;
var sec_i = 0;
var sec_i2 = 0;
var min_i = 0;
var hour_i = 0;
var clickCount = 0;
var min_count = 1;
var secChkVal = 60;
var minChkVal = 60;
var secAround = 0;
var minAround = 0;
var to, int = null;
ctx.translate(radius, radius);
radius = radius * 0.90;

drawClock();

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    drawSeconds(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.lineWidth = 2;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawSeconds(ctx, radius) {
    var ang;
    var num;
    var secHandLength = 170;
    for (var i = 0; i < 60; i++) {
        ang = (i - 3) * (Math.PI * 2) / 60;
        if (i == 3 || i == 18 || i == 33 || i == 48) {
            ctx.lineWidth = 5;
        } else {
            ctx.lineWidth = 2;
        }
        ctx.beginPath();

        var x1 = (canvas.width / 2) + Math.cos(ang) * (secHandLength) - 200;
        var y1 = (canvas.height / 2) + Math.sin(ang) * (secHandLength) - 200;
        var x2 = (canvas.width / 2) + Math.cos(ang) * (secHandLength - (secHandLength / 30)) - 200;
        var y2 = (canvas.height / 2) + Math.sin(ang) * (secHandLength - (secHandLength / 30)) - 200;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

function drawTime(ctx, radius) {
    //hour
    var hour = hour % 12;
    hour = (0 * Math.PI / 270);
    drawHand(ctx, hour, radius * 0.5, radius * 0.05, "red");

    minute = (0 * Math.PI / 270);
    drawHand(ctx, minute, radius * 0.8, radius * 0.03, "green");
    // second
    second = (0 * Math.PI / 270);
    drawHand(ctx, second, radius * 0.9, radius * 0.01, "blue");
}

function drawTimeSec(ctx, radius, sec) {
    // console.log(sec);
    // drawFace(ctx, radius);
    // drawNumbers(ctx, radius);
    // drawSeconds(ctx, radius);
    drawHand(ctx, sec, radius * 0.9, radius * 0.01, "red")
}

function drawTimeMin(ctx, radius, min) {
    drawHand(ctx, min, radius * 0.7, radius * 0.03, "green");
}

function drawTimeHour(ctx, radius, hour, min, sec) {
    hour = hour % 12;
    // console.log(hour);
    drawHand(ctx, hour, radius * 0.5, radius * 0.05, "blue");
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.rotate(-pos);
    ctx.strokeStyle = color;
    ctx.stroke();
}

$("#increase_Sec").click(function() {
    to = setTimeout(function() {
        int = setInterval(function() {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawSeconds(ctx, radius);
            //second
            var secCount = (sec_i * Math.PI / 30);
            drawTimeSec(ctx, radius, secCount);
            sec_i++;
            //miniute
            min = (min_i * Math.PI / 1800) + (sec_i * Math.PI / 1800);
            console.log(min);
            drawTimeMin(ctx, radius, min, sec_i);
            //hour
            min_i = parseInt(min + (1 / 60));
            hour = (hour_i * Math.PI / 21600) + (min_i * Math.PI / 21600) + (sec_i * Math.PI / 21600);
            drawTimeHour(ctx, radius, hour, min_i, sec_i);
            hour_i = hour_i + (1 / 720);

            if (sec_i > secChkVal) {
                secAround++;
                $("#sec_Text").text(secAround);
                secChkVal = secChkVal + 60;
                clearInterval(int);
                $("#increase_Sec").removeAttr("disabled");
            }
        }, 60);
    }, 60);
});




$("#increase_Min").click(function() {
    to = setTimeout(function() {
        int = setInterval(function() {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawSeconds(ctx, radius);
            //second
            var sec = (sec_i * Math.PI / 30);
            drawTimeSec(ctx, radius, sec);
            sec_i = sec_i + 5;
            console.log(sec_i, secChkVal)
            if (sec_i > secChkVal) {
                min_i = min_i + 1;
                secChkVal = secChkVal + 60;
                min = min_i * Math.PI / 30;
                drawTimeMin(ctx, radius, min);
            }
            drawTimeMin(ctx, radius, min);
            //hour
            var min_hour = parseInt(min_i + (1 / 60));
            var hour = (hour_i * Math.PI / 21600) + (min_i * Math.PI / 21600) + (sec_i * Math.PI / 21600);
            drawTimeHour(ctx, radius, hour, min_hour, sec);
            hour_i = hour_i + (1 / 720);

            if (min_i == minChkVal) {

                minChkVal = minChkVal + 60;
                clearInterval(int);

                drawTimeSec(ctx, radius, sec);
                min_count = min_count + 1;
            }
        }, 20);
    }, 20);
});
