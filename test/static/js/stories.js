$(document).ready(function(){
    // Date and time picker initialization
    $('#datetime').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        icons: {
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
        }
    });

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
