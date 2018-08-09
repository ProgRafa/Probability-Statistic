var oController;
var oEstatistica;
var oGrafico;

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

			var chartPonto = new google.visualization.LineChart(elemento);
			chartPonto.draw(data, opcoes);
		}
	}
	
	//setta um json de opções padrões
	//larg: largura do gráfico
	//alt: altura do gráfico
	//aColors: array de cores
	this.setOption = function(larg, alt, aColors){
		var opt;
		
		opt = {
				vAxis: {
					minValue: 0,
					maxValue: 10,
					gridlines:{count: 10},
					format: ''
				},
				hAxis: {
					minValue: 0,
					maxValue: 15,
					gridlines:{count: 15},
					format: ''
				},
				width: larg,
				height: alt,
				colors: aColors
		};
		
		return opt;
	}
	
	//cElementos = conjunto de lementos do eixo X
	this.addTicks = function(cElementos){
		return { ticks: cElementos };						
	}
	
	//adiciona um range ao eixo selecionado (X ou Y)
	// a <= valor do eixo <= b
	//formato = tipo de numerico (decimal, monetário, científico...)
	//grid = linhas de auxílio
	this.addRange = function(a, b, formato, grid){
		return 	{
					minValue: a,
					maxValue: b,
					gridlines: grid,
					format: formato
				};
	}
	
	this.addTrendLines = function(tipo, grau, color){
		return {
					type: tipo,
					degree: grau,
					color: color
				};
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
	var matriz;
	var opt;
	
	oController = new Controller();
	oController.parseUrl();
	
	oEstatistica = new Estatistica();
	
	oGrafico = new Grafico();
	
	oGrafico.graficoPonto([
			['id', '1', '2', '3', '4', '5'],
			[1, oEstatistica.frequenciaAbsoluta(1, [1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5]), 0, 0, 0, 0],
			[2, 0, 0, 0, 0, 0],
			[2, 3, 0, 0, 0, 0],
			[4, 0, 0, 0, oEstatistica.frequenciaAbsoluta(4, [1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5]), 0],
			[5, 0, 0, 0, 0, oEstatistica.frequenciaAbsoluta(5, [1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5])],
		], oGrafico.setOption(800, 500, ['blue']), document.getElementById('grafico_1'));	
}
