// Objet 

var reservation = {
	duree : '', // durée globale en secondes
	dureeMinutes : '', // affichera les minuetes
	dureeSecondes : '', // affichera les secondes
	decompteId :'', // initialise le decompte

// Ouvre le panneau de réservation qui affiche les infos
	openPanelReservation : function() {
			var that = this;
			// masque ou affiche les différents éléments
			$('#infos-reservation').show();
			$('#infos-station').hide();
			$('#searchStation').hide();
			$('#btn-reserv').hide();

			// insére les données de la station choisie
			infosReservation.setInfos();
			// initialise le canvas
			canvas.init();

			// Evenement pour le bouton close
			$('#close-reservation-panel').on('click', function() {
				that.closePanelReservation();
			});

			// Evenement pour le bouton valider
			$('#valide').on('click', this.verifValide);
	},

// Ferme le panneau de réservation et affiche les éléments
	closePanelReservation : function() {
			$('#infos-reservation').hide();
			$('#infos-station').show();
			$('#searchStation').show();
			$('#btn-reserv').show();
			// Vérification de l'exitence d'un canvas
			if (canvas.context != undefined) {
				canvas.clear();
			}
	},

// Données contenues dans sessionStorage
	webStorage : function() {
		sessionStorage.statusReservation = true;
		sessionStorage.nomStationReserver = currentStation.nom;
		sessionStorage.dureeReservation = reservationValidity * 60;
		sessionStorage.NomClient = $('#res-name').val();
		sessionStorage.PrenomClient = $('#res-lastName').val();
/////////////////////////localstorage pour ajouter le nom et prènom///////////////////////
jQuery(function ($) {

  $.fn.formBackUp = function () {
  	if (!(localStorage)) {
  		return false;
  	}
    var forms = this;
    var datas = {};
    var ls = false;
    //On recupure l'URL
    datas.href = window.location.href;

    //On recupure les infos du localstorage
    if (localStorage['formBackUp']) {
    	ls = JSON.parse(localStorage['formBackUp']);
    	if(ls.href == datas.href){
    		// Boucle pour afficher le nom et le prènom dans le formulaire
    		for (var id in ls ){
    			if (id != 'href') {
    				$('#'+id).val(ls[id]);
    				datas[id]=ls[id];
    			}
    		}
    	}

    }

    forms.find('input,textarea').keyup(function (e) {
      datas[$(this).attr('id')] = $(this).val();
      localStorage.setItem('formBackUp', JSON.stringify(datas));
    });
    //console.log(localStorage);
  }
 	 //appler la function formBackUp
 	 $('form').formBackUp();

});
///////////////////fin jquery/////////////////////////////////

	},

// Affiche les différentes durée de la réservation
	setTimer : function (init){
		if (init = true) {
			this.duree = Number(sessionStorage.dureeReservation);
		}
		this.dureeMinutes = Math.floor(this.duree / 60);
		this.dureeSecondes = this.duree - this.dureeMinutes * 60;
	},

	verifValide: function() {
		$('#error-messsage-lastName').text('');// vider le champ message erreur nom
		$('#error-messsage-firstName').text('');// vider le champ message erreur prènom
		$('#msgAlerte').text('');// vider le champ message erreur signature

		//verfier si les champs son valide
		if (canvas.cursorX === '' || ($("#res-name").val() == '') || ($("#res-lastName").val() == '') || (!$("#res-name").val().match(/^[a-z]+$/i)) || (!$("#res-lastName").val().match(/^[a-z]+$/i)) ) {
			
				switch (canvas.cursorX === '' || ($("#res-name").val() == '') || ($("#res-lastName").val() == '') || (!$("#res-name").val().match(/^[a-z]+$/i)) || (!$("#res-lastName").val().match(/^[a-z]+$/i) )) {
				case (canvas.cursorX === ''):
				$('#msgAlerte').text('Merci de signer votre réservation');// Message en cas de canvas vide
				break;
				case ($("#res-name").val() == ''):
				 $('#error-messsage-firstName').text('Veuillez entrer votre Nom');// Message en cas le champ nom vide 
				break;
				case ($("#res-lastName").val() == ''):
				$('#error-messsage-lastName').text('Veuillez entrer votre Prènom');// Message en cas le champ nom vide 
				break;
				case  (!$("#res-name").val().match(/^[a-z]+$/i)):
				//////////////////////
				$('#error-messsage-firstName').text('Le Nom n\'est pas valide');// Message en cas le champ nom vide 
				break;
				case  (!$("#res-lastName").val().match(/^[a-z]+$/i)):
				//////////////////////
				$('#error-messsage-lastName').text('Le Prènom n\'est pas valide');// Message en cas le champ nom vide 
				break;
				default:
				break;

				}
			
			
		} 
		else {
			// Si on tente de reserver à nouveau sur la station deja reservée
			if (currentStation.nom === sessionStorage.nomStationReserver) {
				alert('Une réservation est déjà en cours sur la station ' + sessionStorage.nomStationReserver);
				return reservation.closePanelReservation();
			}

		// Si il y a deja une reservation en cours	
			if (sessionStorage.statusReservation === 'true') {
				
					var confirmation = window.confirm('Souhaitez-vous annuler la réservation en cours à ' + sessionStorage.nomStationReserver + ' ?');
					if (confirmation) {
						//this.cancelReservation();
						clearInterval(reservation.decompteId);
						sessionStorage.clear();
						reservation.createReservation();
					} else {
						reservation.closePanelReservation();
					}
				
			}
			else {
				reservation.createReservation();
				//arrêter l'evenement click du button valider
				$('#valide').off('click', this.verifValide);
			}
		}
		
	},

// Crée la réservation et lance le décompte
	createReservation : function() {
		currentStation.dispo--;
		this.webStorage();
		this.setTimer(true);
		this.decompteReservation();
		this.closePanelReservation();
	},

// Annule une réservation
	cancelReservation : function() {
		clearInterval(this.decompteId);
		infosCurrentReservation.setCurrentInfos(false);
		if (currentStation.dispo != undefined) {
			currentStation.dispo++ ;
			currentStation.setStatus();
		}
	},

// Décompte toutes les 1000 millisecondes
	decompteReservation : function() {
		if (this.duree > 0) {
			var reservationEncours = this;
			this.decompteId = setInterval(function() {
				if (reservationEncours.duree <= 0) {
					reservationEncours.cancelReservation();
					sessionStorage.clear();
				} else {
					reservationEncours.duree--;					
					sessionStorage.dureeReservation = reservationEncours.duree;
					reservationEncours.setTimer(false);
					infosCurrentReservation.setCurrentInfos(true);
					currentStation.setStatus();
				}
			}, 1000);
		}
	},

// Verification du rechargement de la page 
	refreshReservation: function() {
		window.addEventListener('load', function () {
			var rechargementPage = this;
			if (sessionStorage.statusReservation === 'true') {
				clearInterval(rechargementPage.decompteId);
				reservation.duree = Number(sessionStorage.dureeReservation);
				reservation.decompteReservation();
			}
		});
	}	
};

