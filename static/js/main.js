(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });




    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    $(document).ready(function () {
        // Function to close the popup
        function closePopup() {
            $('#loginPopup').hide(); // Assuming the popup has an id of 'loginPopup'
        }

        // Event binding for the close button
        $('.close').click(function () {
            closePopup();

        });

        $('#registerButton').on('click', function (event) {
            event.preventDefault();
            openPopup();
        });

        // Event binding for form submission
        // Event binding for form submission
        $('#loginForm').on('submit', function(event) {
            // Prevent default form submission behavior
            event.preventDefault();

           
            validateLoginForm();
        });

        
    });


  
    

    

    function shareOnFacebook() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=https://www.yourwebsite.com/trip-page', '_blank');
    }

    function shareOnTwitter() {
        window.open('https://twitter.com/intent/tweet?url=https://www.yourwebsite.com/trip-page', '_blank');
    }

    function shareOnInstagram() {
        // Instagram doesn't provide direct sharing via URL, so you may need to use an external service or guide users on how to share.
        alert('Sharing on Instagram is not supported directly. You can guide users on how to share manually.');
    }

    new Glide('.glide', {
        type: 'carousel',
        perView: 3,
        focusAt: 'center',
        breakpoints: {
            768: {
                perView: 2
            },
            480: {
                perView: 1
            }
        }
    }).mount();


    document.addEventListener('DOMContentLoaded', function () {
        let slides = document.querySelector('.slides');
        let slideWidth = document.querySelector('.slider-container').offsetWidth;
        let slideIndex = 0;

        function nextSlide() {
            console.log('next slide called')
            slideIndex++;
            if (slideIndex >= slides.children.length) {
                slideIndex = 0;
            }
            updateSlide();
        }

        function updateSlide() {
            console.log('next slide called')
            slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }

        setInterval(nextSlide, 2000); // Change slide every 2 seconds
    });

    function displayPhotoNames(event) {
        const fileList = event.target.files;
        const photoNamesContainer = document.getElementById('photoNames');
        photoNamesContainer.innerHTML = ''; // Clear previous names

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
                const photoName = document.createElement('p');
                photoName.textContent = `Photo ${i + 1}: ${fileList[i].name}`;
                photoNamesContainer.appendChild(photoName);
            }
        } else {
            const noPhotosMsg = document.createElement('p');
            noPhotosMsg.textContent = 'No photos selected.';
            photoNamesContainer.appendChild(noPhotosMsg);
        }
    }

    // Add event listener to file input for photo selection
    document.getElementById('photoInput').addEventListener('change', displayPhotoNames);

    // Show modal when button is clicked
    document.getElementById('uploadBtn').addEventListener('click', function () {
        var myModal = new bootstrap.Modal(document.getElementById('uploadModal'));
        myModal.show();
    });

    // Submit photos
    document.getElementById('submitPhotos').addEventListener('click', function () {
        // Handle photo submission here
        // You can use FormData to send the photos to the server
        // Example: 
        // var formData = new FormData(document.getElementById('photoForm'));
        // Then, send formData using fetch or XMLHttpRequest
    });




    document.addEventListener("DOMContentLoaded", function () {
        const galleryContainer = document.getElementById('gallery');

        // You can add more images dynamically here if needed

        const viewMoreBtn = document.getElementById('viewMoreBtn');
        viewMoreBtn.addEventListener('click', function () {
            const modalGalleryContainer = document.querySelector('#modalGallery .carousel-inner');
            const imagesToAdd = [
                'img/destination-5.jpg',
                'img/destination-6.jpg',
                'img/destination-7.jpg'
                // Add more image URLs here as needed
            ];

            imagesToAdd.forEach(imageUrl => {
                const img = document.createElement('img');
                img.classList.add('d-block', 'w-100');
                img.src = imageUrl;
                img.alt = '';

                const div = document.createElement('div');
                div.classList.add('carousel-item');
                div.appendChild(img);

                modalGalleryContainer.appendChild(div);
            });
        });
    });










})(jQuery);

