
// Tableau contenant les données du diaporama
var slides = [
    {
        url: "range-velo.jpg",
        title: "Bienvenue sur BikeRideMarseille",
        text: "Réserver un vélo n'a jamais été aussi facile !"
    },
    {
        url: "site-00.jpg",
        title: "Comment ça marche ?",
        text: "Pour utiliser l'appli BikeRideMarseille, il suffit de suivre les différentes étapes."
    },
    {
        url: "site-01.jpg",
        title: "1. Choisir votre station",
        text: "Avec l'appli BikeRideMarseille, vous sélectionnez votre station à l'aide d'un marqueur sur la map.<br />De plus, la zone de recherche vous permet d'affiner la localité de la station recherchée."
    },
    {
        url: "site-02.jpg",
        title: "2. Valider la réservation",
        text: 'Une fois la station choisie, il ne reste plus qu\'à valider la réservation.<br />Pour cela, il suffit de signer la réservation dans la zone prévue à cet effet et d\'appuyer sur "Valider".'
    },
    {
        url: "site-03.jpg",
        title: "3. Réservation en cours",
        text: "Retrouvez toutes les informations concernant votre réservation en cours,<br />ainsi que la possibilité de l'annuler à tout moment."
    }
];


// variable globales

var apiKey = 'a468b75d2e248e37c78bf71df6331d85cfbc25c7';
var contrat = 'Marseille';
var reservationValidity = 20; //Durée d'une réservation en minute
$('#infos-reservation').hide(); // masque le bloc station choisie

//---------------------------------------------------------------------------------//

// Objet Slider1 instancié de Diaporama
var Slider1 = Object.create(Diaporama);
Slider1.initDiapo('diaporama', slides);
Slider1.eventsDiapo();

//------------------------------------------------------------------------------------//
$('.burger').on('click', function () {
    $(this).toggleClass('open');
});

$('.burger').on('touch', function () {
    $(this).toggleClass('open');
});


// Appel des differents objets

reservation.refreshReservation();  // Vérification en cas de refresh de la page
stations.recupAllStations();  // Récupération de toutes les stations et appel de la Map
infosCurrentReservation.setCurrentInfos();  // Affichage dans le footer de la réservation en cours
