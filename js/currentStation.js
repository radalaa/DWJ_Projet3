
// Obejt Station en cours

var currentStation = {
	// Initialisation
	init: function (source) {
		this.status = source.status;
		this.nom = source.name.split('-')[1];
		this.number = source.number;
		this.adresse = source.address;
		this.capacite = source.available_bike_stands;
		this.dispo = source.available_bikes;
		// Vérification du vélo décrementé
		if (this.nom == sessionStorage.nomStationReserver) {
			this.dispo = this.dispo-1;
		}
		this.setInfosStation();
	},

	// Envoi des données
	setInfosStation: function() {
		this.setStatus();
		this.setNom();
		this.setAdresse();
		this.setCapacity();
		this.setBtnReserver();
	},

	// Affichage des différents status d'une station
	setStatus: function() {
		var statusElt = $('#station-status span');
		var dispoElt = $('#station-dispo span');

		dispoElt.text(this.dispo);

		if(this.status === 'OPEN' && this.dispo >= 10) {
        	statusElt.text('Station ouverte');
        	statusElt.removeClass().addClass('status-open');
        	dispoElt.removeClass().addClass('status-open');
        } 
        else if (this.status === 'OPEN' && this.dispo < 10) {
        	statusElt.text('Station ouverte');
        	statusElt.removeClass().addClass('status-warning');
   			dispoElt.removeClass().addClass('status-warning');
        }
        else if (this.status === 'CLOSED') {
        	statusElt.text('Station fermée');
        	statusElt.removeClass().addClass('status-close');
   			dispoElt.removeClass().addClass('status-close');
        }
	},

	setNom: function() {
   		$('#station-nom').text(this.nom);
	},	

	setAdresse: function() {
		$('#station-adresse').text(this.adresse);
	},

	setCapacity: function() {
		$('#station-capacite').text(this.capacite);
	},

	// Affichage du bouton réserver en fonction du status de la station
	setBtnReserver: function() {
		if(this.status ==='OPEN' && this.dispo > 0) {
			$('#btn-reserv').show();
			$('#btn-reserv').off('click', this.btnClick);
			$('#btn-reserv').on('click', this.btnClick);
		} else {
			$('#btn-reserv').hide();
		}
	},

	// Fonction qui va gérer l'appel du panneau
	btnClick : function() {
				reservation.openPanelReservation();
	}
};
