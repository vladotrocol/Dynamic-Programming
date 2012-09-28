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
Path = [];

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

function add_code() {
    var CodeWrap = document.getElementById("CodeWrap");
    var n = codeString.split("\n").length - 1;
    var s = codeString.split("\n");
    var ol = document.createElement("ol");
    CodeWrap.appendChild(ol);
    for (var i = 0; i < n; i++) {
        var li = document.createElement("li");
        var cd = document.createElement("code");
        li.appendChild(cd);
        ol.appendChild(li);
        cd.innerText = s[i];
    }
}

var pos = {
    x: 0,
    y: 0
};

function draw_table(ctx, canvas, a, s1, s2, offsetX, offsetY) {
    var zoom = 3;
    var tw = (s2.length) * zoom * 10;
    var th = (s1.length) * zoom * 10;
    var x = offsetX;
    var y = offsetY;
    canvas.width = canvas.width;
    if (tw + zoom * 10 < canvas.width) {
        pos.x = (canvas.width - tw) / 2
        x = 0;
    }
    if (th + zoom * 10 < canvas.height) {
        pos.y = (canvas.height - th) / 2
        y = 0;
    }
    if (pos.x + x > -2 * zoom * 10 - tw + canvas.width && pos.x + x < 0 + zoom * 10) pos.x += x;
    if (pos.y + y > -2 * zoom * 10 - th + canvas.height && pos.y + y < 0 + zoom * 10) pos.y += y;
    ctx.fillStyle = '#00ff00';
    ctx.font = "italic " + zoom * 4 + "px sans-serif";
    ctx.textBaseline = 'top';
    ctx.fillText("y[j]", pos.x + zoom * 5 / 2, pos.y - zoom * 5 - 2);
    ctx.fillText("x[i]", pos.x - ctx.measureText("x[i]").width - 4, pos.y + zoom * 5 / 2);
    ctx.fillStyle = '#0000ff';
    ctx.font = "italic " + zoom * 4 + "px sans-serif";
    ctx.fillText("j", pos.x - ctx.measureText("j").width - 8, pos.y - 2 * zoom * 5 - 2);
    ctx.fillText("i", pos.x - zoom * 10, pos.y-zoom*5  );
    for (var i = 0; i <= m; i++) {
        for (var j = 0; j <= n; j++) {
            
            ctx.font = "italic " + zoom * 5 + "px sans-serif";

            ctx.strokeRect((j) * 10 * zoom + pos.x, (i) * 10 * zoom + pos.y, 10 * zoom, 10 * zoom);
            ctx.fillStyle = '#ff0000';
            ctx.fillText(a.c[i][j], pos.x + (j + 1) * zoom * 10 - ctx.measureText(a.c[i][j]).width - 4, pos.y + (i + 1) * zoom * 10 - zoom * 5 - 2);
            ctx.fillStyle = '#00ff00';
            if (j < n) {
                ctx.fillText(s2[j], (j + 1) * zoom * 10 + pos.x + zoom * 5 / 2, pos.y - zoom * 5 - 2);
            }
            ctx.fillStyle = '#0000ff';
            ctx.font = "italic " + zoom * 4 + "px sans-serif";
            ctx.fillText(j, (j) * zoom * 10 + pos.x + zoom * 5 / 2, pos.y - 2 * zoom * 5 - 2);
        }
        ctx.fillText(i, pos.x - zoom * 10, (i) * zoom * 10 + pos.y + zoom * 5 / 2);
        ctx.fillStyle = '#00ff00';
        ctx.font = "italic " + zoom * 5 + "px sans-serif";
        if (i < m) {
            ctx.fillText(s1[i], pos.x - ctx.measureText(s1[i]).width - 4, (i + 1) * zoom * 10 + pos.y + zoom * 5 / 2);
        }
    }
}



// Get Current Mouse Position


function getMouse(e) {
    var x, y;
    if (e.layerX || e.layerY) {
        x = e.layerX;
        y = e.layerY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
        x: x,
        y: y
    };
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
    pos.x = 0;
    pos.y = 0;
    add_code();
    input1.onkeyup = function(e) {
        process(ctx, canvas, offsetX, offsetY);
    };
    input2.onkeyup = function(e) {
        process(ctx, canvas, offsetX, offsetY);
    };
    canvas.onmousedown = function(e) {
        drag = true;
        start_position = getMouse(e);
    };
    canvas.onmouseup = function(e) {
        drag = false
    };
    canvas.onmouseout = function(e) {
        drag = false
    };
    canvas.onmousemove = function(e) {
        if (drag == true) {
            offsetX = getMouse(e).x - start_position.x;
            offsetY = getMouse(e).y - start_position.y;
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
        draw_table(ctx, canvas, a, s1, s2, offsetX, offsetY);
        printLCS(a.b, s1, s1.length, s2.length);
        var rezult = document.getElementById("Rezults");
        rezult.innerText = a.c[s1.length][s2.length] + Out.join();
    }
}