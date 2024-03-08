$(document).ready(function(){
    // Date and time picker initialization


    // Location search functionality
    $('#location').on('keyup', function(){
        var query = $(this).val().toLowerCase();
        var locations = [
            { name: 'Location 1', image: 'img/glacier.jpg' },
            { name: 'Location 2', image: 'img/grang_canyon.jpg' },
            { name: 'Location 3', image: 'img/tahoe_lake.jpg' }
        ];
        var resultsHtml = '';
        locations.forEach(function(location){
            if(location.name.toLowerCase().includes(query)){
                resultsHtml += '<div class="location-result mb-3">';
                resultsHtml += '<h5>' + location.name + '</h5>';
                resultsHtml += '<img src="' + location.image + '" alt="' + location.name + '" class="img-fluid">';
                resultsHtml += '</div>';
            }
        });
        $('#locationResults').html(resultsHtml);
    });
});
