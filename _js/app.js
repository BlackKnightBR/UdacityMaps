var map;
var markers = [];

var ViewModel = {
  getClientes : function(){
    return Model.clientes;
  },

  getStyles : function(){
    return Model.styles;
  },

  getLocations : function(){
    return Model.locations;
  },

  init : function(){
    View.init();
  }
};

var Model = {

//Array com informações dos clientes.
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
  ],

//Array com os estilos para o mapa.
  styles : [
    {
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    }
  ],

//Array de marcadores, posição e título.
  locations : [
    {title: 'Black Knight Studio BR', location: {lat: -21.4740523 , lng: -47.0034376}},
    {title: 'Clebinarius Social Estudio', location: {lat: -21.4659485 , lng: -47.000363 }},
    {title: 'Pisani Inovações', location: {lat: -21.4490099 , lng: -47.0121738}},
    {title: 'Fábio Celulares', location: {lat: -21.4657949 , lng: -47.0141764}},
    {title: 'Açougue São Domingos', location: {lat: -21.4571339 , lng: -47.005603}},
    //{title: 'Clinica Wilson Saboya Brito Filho', location: {lat: 40.7180628 , lng: -73.9961237}}
  ]
};

var View = {

//Adiciona informação as janelas de informações, se elas existirem.
  populateInfoWindow : function(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;

      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };

          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
      }

      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
    }
  },

//Cria o ícone do marcadores.
  makeMarkerIcon : function(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  },

//Mostra os marcadores dos clientes.
  showListings : function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  },

//Esconde os marcadores dos clientes
  hideListings : function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  },

//Recupera a foto do serviço de StreetView do Google
  getStreetView : function(data, status) {
    if (status == google.maps.StreetViewStatus.OK) {
      var nearStreetViewLocation = data.location.latLng;
      var heading = google.maps.geometry.spherical.computeHeading(
        nearStreetViewLocation, marker.position);
        infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
        var panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 30
          }
        };
      var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), panoramaOptions);
    } else {
      infowindow.setContent('<div>' + marker.title + '</div>' +
        '<div>No Street View Found</div>');
    }
  },

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

//Função que relaciona o mapa ao seu elemento HTML e define os marcadores, suas posições, títulos,
//cores e adiciona a janela de informações.
  initMap : function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -21.4740523, lng: -47.0034376},
      zoom: 16,
      styles: ViewModel.getStyles(),
      mapTypeControl: false
    });

    var largeInfowindow = new google.maps.InfoWindow();
    var defaultIcon = View.makeMarkerIcon('0091ff');
    var highlightedIcon = View.makeMarkerIcon('FFFF24');
    var locations = ViewModel.getLocations();


    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;

      var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });

      markers.push(marker);

      marker.addListener('click', function() {
        View.populateInfoWindow(this, largeInfowindow);
      });

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    };

    //Adiciona as funções aos botões.
    document.getElementById('show-listings').addEventListener('click', View.showListings);
    document.getElementById('hide-listings').addEventListener('click', View.hideListings);
  },

  init : function(){
    //Inicia o mapa.
    View.initMap();
    //Cria a lista de clientes.
    View.li();
  }
};


//Inicia app
ViewModel.init();
