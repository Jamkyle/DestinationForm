var map;
var direction;
var panel;
var distance;
var origin;
var destination;
var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire


function initialize(){

  var latLng = new google.maps.LatLng(48.8566140, 2.3522219); // Coordonnée de Paris
  var myOptions = {
    maps : {
      zoom      : 15,
      center    : latLng,
      mapTypeId : google.maps.MapTypeId.ROADMAP, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
      maxZoom   : 20
    },
    autocomplete : {
      componentRestrictions : {country : "fr"}
    }
  };

  map      = new google.maps.Map(document.getElementById('map'), myOptions.maps);
  direction = new google.maps.DirectionsRenderer({
    map   : map,
    panel : panel
  });

  var input_origin = document.getElementById('origin');
  var input_destination = document.getElementById('destination');
  var autocomplete = new google.maps.places.Autocomplete(input_origin, myOptions.autocomplete);
  var autocomplete = new google.maps.places.Autocomplete(input_destination, myOptions.autocomplete);
};

var calculer = () => {
    var request = {
      origin      : document.getElementById("origin").value,
      destination : document.getElementById("destination").value,
      travelMode  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
    }
    if(request.origin && request.destination){
      directionsService.route(request, (response, status) => { // Envoie de la requête pour calculer le parcours
        console.log(response);
        if(status == google.maps.DirectionsStatus.OK){
          direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
          distance = (response.routes[0].legs[0].distance.value)/1000; //récupère la distance du parcourt
          if(request.origin.match(/Paris/i) && request.destination.match(/Paris-Orly/i))
            $("#price").text("35 €")
          else if(request.origin.match(/Paris/i) && request.destination.match(/Aéroport/i))
            $("#price").text("47 €")
          else if(request.origin.match(/Paris/i) && request.destination.match(/Paris/i))
            $("#price").text("20 € "+distance)
          else if(distance>20){
            (distance>50)?
            $("#price").text(Math.ceil(Math.ceil(distance)*1.4)+" € "+distance)
            :$("#price").text(Math.ceil(Math.ceil(distance)*1.6)+" € "+distance);
          }
          else
            $("#price").text(Math.ceil(Math.ceil(distance)*2.2)+" € "+distance);
        }
        else{
          alert("tous les champs doivent être bien remplis")
        }
      });
      initialize();
    }
    else {

    }

  // alert("Depart: "+origin+" Arrivée: "+destination);
}
initialize()
