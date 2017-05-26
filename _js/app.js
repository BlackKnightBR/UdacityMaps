var ViewModel = {
  getClientes : function(){
    return Model.clientes;
  },

  init : function(){
    View.init();
  }
};

var Model = {
  clientes : [
    {
      "title" : "Black Knight Studio BR",
      "desc" : "Agência de marketing digital.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Clebinarius Social Estudio",
      "desc" : "Estudio de piercings em Mococa.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Pisani Inovações",
      "desc" : "Inovações em pintura e texturização.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Fábio Celulares",
      "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Açougue São Domingos",
      "desc" : "Casa de carnes do Tião Nicola.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Clinica Wilson Saboya Brito Filho",
      "desc" : "Clinica de ginecologia.",
      "loc" : {lat: -21.4740523 , lng: -47.0034376},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    }
  ]
};

var View = {
   li : function(){
    var clientes = ViewModel.getClientes();

    if(clientes.length > 0){
      var br = "<br>";
      var listaInicio = '<div class="caixaClientes"><li><h3>';
      var listaFim = '</li></div>';
      var total = "";
      for(var i = 0; i < clientes.length; i++){
        total = listaInicio + clientes[i].title + "</h3>" + clientes[i].desc + br + clientes[i].end + br + clientes[i].cel + br + clientes[i].tel + br + listaFim;
        $("#listaClientes").append(total);
      }
    }
  },

  init : function(){
    View.li();
  }
};

//Inicia app
ViewModel.init();
