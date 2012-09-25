function LCS(x, y){
	m=x.length;
	n=y.length;
	var i,j;
	
	var c = new Array(m);
	var b = new Array(m);
  	for (i = 0; i <= m; i++) {
    	c[i] = new Array(n);	
  	}
  	for (i = 0; i <= m; i++) {
    	b[i] = new Array(n);	
  	}

	for(i=0; i<=m;i++){
		c[i][0] = 0;
	}
	for(i=0; i<=n;i++){
		c[0][i] = 0;
	}
	for(i=1;i<=m;i++){
		for(j=1;j<=n;j++){
			if(x[i-1]==y[j-1]){
				c[i][j] = c[i-1][j-1]+1;
				b[i][j] = "{";
			}
			else if(c[i-1][j]>=c[i][j-1]){
				c[i][j] = c[i-1][j];
				b[i][j] = "|";
			}
			else{
				c[i][j] = c[i][j-1];
				b[i][j] = "-";
			}
		}
	}
	return {c: c, b: b};
};

Out = [];
function printLCS(b, X, i, j){
	
	if(i==0||j==0){
		return;
	}
	else if(b[i][j] == "{"){
		printLCS(b, X, i-1, j-1);
		Out.push(X.charAt(i-1));
	}
	else if(b[i][j]=="|"){
		printLCS(b, X, i-1, j);
	}
	else if(b[i][j]=="-"){
		printLCS(b, X, i, j-1);
	}
}

window.onload = function (){
	var input1 = document.getElementById("S1");
	var input2 = document.getElementById("S2");
	input1.onkeyup = process;
	input2.onkeyup = process;
}

function process(){
	var s1 = document.getElementById("S1").value;
	var s2 = document.getElementById("S2").value;
	if(s1.length>0 && s2.length>0){
		Out.length = 0;
		var a = LCS(s1, s2);
		printLCS(a.b, s1, s1.length, s2.length);
		var rezult = document.getElementById("board");
		rezult.innerText = a.c[s1.length][s2.length] + Out.join(); 
	}
}