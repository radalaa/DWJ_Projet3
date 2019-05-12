// Objet

var infosReservation = {
	setInfos: function() {
		$('#resa-station-nom').text(currentStation.nom);
		$('#resa-station-adresse').text(currentStation.adresse);
		$('#resa-station-validity').text(reservationValidity + ' min');
	}
};
