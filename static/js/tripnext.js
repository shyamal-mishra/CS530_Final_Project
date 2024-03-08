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


   




    document.addEventListener("DOMContentLoaded", function () {
        // Flag variable to track if the content has been shown
        var contentShown = false;

        function checkSectionInView() {
            var section = document.getElementById('check-section');

            var container = document.getElementById('right-side-item-container');

            if (section && isElementInViewport(section) && !contentShown) {
                // Debugging: Log when the section is detected in view
                container.classList.remove('hidden');
                // Set contentShown to true once the content is shown
                contentShown = true;
            }

            // Check if the user scrolls to a specific section where you want the content to hide again
            var specificSection = document.getElementById('check1-section');
            if (specificSection && isElementInViewport(specificSection)) {

                // Reset the contentShown flag to hide the content again
                contentShown = false;
                container.classList.add('hidden');
            }
        }

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        window.addEventListener('scroll', checkSectionInView);
    });


    $(document).ready(function () {
        // Function to show the pop-up box
        function showPopup() {
            $('#popup').fadeIn();
            // Hide the pop-up box after 5 seconds (5000 milliseconds)
            setTimeout(function () {
                hidePopup(); // Call hidePopup function after 5 seconds
            }, 2000); // 5000 milliseconds = 5 seconds
        }

        // Function to hide the pop-up box with fade out effect
        function hidePopup() {
            $('#popup').fadeOut();
        }





        $('.book-now__buttons').click(function () {

            // Retrieve trip name and date dynamically from HTML elements
            var tripName = $('#tripName').text(); // Get the text content of the element with ID "tripName"
            var tripDate = $('#tripDate').text(); // Get the text content of the element with class "book-now__editorial" inside the container with ID "tripDateContainer"

            // Prepare trip details object
            var tripDetails = {
                tripName: tripName,
                date: tripDate,
                // Add more details as needed
            };


            // Send trip details to the server
            $.ajax({
                type: 'POST',
                url: '/save-trip-details', // Endpoint to handle saving trip details
                data: { tripName: tripName, date: tripDate },
                success: function (response) {
                    if (response.success) {
                        // Handle success

                        showPopup();
                    } else {
                        // Handle failure
                        openLoginPopup();
                        // For example, display an error message to the user
                    }
                },
                error: function (xhr, status, error) {
                    // Handle error response
                    openLoginPopup();
                }
            });
        });
    });


    function openLoginPopup() {
        // Get the login popup element
        var loginPopup = document.getElementById('loginPopup');

        // Display the login popup
        loginPopup.style.display = 'block';
    }



})(jQuery);

