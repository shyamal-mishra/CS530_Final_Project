$(document).ready(function(){
    // Date and time picker initialization
    $('#datetime').datetimepicker({
        format: 'YYYY-MM-DD',
        icons: {
          
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


document.getElementById('uploadBtn').addEventListener('click', function () {
    var myModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    myModal.show();
});

document.getElementById('submitPhotos').addEventListener('click', function () {
    // Handle photo submission here
    // You can use FormData to send the photos to the server
    // Example: 
    // var formData = new FormData(document.getElementById('photoForm'));
    // Then, send formData using fetch or XMLHttpRequest
});



// Keep track of selected photos
var selectedPhotos = [];

// Add event listener to the upload button
document.getElementById('uploadBtn').addEventListener('click', function() {
    document.getElementById('photoInput').click();
});

// Update preview when photos are selected
document.getElementById('photoInput').addEventListener('change', function() {
    var previewDiv = document.getElementById('photoPreview');
    previewDiv.innerHTML = ''; // Clear previous previews
    
    var files = Array.from(this.files);
    files.forEach(function(file) {
        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100px'; // Adjust preview size
        img.style.maxHeight = '100px'; // Adjust preview size
        previewDiv.appendChild(img);
        selectedPhotos.push(file); // Store selected photos
    });
    
    // Show the final submit button when photos are selected
    document.getElementById('finalSubmitButton').style.display = 'block';
});

// Handle form submission
document.getElementById('photoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    // Submit form data including selected photos
    var formData = new FormData(this);
    selectedPhotos.forEach(function(file) {
        formData.append('photos', file);
    });
    
    // Example: send formData to the server using fetch or XMLHttpRequest
    fetch('/submit-photos', {
        method: 'POST',
        body: formData
    }).then(function(response) {
        // Handle response
    }).catch(function(error) {
        // Handle error
    });
});
