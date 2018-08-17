var Controller;
var SESSION = sessionStorage;
var LOCAL_STORAGE = window.localStorage;

Controller = function(){
	this.goTo = function(url){
		window.location.href = url;
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
	}
	
	this.iniciarSessao = function(usuario){
		SESSION.setItem('user', usuario);		
	}
	
	this.addItemSession = function(chave, valor){
		SESSION.setItem(chave, valor);
	}
	
	this.removerItemSessao = function(chave, valor){
		SESSION.removeItem(chave);
	}
	
	this.addItemLocal = function(chave, valor){
		LOCAL_STORAGE.setItem(chave, valor);
	}
	
	this.removerItemLocal = function(chave){
		LOCAL_STORAGE.removeItem(chave);
	}
	
	this.limparSessao = function(){
		SESSION.clear();
	}
	
	this.limparLocal = function(){
		LOCAL_STORAGE.clear();
	}
	
	this.getId = function(id){
		return document.getElementById(id);
	}
	
	this.setAttr = function(id, attr, value){
		document.getElementById(id).setAttribute(attr, value);
	}
	
	this.getAttr = function(id, attr){
		document.getElementById(id).getAttribute(attr);
	}
	
	this.addEvent = function(evento, id, callback){
		document.getElementById(id).addEventListener(evento, callback);
	}
	
	this.menuEfeito = function(elemento, event){
		var selecionado = document.getElementsByClassName('hMenuSelecionado')[0];
		if(event.type == 'mouseover'){
			elemento.className += ' mouseOver';
		}
		
		if(event.type == 'mouseout'){
			elemento.className = this.removeClasse('mouseOut', elemento);
		}
		
		if(event.type == 'click'){
			var classes = elemento.className.split(' ');
			classes.pop();
			classes.pop();
			
			if(selecionado != undefined){
				selecionado.className = this.removeClasse('hMenuSelecionado', selecionado);
				selecionado.className += ' hMenuPadrao';
			}
				
			elemento.className = classes.join(' ').toString();
			elemento.className += ' hMenuSelecionado -';
		}
	}
	
	this.removeClasse = function(nome, elemento){
		var classes = elemento.className.split(' ');
		classes.splice(classes.findIndex(a => nome == a), 1);
		return classes.join(' ').toString();
	}
}