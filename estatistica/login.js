var oController;

function logar(){
    var user = document.getElementById('user');
    var password = document.getElementById('password');

    var bUser = validarUsuario(user);
    var bSenha = validarSenha(password);

    if(bUser && bSenha){
        oController.iniciarSessao(user.value, password.value);
        oController.goTo('manager.html');
    }   
}

function validarUsuario(elemento){
    if(elemento.value == ''){
        elemento.className += ' txt-box-err';
        alert('Usuário Inválido.');
        return false;
    }else{
        elemento.className = oController.removeClasse('txt-box-err', elemento);
        return true;
    }
}

function validarSenha(elemento){
    if(elemento.value == ''){
        elemento.className += ' txt-box-err';
        alert('Senha Inválido.');
        return false;
    }else{
        elemento.className = oController.removeClasse('txt-box-err', elemento);
        return true;
    }
}

window.onload = function(){	
    oController = new Controller();


}