JsfScripting.isAlive = function (){  /* Eventos online y offline */
	return window.navigator.onLine;
}

JsfScripting.addOnlineEventListener(handler) {
	$(window).bind("online", handler);  
}

JsfScripting.addOfflineEventListener(handler) {
	$(window).bind("offline", handler);  
}

JsfScripting.setSession = function (key, value){   /* Manejo de sessiones */
	window.sessionStorage.setItem(key, value);  
};

JsfScripting.getSession = function (key){
	window.sessionStorage.setItem(key);  
};

JsfScripting.removeSession = function (key){
	window.sessionStorage.removeItem(key);  
};

JsfScripting.clearSession = function (){
	window.sessionStorage.clear();  
};


JsfScripting.setStorage = function (key, value){   /* Persistencia */
	window.localStorage.setItem(key, value);  
};

JsfScripting.getStorage = function (key){
	window.localStorage.setItem(key);  
};

JsfScripting.removeStorage = function (key){
	window.localStorage.removeItem(key);  
};

JsfScripting.clearStorage = function (){
	window.localStorage.clear();  
};


/* TODO: implementar history api 
 websockets con node.js http://html5demos.com/web-socket */





