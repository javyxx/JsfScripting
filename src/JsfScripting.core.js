window.JsfScripting = {
    modelo: "", 
	action: "",
    entorno: new Array()  /* entorno añadido para poder mantener una copia de la etiqueta y luego actualiar el Uel (#{manageBean.valor}) */
}

JsfScripting.parseArg = function ( argumento ){
	if(argumento.charAt(0) == '#' && argumento.charAt(1) == '{' && argumento.charAt(argumento.length-1) == '}'){
		texto = argumento.substring(2,argumento.length-1);
		array = texto.split(".");
		variable = this.modelo; 

		$.each(array, function(index, value) { 
                  if(variable != undefined ) {
		  	variable = variable[value]; 
 		  } 
		});

        if(variable == undefined ) variable = "";
		
		return variable;
	} else {
		return argumento;
	}
};

JsfScripting.invParseArg = function ( argumento, valor  ){
	if(argumento.charAt(0) == '#' && argumento.charAt(1) == '{' && argumento.charAt(argumento.length-1) == '}'){
		texto = argumento.substring(2,argumento.length-1);

		subscript = "JsfScripting.modelo."+texto +" = '"+ valor+"'";
		
                new Function(subscript)();  /* con eval(subscript) se puede hacer this.modelo */
                 /*
			<  Object.getOwnPropertyDescriptor(JsfScripting.modelo, "coche")
			descriptor.configurable = false;
			Object.defineProperty(JsfScripting.modelo, "coche", descriptor);
			delete circle.radius;
		*/



	} else {
            /* dejo el else para ver que no se necesita hacer nada */
	}
};


JsfScripting.parseAction =  function ( argumento ){
	if(argumento.charAt(0) == '#' && argumento.charAt(1) == '{' && argumento.charAt(argumento.length-1) == '}'){
		texto = argumento.substring(2,argumento.length-1);
		texto = "JsfScripting.action."+ texto + "();";

		return texto;
	} else {
		return argumento;
	}
};

JsfScripting.parseEtiquetas = function ( elemento ) {
	elemento.parseEtiquetas();
};

JsfScripting.saveState = function (){
	for(var i=0 ; i< this.entorno.length; i++){
                this.entorno[i].render.saveState(this.entorno[i].data);
	}
};

JsfScripting.restoreState = function (){
	for(var i=0 ; i< this.entorno.length; i++){
                this.entorno[i].render.restoreState(this.entorno[i].data);
				
	}
};

JsfScripting.searchModelFromUrl = function ( url, handler ){  /*  Usar web sockets http://html5demos.com/web-socket*/
	$.ajax({
		type: "GET",
		url: url,
		dataType: "jsonp",
		success: handler
	});
};

JsfScripting.postModelToUrl = function ( url, data, handler ){  /*  Usar web sockets http://html5demos.com/web-socket*/
	$.ajax({
		type: "POST",
		url: url,
		dataType: "jsonp",
                data: data,
		success: handler
	});
};


JsfScripting.set = function ( modelo ){
	this.modelo = modelo; 
	this.saveState();   
};

JsfScripting.get = function (){
   this.restoreState();   
   return this.modelo;
};

JsfScripting.setAction = function ( action ){
	this.action = action; 
};

JsfScripting.getAction = function (){
   return this.action;
};

JsfScripting.initJsfScripting = function ( modelo, action ){
  this.modelo = modelo;   
  this.action = action;
};

JsfScripting.start = function (){
	this.parseEtiquetas(outputText);
	this.parseEtiquetas(inputText);
	this.parseEtiquetas(commandButton);
};

