var map;
var markers = [];
var marker = null;
var largeInfoWindow = new google.maps.InfoWindow();

function AppViewModel(){
  this.nomeCliente = ko.observable("Nome do Cliente");
  this.clientes = ko.observableArray([
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
      "loc" : {lat: -21.4659485 , lng: -47.000363 },
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Pisani Inovações",
      "desc" : "Inovações em pintura e texturização.",
      "loc" : {lat: -21.4490099 , lng: -47.0121738},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Fábio Celulares",
      "desc" : "Conserto, peças e serviços para o seu celular ou tablet.",
      "loc" : {lat: -21.4657949 , lng: -47.0141764},
      "end" : "Rua Recife, 149, Mococa-SP.",
      "cel" : "(19)99194-4298",
      "tel" : "(19)3656-2178"
    },
    {
      "title" : "Açougue São Domingos",
      "desc" : "Casa de carnes do Tião Nicola.",
      "loc" : {lat: -21.4571339 , lng: -47.005603},
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
  ]);

  this.locations = [
    {title: 'Black Knight Studio BR', location: {lat: -21.4740523 , lng: -47.0034376}},
    {title: 'Clebinarius Social Estudio', location: {lat: -21.4659485 , lng: -47.000363 }},
    {title: 'Pisani Inovações', location: {lat: -21.4490099 , lng: -47.0121738}},
    {title: 'Fábio Celulares', location: {lat: -21.4657949 , lng: -47.0141764}},
    {title: 'Açougue São Domingos', location: {lat: -21.4571339 , lng: -47.005603}},
    //{title: 'Clinica Wilson Saboya Brito Filho', location: {lat: 40.7180628 , lng: -73.9961237}}
  ];

  this.styles = [
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
  ];

  this.makeMarkerIcon = function(markerColor){
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  };

  this.onLoad = function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -21.4740523, lng: -47.0034376},
      zoom: 16,
      styles: this.styles,
      mapTypeControl: false
    });

    var defaultIcon = this.makeMarkerIcon('0091ff');
    var highlightedIcon = this.makeMarkerIcon('FFFF24');
    var locations = this.locations;


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

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    };
  };

  this.showListings = function(){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
    if(marker) marker.setMap(null);
  };

  this.hideListings = function(){
    if(marker) marker.setMap(null);
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  this.mostrarCliente = function(){
    var nome = this.nomeCliente();
    var todosClientes = this.clientes();
    for(var i = 0; i < todosClientes.length; i++){
      if(todosClientes[i].title === nome){
        if(markers) this.hideListings();
        if(marker) marker.setMap(null);
        marker = new google.maps.Marker({
          position: todosClientes[i].loc,
          title: todosClientes[i].title,
          animation: google.maps.Animation.DROP,
        });
        map.setCenter(marker.position);
        map.setZoom(18);
        marker.addListener('click', function() {
          // Check to make sure the largeInfoWindow is not already opened on this marker.
          if (largeInfoWindow.marker != marker) {
            // Clear the largeInfoWindow content to give the streetview time to load.
            largeInfoWindow.setContent('');
            largeInfoWindow.marker = marker;
            // Make sure the marker property is cleared if the largeInfoWindow is closed.
            largeInfoWindow.addListener('closeclick', function() {
              largeInfoWindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
              if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                  nearStreetViewLocation, marker.position);
                  largeInfoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
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
                largeInfoWindow.setContent('<div>' + marker.title + '</div>' +
                  '<div>No Street View Found</div>');
              }
            }
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            // Open the largeInfoWindow on the correct marker.
            largeInfoWindow.open(map, marker);
          }
        });
        marker.setMap(map);
      }
    }
  };

  this.onLoad();
};

ko.applyBindings(new AppViewModel());
