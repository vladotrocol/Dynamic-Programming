function LCS_Length(x, y) {
    m = x.length;
    n = y.length;
    var i, j;
    var c = new Array(m);
    var b = new Array(m);
    for (i = 0; i <= m; i++) {
        c[i] = new Array(n);
    }
    for (i = 0; i <= m; i++) {
        b[i] = new Array(n);
    }

    for (i = 0; i <= m; i++) {
        c[i][0] = 0;
    }
    for (i = 0; i <= n; i++) {
        c[0][i] = 0;
    }
    for (i = 1; i <= m; i++) {
        for (j = 1; j <= n; j++) {
            if (x[i - 1] == y[j - 1]) {
                c[i][j] = c[i - 1][j - 1] + 1;
                b[i][j] = "{";
            } else if (c[i - 1][j] >= c[i][j - 1]) {
                c[i][j] = c[i - 1][j];
                b[i][j] = "|";
            } else {
                c[i][j] = c[i][j - 1];
                b[i][j] = "-";
            }
        }
    }
    return {
        c: c,
        b: b
    };
};

Out = [];

function printLCS(b, X, i, j) {

    if (i == 0 || j == 0) {
        return;
    } else if (b[i][j] == "{") {
        printLCS(b, X, i - 1, j - 1);
        Out.push(X.charAt(i - 1));
    } else if (b[i][j] == "|") {
        printLCS(b, X, i - 1, j);
    } else if (b[i][j] == "-") {
        printLCS(b, X, i, j - 1);
    }
}

function add_code(){
    var CodeWrap = document.getElementById("CodeWrap");
    var n = codeString.split("\n").length - 1;
    var s = codeString.split("\n");
    var ol = document.createElement("ol");
    CodeWrap.appendChild(ol);
    for(var i=0;i<n;i++){
        var li = document.createElement("li");
        var cd = document.createElement("code");
        li.appendChild(cd);
        ol.appendChild(li);
        cd.innerText = s[i];
    }
}

var pos={
    x:0,
    y:0
};

function draw_table(ctx, canvas, b, m, n, offsetX, offsetY){
    var zoom = 2;
    var tw = n*zoom*10;
    var th = m*zoom*10;
    canvas.width = canvas.width;
    if(pos.x==0&&pos.y==0){
        if(tw<canvas.width){
            pos.x = (canvas.width - tw)/2
        }
        if(th<canvas.height){
            pos.y = (canvas.height - th)/2
        }
    }
    for(var i=0;i<m;i++){
        for(var j=0;j<n;j++){
            ctx.strokeRect((j)*10*zoom+offsetX+pos.x, (i)*10*zoom+offsetY+pos.y, 10*zoom, 10*zoom);
        }
    }
    pos.x+=offsetX;
    pos.y+=offsetY; 
}


     // Get Current Mouse Position
   function getMouse(e) {
        var x, y;
        if (e.layerX || e.layerY) {
            x = e.layerX;
            y = e.layerY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }               
        return {x:x, y:y};
        }

window.onload = function() {
    var input1 = document.getElementById("S1");
    var input2 = document.getElementById("S2");
    var canvas = document.getElementById("canvas");
    canvas.width = document.getElementById("TableWrap").clientWidth;
    canvas.height = document.getElementById("TableWrap").clientHeight;
    var ctx = canvas.getContext("2d");
    var drag = false;
    var start_position;
    var offsetX = 0;
    var offsetY = 0;
    pos.x=0;
    pos.y=0;
    add_code();
    input1.onkeyup = function (e){process(ctx, canvas,offsetX, offsetY);};
    input2.onkeyup = function (e){process(ctx, canvas,offsetX, offsetY);};
    canvas.onmousedown = function (e){drag = true;start_position = getMouse(e);};
    canvas.onmouseup = function (e){drag = false};
    canvas.onmousemove = function (e){
        if(drag == true){
            offsetX=getMouse(e).x-start_position.x;
            offsetY=getMouse(e).y-start_position.y;
            process(ctx, canvas, offsetX, offsetY);
            start_position = getMouse(e);
        }
     };  

}

function process(ctx, canvas, offsetX, offsetY) {
    var s1 = document.getElementById("S1").value;
    var s2 = document.getElementById("S2").value;
    if (s1.length > 0 && s2.length > 0) {
        Out.length = 0;
        var a = LCS_Length(s1, s2);
        draw_table(ctx, canvas, a.b, s1.length, s2.length, offsetX, offsetY);
        printLCS(a.b, s1, s1.length, s2.length);
        var rezult = document.getElementById("Rezults");
        rezult.innerText = a.c[s1.length][s2.length] + Out.join();
    }
}