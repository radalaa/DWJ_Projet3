// Objet Station

var stations = {
	// Recup toutes les stations et affiches les markers
	recupAllStations : function() {
		var urlRequete = 'https://api.jcdecaux.com/vls/v1/stations?contract='+ contrat +'&apiKey=' + apiKey;
   	ajaxGet(urlRequete, function(data) {
      		var allStations = JSON.parse(data);
      		allStations.forEach(function(station) {
      			// on crée le marker
      			Gmap.creerMarker(station);
			});
	      	// Affiche la zone de recherche par rue
	      	Gmap.rechercherRue();
	      	// Regroupe les markers
	      	Gmap.groupementMarker();
    	});
	},

	// Recupère la station selectionné
	stationSelected : function (station) {
		var stationNumber = station;
		var urlStation = 'https://api.jcdecaux.com/vls/v1/stations/'+stationNumber+'?contract='+ contrat +'&apiKey=' + apiKey;
		ajaxGet(urlStation, function(data) {
			var station = JSON.parse(data);
			// Appel de la station et affichage des données
			currentStation.init(station);
		});
	}
}


