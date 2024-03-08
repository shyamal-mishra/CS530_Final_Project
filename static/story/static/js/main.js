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
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
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
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
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
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Get the login form element
  // Function to open the login popup
  function openPopup() {
    $('#loginPopup').fadeIn();
}


// Function to close the login popup
function closePopup() {
    $('#loginPopup').fadeOut();
}

// Event listener to open the popup when the button is clicked
$('#registerButton').on('click', function(event) {
    event.preventDefault();
    openPopup();
});

// Event listener to close the popup when the close button is clicked
$('.close').on('click', closePopup);



document.addEventListener('DOMContentLoaded', function() {
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





                
})(jQuery);

