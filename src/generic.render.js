var generic = function () {};

generic.prototype.jsfTag = "h\\:outputText";
generic.prototype.htmlTag = "span";
generic.prototype.isValueAttr = false;

generic.prototype.parseEtiquetas = function (  ) {
	$etiquetas = $(this.jsfTag);
	for(var i=0; i<$etiquetas.length; i++) {
		$elemento = $($etiquetas[i]);

		elementoConv = this.render( $elemento );
			
		elementoConv = elementoConv.append($elemento.children());  // se añaden los hijos
			
		$elemento.replaceWith(elementoConv);
		
		entorno = {
		   data: {
				 elementoJsf: $elemento, 
				 elementoHtml: elementoConv,
				 isValueAttr: this.isValueAttr
		    },
			render: this,
		};
		
		/*   Para actualizar automaticamente el modelo
		elementoConv.bind("change", { model: entorno}, function(event){
		      event.data.model.render.restoreState(event.data.model.data);
		});
		                                                             */
					 
		JsfScripting.entorno[JsfScripting.entorno.length] = entorno;
	}
};

generic.prototype.render = function ( elementoJsf ){			 
	 attributes = {
		  id: elementoJsf.attr("id"),
		  "class":  elementoJsf.attr("styleClass"),
		  size: elementoJsf.attr("size"),
	 };
					
	 if(elementoJsf.attr("action") != undefined ){
		attributes["onclick"]= JsfScripting.parseAction(elementoJsf.attr("action"));
	 }
	 
	 if( this.isValueAttr ) {
		attributes["value"] = JsfScripting.parseArg(elementoJsf.attr("value"));
	 } else {
		attributes["text"] = JsfScripting.parseArg(elementoJsf.attr("value"));
	 }
					  
	 elementoConv = $("<"+this.htmlTag + "/>", attributes);
		
	 return elementoConv;
};

generic.prototype.saveState = function ( elementData ){
	elementoJsf = elementData.elementoJsf;
	elementoHtml = elementData.elementoHtml;
	isValueAttr = elementData.isValueAttr;

	elementoHtml.attr("id", elementoJsf.attr("id"));
	elementoHtml.attr("class", elementoJsf.attr("styleClass"));
	elementoHtml.attr("size", elementoJsf.attr("size"));

	if(elementoHtml.attr("onclick") != undefined ){
	    elementoHtml.attr("onclick",  JsfScripting.parseAction(elementoJsf.attr("action")));
	}

	if( isValueAttr ) {
		elementoHtml.attr("value",  JsfScripting.parseArg(elementoJsf.attr("value")));
	} else {
		elementoHtml.attr("text",  JsfScripting.parseArg(elementoJsf.attr("value")));
	}
};

generic.prototype.restoreState = function ( elementData ){
	elementoJsf = elementData.elementoJsf;
	elementoHtml = elementData.elementoHtml;
	isValueAttr = elementData.isValueAttr;

	if( isValueAttr ) {
		JsfScripting.invParseArg(elementoJsf.attr("value"), elementoHtml.attr("value"));
	} else {
		JsfScripting.invParseArg(elementoJsf.attr("value"), elementoHtml.attr("text"));
	}
};



window.generic = new generic();
window.outputText = new Object();
$.extend(true, window.outputText, window.generic);

window.inputText = new Object();
$.extend(true, window.inputText, window.generic);
window.inputText.jsfTag = "h\\:inputText";
window.inputText.htmlTag = "input";
window.inputText.isValueAttr = true;

window.commandButton = new Object();
$.extend(true, window.commandButton, window.generic);
window.commandButton.jsfTag = "h\\:commandButton";
window.commandButton.htmlTag = "button";
window.commandButton.isValueAttr = false;

