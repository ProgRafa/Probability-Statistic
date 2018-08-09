var Estatistica;

Estatistica = function(){
	
	//Gerador de Matriz
	//a = intervalo fechado do inicio 
	//b = intervalo aberto do fim
	//m = média
	//dp = desvio padrão
	this.somatorioDaNormal = function(a, b, m, dp){
		var coord = [];
		var j = 1;
		
		coord[0] = [];
		coord[0][0] = 'P(X)';
		coord[0][1] = 'P(A)';		
		
		for(var i = a; i <= b; i = Number((i + 0.1).toFixed(2))){
			coord[j] = [];
			coord[j][0] = i;
			coord[j][1] = this.distribuicaoNormal(i, m, dp);
			j++;
		}
		
		return coord;
	}
	
	//Distribuições
	
	//x = ocorrência esperada
	//m = media
	//dp = desvio padrão
	this.distribuicaoNormal = function(x, m, dp){
		var k;
		var euler;
		var padrao;
		
		padrao = -0.5 * Math.pow((x - m) / dp, 2);
		euler = Math.pow(2.718, padrao);
		
		k = (1 / (dp * Math.sqrt(2 * 3.1415))) * euler;

		return k;
	}
	
	//cEventos = array de eventos sucesso - a < X < b
	this.somatoriaDaBinomial = function(cEventos, n, p){
		var coord = [];
		var j = 1;
		
		coord[0] = [];
		coord[0][0] = 'P(X)';
		coord[0][1] = 'P(x)';
		
		for(var i in cEventos){
			coord[j] = [];
			coord[j][0] = cEventos[i];
			coord[j][1] = this.distribuicaoBinomial(cEventos[i], n, p);
			j++;
		}
		
		return coord;
	}
	
	//x = ocorrência esperada
	//n = total de amostras 
	//p = probabilidade de sucesso
	this.distribuicaoBinomial = function(x, n, p){
		var k;
		var pFalha;
		
		pFalha = Math.pow((1 - p), (n - x));
		
		k = this.combinacaoSimples(n, x) * Math.pow(p, x) * pFalha;

		return k;
	}
	
	//parms[0] = total de amostras
	//parms[1] = probabilidade
	this.distribuicaoGeometrica = function(parms){
		var k;
		
		k = Math.pow((1 - parms[1]), (parms[0] - 1)) * parms[1];

		return k;
	}
	
	this.somatorioDePoisson = function(cEventos, y){
		var coord = [];
		var j = 1;
		
		coord[0] = [];
		coord[0][0] = 'P(X)';
		coord[0][1] = 'P(x)';
		
		for(var i in cEventos){
			coord[j] = [];
			coord[j][0] = cEventos[i];
			coord[j][1] = this.distribuicaoPoisson(cEventos[i], y);
			j++;
		}
		
		return coord;	
	}
	
	//q = exato número de ocorrências no intervalo de tempo estimado
	//y = média de ocorrências no período t
	this.distribuicaoPoisson = function(q, y){
		var k;

		k = (Math.pow(2.71828, - y) * Math.pow(y, q)) / this.fatorial(q);

		return k;
	}
	
	//Métricas
	
	//n = total de amostras
	//arr = array de valores
	this.media = function(n, arr){
		var k;
		var sum;
		
		sum = 0;
		k = 0;
		
		for(var i in arr){
			sum += arr[i];
		}
		
		k = sum / n;
		
		return k;
	}

	//n = total de amostras
	//arr = array de valores
	this.mediana = function(n, arr){
		var k;
		var idx;
		
		if(n % 2 == 0){
			idx = (n / 2);
			k = (arr[idx] + arr[idx+1]) / 2;
		}else{
			idx = Number((n/2).toString().split('.')[0]) + 1;
			k = arr[idx];
		}
		
		return k;
	}

	//n = total de amostras
	//arr = array de valores
	this.variancia = function(n, arr){
		var k;
		var media;
		var sum;
		
		sum = 0;
		
		media = this.media(n, arr);

		for(var i in arr){
			sum += Math.pow((arr[i] - media), 2);
		}

		k = sum / (n - 1);
		
		return k;
	}
	
	//n = total de amostras
	//arr = array de valores
	this.desvioPadrao = function(n, arr){
		var k;
		
		k = Math.sqrt(this.variancia(n, arr));
		
		return k;
	}

	//x = valor de incognita
	//arr = array de valores
	this.frequenciaAbsoluta = function(x, arr){
		var k;
		
		k = 0;
		
		for(var i in arr){
			if(arr[i] == x){
				k++;
			}
		}
		
		return k;
	}
	
	//n = total de amostras
	//x = valor de incognita
	//arr = array de valores	
	this.frequenciaRelativa = function(n, x, arr){
		var k;
		var ocor;
		
		ocor = 0;
		
		for(var i in arr){
			if(arr[i] == x){
				ocor++;
			}
		}
		
		k = ocor / n;
		
		return k;
	}

	//Analise Combinatória
	this.fatorial = function(n){
		var k = 1;
		
		for(var i = 0; i < n; i++)
			k *= (n-i);
		
		return k;
	}
	
	//n = total de amostras
	//r = ocorrências
	this.arranjoSimples = function(n, r){
		return Math.pow(n, r);
	}
	
	//n = total de amostras
	//r = ocorrências
	this.arranjoRepeticao = function(n, r){
		var numerador = this.fatorial(n);
		var denominador = this.fatorial(n - r);
		
		return numerador / denominador;
	}
	
	//n = total de amostras
	//r = ocorrências
	this.combinacaoSimples = function(n, r){
		var numerador = this.fatorial(n);
		var denominador = this.fatorial(r) * this.fatorial(n - r);
		
		return numerador / denominador;
	}
	
	//n = total de amostras
	//r = ocorrências
	this.combinacaoRepeticao = function(n, r){
		var numerador = this.fatorial(n + r - 1);
		var denominador = this.fatorial(r) * this.fatorial(n - 1);
		
		return numerador / denominador;
	}
	
}