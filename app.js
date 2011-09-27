
$(function (){  

     template = $("<h:outputText id='ejemploid' styleClass='nueva'  value='Modelo:'></h:outputText>"+
	"<h:inputText id='modelo' size='50' styleClass='nueva'  value='#{coche.modelo}'></h:inputText>"+
	"<h:outputText styleClass='nueva'  value='Precio:'></h:outputText>"+
	"<h:inputText id='precio' size='50' styleClass='nueva'  value='#{coche.precio}'></h:inputText>"+
	"<br/>"+
	"<br/>"+
	"<h:outputText styleClass='nueva'  value='Ruedas:'></h:outputText>"+
	"<h:inputText id='ruedas' styleClass='red'  value='#{coche.ruedas.modelo}'></h:inputText>"+
	"<br/>"+
	"<br/>"+
	"<h:commandButton value='Get' action='#{coche.cambiar}'></h:commandButton>"+
	"<h:commandButton value='Post' action='#{coche.obtener}'></h:commandButton>");



     /* $("#jsf").append(template);*/

     $("#loading").hide();

     var modelo = {	 
       coche: {
		modelo: "Ferrari F-50",
		precio: 123000,
		ruedas:{
		     modelo: "Michelin"
		}
	   }
      };    

     var action = { coche: {} };

     action.coche.post =  function(){
         modelo =  JsfScripting.get();
         p = $("<p/>",{ text: "Post:{ modelo: " + modelo.coche.modelo +", precio:" + modelo.coche.precio + ", ruedas: " +modelo.coche.ruedas.modelo +"}" });
         $("#jsf").append(p);
     }

     function online(){
          $("#loading").show();
	  url = "http://genvirt.net84.net/getJsonp.php?nombre=fichero.xml";   
          JsfScripting.searchModelFromUrl(url, function ( data ){
		        JsfScripting.set(data);
   		        $("#loading").hide();
	  });
     }

     action.coche.get = online;
   
     JsfScripting.initJsfScripting(modelo, action);

     JsfScripting.start();  
});
