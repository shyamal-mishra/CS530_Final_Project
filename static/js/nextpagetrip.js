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
    
    
    





document.addEventListener("DOMContentLoaded", function() {
    // Flag variable to track if the content has been shown
    var contentShown = false;

    function checkSectionInView() {
        var section = document.getElementById('check-section');
        var container = document.getElementById('right-side-item-container');

        if (section && isElementInViewport(section) && !contentShown) {
            console.log("Section is in view!"); // Debugging: Log when the section is detected in view
            container.classList.remove('hidden');
            // Set contentShown to true once the content is shown
            contentShown = true;
        }

        // Check if the user scrolls to a specific section where you want the content to hide again
        var specificSection = document.getElementById('check1-section');
        if (specificSection && isElementInViewport(specificSection)) {
            console.log("User scrolled to the specific section where the content should hide again.");
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


  


                
})(jQuery);

