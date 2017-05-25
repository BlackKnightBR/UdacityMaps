var ViewModel = function(){

};


var buttonMark = function(position,title,id){
  console.log(position,title,id);
  var locali = position;
  var titulo = title;
  $("#botao" + id).click(function(){
    console.log(position,title);
    var marker = new google.maps.Marker({
      position: locali,
      title: titulo,
      animation: google.maps.Animation.DROP,
      id: id
    });
  });
};


var li = function(){
  var clientes = [
    {
      "title" : "Black Knight Studio BR",
      "desc" : "Agência de marketing digital.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    },
    {
      "title" : "Clebinarius Social Estudio",
      "desc" : "Estudio de piercings em Mococa.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    },
    {
      "title" : "Pisani Inovações",
      "desc" : "Inovações em pintura e texturização.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    },
    {
      "title" : "Fábio Celulares",
      "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    },
    {
      "title" : "Açougue São Domingos",
      "desc" : "Casa de carnes do Tião Nicola.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    },
    {
      "title" : "Clinica Wilson Saboya Brito Filho",
      "desc" : "Clinica de ginecologia.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376}
    }
  ]

  if(clientes.length > 0){
    var data = "%data%";
    var lista1 = '<div class="caixaClientes"><li>';
    var lista2 = '<br><button id="%data%" type="button">';
    var lista3 = ' Marcar Localização</button></li></div>';
    var total = "";
    for(var i = 0; i < clientes.length; i++){
      total = lista1 + clientes[i].title + "<br>" + "Descrição: " + clientes[i].desc + lista2.replace(data,"botao" + i) + lista3;
      $("#listaClientes").append(total);
      buttonMark(clientes[i].loc,clientes[i].title,i);
    }
  }

};

//Iniciando app.
ko.applyBindings(new ViewModel());

li();
