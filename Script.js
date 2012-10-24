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
        Path.push({
            i: i,
            j: j,
            t: "{"
        });
    } else if (b[i][j] == "|") {
        printLCS(b, X, i - 1, j);
         Path.push({
            i: i,
            j: j,
            t: "|"
        });
    } else if (b[i][j] == "-") {
        printLCS(b, X, i, j - 1);
         Path.push({
            i: i,
            j: j,
            t: "-"
        });
    }
}

function add_code(language) {
    var CodeWrap = document.getElementById("CodeWrap");
    var str;
    if(language=="js"){
        str = jsCode;
    }
    else if(language == "c"){
        str=cCode;
    }
    else if(language == "s"){
        str=sCode;
    }
    var n = str.split("\n").length - 1;
    var s = str.split("\n");
    var ol = document.createElement("ol");
    ol.id = "List";
    CodeWrap.appendChild(ol);
    for (var i = 0; i < n; i++) {
        var li = document.createElement("li");
        var cd = document.createElement("code");
        li.appendChild(cd);
        ol.appendChild(li);
        cd.innerText = s[i];
    }
}

function remove_code(){
    var el = document.getElementById("CodeWrap");
    var ol = document.getElementById("List");
    el.removeChild(ol);
}


var pos = {
    x: 0,
    y: 0
};

var zoom = 5;
var a, s1, s2, canvas, ctx;

function draw_table(offsetX, offsetY) {

    var tw = (s2.length) * zoom * 10;
    var th = (s1.length) * zoom * 10;
    var x = offsetX;
    var y = offsetY;
    canvas.width = canvas.width;
    if(s1.length!=0&&s2.length!=0){
        if (tw + 2 * zoom * 10 < canvas.width) {
            pos.x = (canvas.width - tw) / 2
        }
        if (th + 2 * zoom * 10 < canvas.height) {
            pos.y = (canvas.height - th) / 2
        }
        if (pos.x + x > -2 * zoom * 10 - tw + canvas.width && pos.x + x < 0 + (2) * zoom * 10) pos.x += x;
        if (pos.y + y > -2 * zoom * 10 - th + canvas.height && pos.y + y < 0 + (2) * zoom * 10) pos.y += y;
        ctx.fillStyle = '#B2C730';
        ctx.font = "italic " + zoom * 4 + "px sans-serif";
        ctx.textBaseline = 'top';
        ctx.fillText("y[j]", pos.x + zoom * 5 / 2, pos.y - zoom * 5 - 2);
        ctx.fillText("x[i]", pos.x - ctx.measureText("x[i]").width - 4, pos.y + zoom * 5 / 2);
        ctx.fillStyle = '#33abd1';
        ctx.font = "italic " + zoom * 4 + "px sans-serif";
        ctx.fillText("j", pos.x - ctx.measureText("j").width - 8, pos.y - 2 * zoom * 5 - 2);
        ctx.fillText("i", pos.x - zoom * 10, pos.y - zoom * 5);

        for (var it in Path) {
            ctx.fillStyle = "#333";
            ctx.fillRect(Path[it].j * zoom * 10 + pos.x, Path[it].i * 10 * zoom + pos.y, zoom * 10, zoom * 10);
        }

            for (var it in Path) {
            if(Path[it].t=="{"){
                ctx.strokeStyle = "rgba(255, 255, 255, .3)";
                ctx.lineWidth= 0;
                ctx.beginPath();
                ctx.arc(Path[it].j * zoom * 10 + pos.x+30*zoom/4, Path[it].i * 10 * zoom + pos.y+30*zoom/4,5*zoom/2, 0, 2*Math.PI, false);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(Path[it].j * zoom * 10 + pos.x+4*zoom, -5 * zoom/2 + pos.y -2,5*zoom/2, 0, 2*Math.PI, false);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(pos.x-5*zoom/2,Path[it].i*zoom*10+pos.y+5*zoom+2,5*zoom/2, 0, 2*Math.PI, false);
                ctx.stroke();
                ctx.closePath();
            }
        }

        for (var i = 0; i <= m; i++) {
            var ii = i * 10 * zoom + pos.y;
            if (ii > -2*zoom * 10) {
                if (ii < canvas.height + zoom * 10) {
                    var txtSize = 0;
                    for (var j = 0; j <= n; j++) {
                        var jj = j * 10 * zoom + pos.x;
                        if(a.c[i][j]<=9){
                            txtSize = zoom*5;
                        }else if (a.c[i][j]<=99){
                            txtSize = zoom*5/2;
                        }
                        else{
                           txtSize = 3*zoom*5/7;
                        }
                        if (jj > -2*zoom * 10) {
                            if (jj < canvas.width + zoom * 10) {
                                ctx.font = "italic " + txtSize + "px sans-serif";
                                ctx.strokeStyle = "rgba(100, 100 ,100, 1)";
                                ctx.lineWidth = 1;
                                ctx.strokeRect(jj, ii, 10 * zoom, 10 * zoom);
                                ctx.fillStyle = '#D75813';
                                ctx.fillText(a.c[i][j], pos.x + (j + 1) * zoom * 10 - ctx.measureText(a.c[i][j]).width - 4, pos.y + (i + 1) * zoom * 10 -txtSize - 2);
                                ctx.fillStyle = '#B2C730';
                                if (i==0){
                                    if (j < n) {
                                        ctx.fillText(s2[j], (j + 1) * zoom * 10 + pos.x + zoom * 5 / 2, pos.y - zoom * 5 - 4);
                                    }
                                    ctx.fillStyle = '#33abd1';
                                    ctx.font = "italic " + zoom * 4 + "px sans-serif";
                                    ctx.fillText(j, jj + zoom * 5 / 2, pos.y - 2 * zoom * 5 - 2);
                                }
                                ctx.lineWidth = Math.round(zoom / 3);
                                ctx.strokeStyle = "#727";
                                if (a.b[i][j] == "-") {
                                    ctx.beginPath();
                                    ctx.moveTo(jj + 5 * zoom, ii + 7 * zoom);
                                    ctx.lineTo(jj + zoom, ii + 7 * zoom);
                                    ctx.lineTo(jj + 3 * zoom, ii + 6 * zoom);
                                    ctx.moveTo(jj + zoom, ii + 7 * zoom);
                                    ctx.lineTo(jj + 3 * zoom, ii + 8 * zoom);
                                    ctx.closePath();
                                    ctx.stroke();
                                } else if (a.b[i][j] == "|") {
                                    ctx.beginPath();
                                    ctx.moveTo(jj + 7 * zoom, ii + 5 * zoom);
                                    ctx.lineTo(jj + 7 * zoom, ii + zoom);
                                    ctx.lineTo(jj + 6 * zoom, ii + 3 * zoom);
                                    ctx.moveTo(jj + 7 * zoom, ii + zoom);
                                    ctx.lineTo(jj + 8 * zoom, ii + 3 * zoom);
                                    ctx.closePath();
                                    ctx.stroke();
                                } else if (a.b[i][j] == "{") {
                                    ctx.beginPath();
                                    ctx.moveTo((jj) + 5 * zoom, ii + 5 * zoom);
                                    ctx.lineTo(jj + zoom, ii + zoom);
                                    ctx.lineTo(jj + zoom, ii + 3 * zoom);
                                    ctx.moveTo(jj + 3 *  zoom, ii + zoom);
                                    ctx.lineTo(jj + zoom, ii + zoom);
                                    ctx.closePath();
                                    ctx.stroke();
                                }
                                
                            } else {
                                j = n;
                            }
                        }
                    }
                    ctx.fillStyle = "#33abd1";
                    ctx.lineWidth = 1;
                    ctx.fillText(i, pos.x - zoom * 10, ii + zoom * 5 / 2);
                    ctx.fillStyle = '#B2C730';
                    ctx.font = "italic " + zoom * 5 + "px sans-serif";
                    if (i < m) {
                        ctx.fillText(s1[i], pos.x - ctx.measureText(s1[i]).width - 4, (i + 1) * zoom * 10 + pos.y + zoom * 5 / 2);
                    }
                } else {
                    i = m;
                }
            }
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

function nullify (a){
    for (var i in a){
        a[i] = 0;
    }
}


function style_down(b){
    b.style.background = "#353535";
    b.style.boxShadow = "inset 2px 3px 0px 0px #222";
    b.childNodes[3].style.background = "#acd373";
    b.childNodes[3].style.bottom = "";
    b.childNodes[3].style.top = "2px";
}

function style_up(b){
    b.style.background = "#404040";
    b.style.boxShadow = "inset 2px 3px 0px 0px #666";
    b.childNodes[3].style.background = "#f58360";
    b.childNodes[3].style.top = "";
    b.childNodes[3].style.bottom = "0px";
}

function style_buts(a){
    for(var i in a){
        if (a[i]==1){
            style_down(document.getElementById(i));
        }
        else {
            style_up(document.getElementById(i));
        }
    }
}

window.onload = function() {
    var input1 = document.getElementById("S1");
    var input2 = document.getElementById("S2");
    canvas = document.getElementById("canvas");
    canvas.width = document.getElementById("TableWrap").clientWidth;
    canvas.height = document.getElementById("TableWrap").clientHeight;
    ctx = canvas.getContext("2d");
    var drag = false;
    var start_position;
    var offsetX = 0;
    var offsetY = 0;
    var pace = 1;
    var left_buts = {TableBut: 1, TutBut: 0, WikiBut: 0};
    var right_buts = {Javascript: 1, C: 0, PseudoCode: 0};
    pos.x = 0;
    pos.y = 0;
    add_code("js");
    var s1 = document.getElementById("S1");
    s1.value = "Insert first string here...";
    var s2 = document.getElementById("S2");
    s2.value = "Insert second string here...";

    style_buts(right_buts);
    style_buts(left_buts);
    var img = new Image();
    img.src = "Logo.png";
    img.onload = function (e){
        ctx.drawImage(img, (canvas.width - img.width)/2,(canvas.height - img.height - 20)/2) ;
    }
    ctx.font = "italic " + 20 + "px sans-serif";
    ctx.fillStyle = "#999";
    ctx.fillText("Give me input ^_^", (canvas.width-ctx.measureText("Give me input ^_^").width)/2 , (canvas.height+img.height + 20)/2);

    s1.onclick = function (e){
       if(s1.value == "Insert first string here..."){
        s1.value = "";
       }
    }
    s2.onclick = function (e){
       if(s2.value == "Insert second string here..."){
        s2.value = "";
       }
    }
    input1.onkeyup = function(e) {
        pos.x=zoom*20;
        pos.y=zoom*20;
        process(offsetX, offsetY);
    };
    input2.onkeyup = function(e) {
        pos.x=zoom*20;
        pos.y=zoom*20;
        process(offsetX, offsetY);
    };

    canvas.onmousedown = function(e) {
        drag = true;
        start_position = getMouse(e);
    };
    window.onmouseup = function(e) {
        drag = false;
    };
    canvas.onmouseout = function(e) {
        drag = false;
    };
    canvas.onmousemove = function(e) {
        if (drag == true) {
            if (pace == 1) {
                offsetX = getMouse(e).x - start_position.x;
                offsetY = getMouse(e).y - start_position.y;
                draw_table(offsetX, offsetY);
                start_position = getMouse(e);
            }
            pace++;
            if (pace == 2) pace = 1;
        }
    };

    canvas.onmousewheel = function (e){
        if(e.wheelDelta>=120){
            zoom++;
            pos.x=zoom*20;
            pos.y=zoom*20;
            draw_table(0,0);
        }
        else if(e.wheelDelta<=-120&&zoom>=2){
            zoom--;
            pos.x=zoom*20;
            pos.y=zoom*20;
            draw_table(0,0);
        }
    };

    document.getElementById("Javascript").onmouseup=function(e){
        remove_code();
        add_code("js");
        nullify(right_buts);
        right_buts["Javascript"] = 1;
        style_buts(right_buts);
    };
    document.getElementById("C").onmouseup=function(e){
        remove_code();
        add_code("c");
        nullify(right_buts);
        right_buts["C"] = 1;
        style_buts(right_buts);
    };
    document.getElementById("PseudoCode").onmouseup=function(e){
        remove_code();
        add_code("s");
        nullify(right_buts);
        right_buts["PseudoCode"] = 1;
        style_buts(right_buts);
    };
    document.getElementById("TableBut").onmouseup=function(e){
        document.getElementById("DyWiki").style.display="none";
        document.getElementById("Tutorial").style.display="none";
        document.getElementById("canvas").style.display="block";
        nullify(left_buts);
        left_buts["TableBut"] = 1;
        style_buts(left_buts);
    };
    document.getElementById("TutBut").onmouseup=function(e){
        document.getElementById("DyWiki").style.display="none";
        document.getElementById("Tutorial").style.display="block";
        document.getElementById("canvas").style.display="none";
        nullify(left_buts);
        left_buts["TutBut"] = 1;
        style_buts(left_buts);
    };
    document.getElementById("WikiBut").onmouseup=function(e){
        document.getElementById("DyWiki").style.display="block";
        document.getElementById("Tutorial").style.display="none";
        document.getElementById("canvas").style.display="none";
        nullify(left_buts);
        left_buts["WikiBut"] = 1;
        style_buts(left_buts);
    };

}

function process(offsetX, offsetY) {
    s1 = document.getElementById("S1").value;
    s2 = document.getElementById("S2").value;
        Out.length = 0;
        Path.length = 0;
        if(s1!=="Insert first string here..."&&s2!="Insert second string here..."){
            a = LCS_Length(s1, s2);
            printLCS(a.b, s1, s1.length, s2.length);   
            var rNumber = document.getElementById("Length");
            rNumber.value = a.c[s1.length][s2.length];
            var rSequence = document.getElementById("Seq");
            rSequence.value = Out.join();
            var Status1 = document.getElementById("Status1");
            var Status2 = document.getElementById("Status2");
            Status1.innerText = "Input 1 size: "+s1.length + "\u00a0";
            Status2.innerText = "Input 2 size: "+s2.length + "\u00a0";
            draw_table(0, 0);
        }
}