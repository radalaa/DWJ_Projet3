var infosCurrentReservation = {
		reserved:'Vous avez une réservation en cours à la station :',
		noReserved: 'Aucune réservation en cours',

	setCurrentInfos: function(reserved) {
		if (reserved === true) {
			$('#name-statu').text(sessionStorage.NomClient);
			$('#lastname-statu').text(sessionStorage.PrenomClient);
			$('#status-reservation').text(infosCurrentReservation.reserved).append(' <span>' + sessionStorage.nomStationReserver + '</span>');
			$('#compteur-reservation').text('Votre réservation expirera dans ').append(' <span>' + reservation.dureeMinutes + 'mn et ' + reservation.dureeSecondes + 'sec</span>');
			$('#cancel').show().on('click', function() {
				reservation.duree = 0;
				//vider sessionStorage
				sessionStorage.clear();
			});
		} else {
			$('#status-reservation').text(infosCurrentReservation.noReserved);
			$('#compteur-reservation').text('');
			$('#cancel').hide()
		}
	}
}