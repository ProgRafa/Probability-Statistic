var Controller;
var SESSION = sessionStorage;
var LOCAL_STORAGE = window.localStorage;

Controller = function () {
	this.goTo = function (url) {
		window.location.href = url;
	}

	this.parseUrl = function () {
		url = window.location.href;

		url = url.split('?')[1];

		var regex = /&/;
		var params = {};

		for (var i in url.split(regex)) {
			var pair = url.split(regex)[i];

			params[pair.split('=')[0]] = pair.split('=')[1];
		}
	}

	this.getSession = function(){
		return SESSION;
	}

	this.iniciarSessao = function (usuario, passwd) {
		SESSION.setItem('user', usuario);
		SESSION.setItem('password', passwd);
	}

	this.addItemSession = function (chave, valor) {
		SESSION.setItem(chave, valor);
	}

	this.removerItemSessao = function (chave, valor) {
		SESSION.removeItem(chave);
	}

	this.addItemLocal = function (chave, valor) {
		LOCAL_STORAGE.setItem(chave, valor);
	}

	this.removerItemLocal = function (chave) {
		LOCAL_STORAGE.removeItem(chave);
	}

	this.limparSessao = function () {
		SESSION.clear();
	}

	this.limparLocal = function () {
		LOCAL_STORAGE.clear();
	}

	this.getId = function (id) {
		return document.getElementById(id);
	}

	this.setAttr = function (id, attr, value) {
		document.getElementById(id).setAttribute(attr, value);
	}

	this.getAttr = function (id, attr) {
		document.getElementById(id).getAttribute(attr);
	}

	this.addEvent = function (evento, id, callback) {
		document.getElementById(id).addEventListener(evento, callback);
	}

	this.menuEfeito = function (elemento, event) {
		var selecionado = document.getElementsByClassName('hMenuSelecionado')[0];
		if (event.type == 'mouseover') {
			elemento.className += ' mouseOver';
		}

		if (event.type == 'mouseout') {
			elemento.className = this.removeClasse('mouseOut', elemento);
		}

		if (event.type == 'click') {
			var classes = elemento.className.split(' ');
			classes.pop();
			classes.pop();

			if (selecionado != undefined) {
				selecionado.className = this.removeClasse('hMenuSelecionado', selecionado);
				selecionado.className += ' hMenuPadrao';
			}

			elemento.className = classes.join(' ').toString();
			elemento.className += ' hMenuSelecionado -';
		}
	}

	this.removeClasse = function (nome, elemento) {
		var classe;
		var classes = elemento.className.split(' ');
		var idx = classes.findIndex(a => nome == a);


		if (idx != -1) {
			classes.splice(idx, 1);
		}

		classe = classes.join(' ').toString();

		return classe;
	}

	this.select = function (elemento) {
		var recuar = 0;
		var irmao = null;

		if (elemento.className.includes('mostrar')) {
			elemento.className = this.removeClasse('mostrar', elemento);
			elemento.className += ' esconder';

			irmao = elemento.nextElementSibling;
			recuar = -40;

			while (irmao != undefined || irmao != null) {
				irmao.style.transform = 'translateY(' + recuar + 'px)';
				irmao.style.zIndex = -1;
				irmao = irmao.nextElementSibling;
				recuar -= 40;
			}
		} else {
			elemento.className = this.removeClasse('esconder', elemento);
			elemento.className += ' mostrar';

			irmao = elemento.nextElementSibling;

			while (irmao != undefined || irmao != null) {
				irmao.style.transform = 'translateY(' + recuar + 'px)';
				irmao.style.zIndex = 10;
				irmao = irmao.nextElementSibling;
			}
		}
	}

	this.option = function (elemento, id) {
		var pai = document.getElementById(id);

		pai.value = elemento.value;
		pai.innerHTML = elemento.innerHTML;
	}

	this.text = function (elemento, callback) {
		var label = elemento.previousElementSibling;

		if (!label.className.includes('txt-info-animation'))
			label.className += ' txt-info-animation';

		elemento.addEventListener('blur', function focusout() {
			var label = event.target.previousElementSibling;

			if (event.target.value == '') {
				label.className = new Controller().removeClasse('txt-info-animation', label);
			} else {
				if (!label.className.includes('txt-info-animation'))
					label.className += ' txt-info-animation';
			}

			this.removeEventListener('blur', focusout, false);
		}, false);

		if (callback != undefined) {
			callback();
		}
	}
}