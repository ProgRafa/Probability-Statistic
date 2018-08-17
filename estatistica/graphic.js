var oController;
var oEstatistica;
var oGrafico;

var Opcao = function(w, h){
	this.opcao = {
		width: w,
		height: h,
		dataOpacity: 0.5,
		chartArea: { backgroundColor: 'lightgray'},
		hAxis: {baselineColor: 'black', gridlines: {color: 'white'}},
		vAxis: {baselineColor: 'black', gridlines: {color: 'white'}},
		series: {},
	};

	//adiciona interação entre o usuário e o gráfico
	this.addExplorer = function(){
		this.opcao.explorer = {};
		this.opcao.explorer.zoomDelta = 1.05;
	}
	
	//adiciona animação ao gráfico
	this.addAnimacaoNoGrafico = function(tempo, estilo){
		this.opcao.animation = {};
		this.opcao.animation.duration = tempo;
		this.opcao.animation.startup = true;
		this.opcao.animation.easing = estilo;	
	}
	
	//modifica opacidade da linha ou pontos
	this.addOpacidadePontoOuLinha = function(opc){
		this.opcao.dataOpacity = opc;
	}
	
	//modifica o fundo do gráfico
	this.addPlanoDeFundoGrafico = function(cor){
		this.opcao.chartArea.backgroundColor = cor;
	}
	
	//modifica cor do grid
	this.addCorDaGrade = function(cor){
		this.opcao.vAxis.gridlines.color = cor;
		this.opcao.hAxis.gridlines.color = cor;
	}
	
	//modifica cor das bases do gráfico
	this.addCorDasBases = function(cor){
		this.opcao.vAxis.baselineColor = cor;
		this.opcao.hAxis.baselineColor = cor;
	}
	
	//Adiciona um título ao eixo X
	//titulo: titulo do eixo X
	this.addXAxisTitle = function(titulo){
		this.opcao.hAxis.title = titulo;
		this.opcao.hAxis.titleTextStyle = {};
		this.opcao.hAxis.titleTextStyle.fontSize = 18;
		this.opcao.hAxis.titleTextStyle.italic = false;
	}
	
	//Adiciona um título ao eixo Y
	//titulo: titulo do eixo X
	this.addYAxisTitle = function(titulo){
		this.opcao.vAxis.title = titulo;
		this.opcao.vAxis.titleTextStyle = {};
		this.opcao.vAxis.titleTextStyle.fontSize = 18;
		this.opcao.vAxis.titleTextStyle.italic = false;
	}
	
	//Adiciona cor a uma série ou mais series
	//serie: array de string com o valor da serie
	//cor: valor da cor (pode ser em hexadecimal)
	this.addSeriesColor = function(series, cor){
		if(Array.isArray(series)){
			if(series[0] == null){
				return;
			}
			
			if(this.opcao.series[series[0]] == undefined){
				this.opcao.series[series[0]] = {};
			}
			
			this.opcao.series[series[0]].color = cor;
			
			series.splice(0, 1);
			
			this.addSeriesColor(series, cor);
		}
	}
	
	//Seta o tamanho da linha de uma ou mais séries
	//series: array de string com o valor da serie
	//tamLinha: largura da linha
	this.addSeriesLineWidth = function(series, tamLinha){
		if(Array.isArray(series)){
			if(series[0] == undefined){
				return;
			}
			
			if(this.opcao.series[series[0]] == undefined){
				this.opcao.series[series[0]] = {};
			}
			
			this.opcao.series[series[0]].lineWidth = tamLinha;
			
			series.splice(0, 1);
			
			this.addSeriesLineWidth(series, tamLinha);
		}
	}
	
	//Modifica o design da linha para tracejado 
	//de uma ou mais séries
	//series: array ou valor único da série
	//dash: array com forma do tracejado, ex.: [1, 1]
	this.addSeriesLineDash = function(series, dash){
		if(Array.isArray(series)){
			if(series[0] == undefined){
				return;
			}
			
			if(this.opcao.series[series[0]] == undefined){
				this.opcao.series[series[0]] = {};
			}
			
			this.opcao.series[series[0]].lineDashStyle = dash;
			
			series.splice(0, 1);
			
			this.addSeriesLineDash(series, dash);
		}		
	}
	
	//Define o formato geométrico do ponto
	//series: array de string com os valores da série
	//forma: forma geométricado ponto (triangle, square, circle, diamond, star, polygon)
	this.addSeriesPointShape = function(series, forma){
		if(Array.isArray(series)){
			if(series[0] == undefined){
				return;
			}
			
			if(this.opcao.series[series[0]] == undefined){
				this.opcao.series[series[0]] = {};
			}
			
			this.opcao.series[series[0]].pointShape = forma;
			
			series.splice(0, 1);
			
			this.addSeriesPointShape(series, forma);
		}
	}
	
	//Define o tamanho do ponto
	//series: array de string com os valores da série
	//tam: número do tamanho do ponto
	this.addSeriesPointSize = function(series, tam){
		if(Array.isArray(series)){
			if(series[0] == undefined){
				return;
			}
			
			if(this.opcao.series[series[0]] == undefined){
				this.opcao.series[series[0]] = {};
			}
			
			this.opcao.series[series[0]].pointSize = tam;
			
			series.splice(0, 1);
			
			this.addSeriesPointSize(series, tam);
		}
	}
	
	//Adiciona uma coleção de elementos ao eixoX
	//cElementos: conjunto de lementos do eixo X
	this.addTicksX = function(cElementos){
		this.opcao.hAxis.baseline = cElementos[0];
		this.opcao.hAxis.ticks = cElementos;							
	}
	
	//Adiciona uma coleção de elementos ao eixoY
	//cElementos: conjunto de lementos do eixo Y
	this.addTicksY = function(cElementos){
		this.opcao.vAxis.baseline = cElementos[0];
		this.opcao.vAxis.ticks = cElementos;						
	}
	
	//adiciona um formato aos valores do eixo x
	// (decimal, numeric...)
	this.addFormatoX = function(formato){
		this.opcao.hAxis.format = formato;
	}
	
	//adiciona um formato aos valores do eixo Y
	// (decimal, numeric...)
	this.addFormatoY = function(formato){
		this.opcao.vAxis.format = formato;
	}
	
	//adiciona um range ao eixo X
	// a <= valor do eixo <= b
	this.addRangeX = function(a, b){
		this.opcao.hAxis.baseline = a;
		this.opcao.hAxis.viewWindow = {};
		this.opcao.hAxis.viewWindow.min = a;
		this.opcao.hAxis.viewWindow.max = b;
	}
	
	//adiciona um range ao eixo Y
	// a <= valor do eixo <= b
	this.addRangeY = function(a, b){
		this.opcao.vAxis.baseline = a;
		this.opcao.vAxis.viewWindow = {};
		this.opcao.vAxis.viewWindow.min = a;
		this.opcao.vAxis.viewWindow.max = b;
	}
	
	//alterna a orientação do gráfico para a vertical
	this.orientacaoVertical = function(){
		this.opcao.orientation = 'vertical';	
	}
	
	//alterna a orientação do gráfico para a padrão
	this.orientacaoHorizontal = function(){
		this.opcao.orientation = 'horizontal';	
	}
	
	//Adiciona um modelo de função a série informada
	//serie: série que será aplicado o modelo
	//tipo: tipo de curva (polynomial, linear, exponential)
	//cor: cor da linha
	//grau: grau do modelo
	//opaco: opacidade da linha do modelo
	//tamLinha: largura da linha
	this.addTrendLines = function(serie, tipo, cor, grau, opaco, tamLinha){
		if(this.opcao.trendlines == undefined){
			this.opcao.trendlines = {};
		}
		this.opcao.trendlines[serie] = {};
		this.opcao.trendlines[serie].type = tipo;
		this.opcao.trendlines[serie].degree = grau;
		this.opcao.trendlines[serie].color = cor;
		this.opcao.trendlines[serie].opacity = opaco;
		this.opcao.trendlines[serie].lineWidth = tamLinha;
		this.opcao.trendlines[serie].visibleInLegend = true;
	}
}

var Grafico = function(){
	this.graficoArea = function(matriz, opcoes, elemento){
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawChart);
	
		function drawChart() {
			var data = google.visualization.arrayToDataTable(matriz);
			var chartLinha = new google.visualization.AreaChart(elemento);
			chartLinha.draw(data, opcoes);
		}
	}
	
	this.graficoPonto = function(matriz, opcoes, elemento){
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawChart);
	
		function drawChart() {
			var data = google.visualization.arrayToDataTable(matriz);

			var chartPonto = new google.visualization.ScatterChart(elemento);
			chartPonto.draw(data, opcoes);
		}
	}
	
	this.graficoLinha = function(matriz, opcoes, elemento){
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawChart);
	
		function drawChart() {
			var data = google.visualization.arrayToDataTable(matriz);

			var chartLinha = new google.visualization.LineChart(elemento);
			chartLinha.draw(data, opcoes);
		}
	}
	
	this.graficoHistograma = function(matriz, opcoes, elemento){
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawChart);
	
		function drawChart() {
			var data = google.visualization.arrayToDataTable(matriz);

			var chartHistogram = new google.visualization.Histogram(elemento);
			chartHistogram.draw(data, opcoes);
			
			console.log(chartHistogram);
		}
	}
	
	this.graficoDeSetores = function(matriz, opcoes, elemento){
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawChart);
	
		function drawChart() {
			var data = google.visualization.arrayToDataTable(matriz);

			var chartSetores = new google.visualization.PieChart(elemento);
			chartSetores.draw(data, opcoes);
		}
	}
	
	//Junta duas matrizes em uma unica para criar 
	//um gráfico de comparação
	this.unirGraficos = function(matrizA, matrizB){
		var matrizFinal = [];
		var j = 1;
		
		matrizFinal[0] = [];
		matrizFinal[0][0] = 'P(X)';
		matrizFinal[0][1] = 'P(A)';
		matrizFinal[0][2] = 'P(B)';
		
		for(var i = 1; i < matrizA.length; i++){
			matrizFinal[j] = [];
			matrizFinal[j][0] = matrizA[i][0];
			matrizFinal[j][1] = matrizA[i][1];
			matrizFinal[j][2] = matrizB[i][1];

			j++;
		}
		
		return matrizFinal;
	}
} 

window.onload = function(){
	var matriz = [];
	
	oController = new Controller();
	
	oEstatistica = new Estatistica();
	
	oGrafico = new Grafico();
	
	oOption = new Opcao(800, 500);
	
	oOption.addXAxisTitle('Valor');
	oOption.addYAxisTitle('Frequência');
	
	oOption.addFormatoX('');
	oOption.addFormatoY('');
	
	oOption.addRangeY(0, 1);
	oOption.addRangeX(1, 10);
	
	oOption.addSeriesColor([0], 'green');
	
	oOption.addSeriesPointShape([0], 'circle');
	
	oOption.addSeriesPointSize([0],  5);

	oOption.addOpacidadePontoOuLinha(0.8);
	
	oOption.addTrendLines(0, 'polynomial', 'black', 4, 1, 8);
	
	oOption.addAnimacaoNoGrafico(1500, 'linear');
	oOption.addExplorer();
	
	matriz = oEstatistica.somatorioDaNormal(1, 10, 5, 2.1);
	
	oGrafico.graficoArea(matriz, oOption.opcao, document.getElementById('grafico_1'));
}
