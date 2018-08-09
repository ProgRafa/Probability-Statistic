var Controller;
var oController;

function Controller(){
	this.title;
	this.amostra;
	this.ocorrencia;
	this.probabilidade;
	
	this.goToGraphic = function(){
		this.titulo = document.getElementById('titulo').value;
		this.amostra = document.getElementById('amostra').value;
		this.ocorrencia = document.getElementById('ocorrencia').value;
		this.probabilidade = document.getElementById('prob').value;
		
		window.location.href = "graphic.html?title=" + this.titulo + 
											"&amostra=" + this.amostra +
											"&ocorrencia=" + this.ocorrencia+
											"&probabilidade=" + this.probabilidade;
	}
	
	this.parseUrl = function(){
		url = window.location.href;
		
		url = url.split('?')[1];
		
		var regex = /&/;
		var params = {}; 
		
		for(var i in url.split(regex)){
			var pair = url.split(regex)[i];
			
			params[pair.split('=')[0]] = pair.split('=')[1];
		}
		
		this.title = params.title;
		this.amostra = params.amostra;
		this.ocorrencia = params.ocorrencia;
		this.probabilidade = params.probabilidade;
	}
}