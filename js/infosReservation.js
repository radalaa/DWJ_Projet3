// Objet

var infosReservation = {
	setInfos: function() {
		$('#resa-station-nom').text(currentStation.nom);
		$('#resa-station-adresse').text(currentStation.adresse);
		$('#resa-station-validity').text(reservationValidity + ' min');
	}
};
var viderInfos = {
	NoInfos: function() {
		$('#resa-station-nom').text('');
		$('#resa-station-adresse').text('');
		$('#resa-station-validity').text('');
		$('#name-statu').text('');
		$('#lastname-statu').text('');
	}
};

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
			});
		} else {
			$('#status-reservation').text(infosCurrentReservation.noReserved);
			$('#compteur-reservation').text('');
			$('#cancel').hide()
		}
	}
}