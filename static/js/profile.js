function showSection(sectionId) {
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none"; // Hide all sections
    }
    document.getElementById(sectionId).style.display = "block"; // Show the clicked section
}




function showSection(sectionId) {
        var sections = document.getElementsByClassName("section");
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.display = "none"; // Hide all sections
        }
        document.getElementById(sectionId).style.display = "block"; // Show the clicked section
        
        // Reset text color for all options
        var options = document.getElementsByClassName("option");
        for (var i = 0; i < options.length; i++) {
            var h6Element = options[i].querySelector("h6");
            if (h6Element) {
                h6Element.style.color = ""; // Reset text color of <h6> element
            }
        }
        
        // Change text color for clicked option
        var clickedOption = document.querySelector('[data-target="' + sectionId + '"]');
        var h6Element = clickedOption.querySelector("h6");
        if (h6Element) {
            h6Element.style.color = "#86b817"; // Change text color of <h6> element in the active option
            h6Element.classList.add("fade-in"); // Add fade-in class to the <h6> element
            setTimeout(function() {
                h6Element.classList.remove("fade-in"); // Remove fade-in class after a delay
            }, 300); // Adjust the delay as needed to match the transition duration
        }
}

function openPopup() {
    $('#loginPopup').fadeIn();
}


// Function to close the login popup
function closePopup() {
    $('#loginPopup').fadeOut();
}

function closePopup() {
    $('#signupPopup').fadeOut();
}


// Event listener to open the popup when the button is clicked
$('#registerButton').on('click', function(event) {
    event.preventDefault();
    openPopup();
});

// Event listener to close the popup when the close button is clicked
$('.close').on('click', closePopup);

// Event listener to handle form submission when submit button is clicked



function openSignupPopup() {
    var signupPopup = document.getElementById("signupPopup");
    signupPopup.style.display = "block";
}

function openLoginPopup() {
    var loginPopup = document.getElementById("loginPopup");
    loginPopup.style.display = "block";
}

function openResetPassPopup() {
    var resetPassPopup = document.getElementById("resetPassPopup");
    resetPassPopup.style.display = "block";
}



function toggleForms() {
    var loginForm = document.getElementById("loginPopup");
    var signupForm = document.getElementById("signupPopup");

    // Hide the sign-up form if it's visible
    if (signupForm.style.display === "block") {
        signupForm.style.display = "none";
    }
    
    // Show the login form
    loginForm.style.display = "block";
}


$('#signupForm').on('submit', function(event) {
    
   
    // Close the popup after form submission
    
});









function openNewPassPopup(newemail) {
    // Close other popups
    closeAllPopups();

   

    
   console.log('tete', newemail)
    // Show the reset password popup
    var newPassPopup = document.getElementById("newPassPopup");
    newPassPopup.style.display = "block";


    $('#newPassPopupemail').val(newemail);
   
    // Send the email to the server using AJAX
    
}




function openResetPassPopup() {
    // Close other popups
    closeAllPopups();

    var resetPassPopup = document.getElementById("resetPassPopup");
    resetPassPopup.style.display = "block";
}

function openSignupPopup() {
    // Close other popups
    closeAllPopups();

    var signupPopup = document.getElementById("signupPopup");
    signupPopup.style.display = "block";
}

function openLoginPopup() {
    // Close other popups
    closeAllPopups();

    var loginPopup = document.getElementById("loginPopup");
    loginPopup.style.display = "block";
}

function closeAllPopups() {
    var popups = document.getElementsByClassName("popup");
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = "none";
    }
}

function showOTPFieldAndMessage() {
    // Show the OTP input field

    var otpMessage = document.getElementById("otpMessage");
    otpMessage.style.display = "block";

    var otpField = document.getElementById("otpField");
    otpField.style.display = "block";

    // Hide the "Get OTP" button
    var getOTPButton = document.querySelector('input[value="Get OTP"]');
    getOTPButton.style.display = "none";

    

    // Show the "Submit OTP" button
    var submitOTPButton = document.querySelector('input[value="Submit OTP"]');
    submitOTPButton.style.display = "block";
}

function setFormAction() {
    // Set the form's action attribute to "/forgot-password"
    var resetPassForm = document.getElementById("resetPassForm");
    resetPassForm.action = "/forgot-password";
    // Now, submit the form
    resetPassForm.submit();
}


$(document).ready(function() {
    $('#resetPassForm').on('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        
        var email = $('#resetPassPopupemail').val(); // Get email value
      

        $('#otpField').show();

        // Show OTP message indicating that OTP will be sent
        $('#otpMessage').text('OTP will be sent to your email shortly.').show();

        // Hide email field and its associated label
        $('#emailField').hide();
        $('#resetPassForm input[type="submit"]').hide();
        
        $.ajax({
            type: 'POST',
            url: '/forgot-password',
            data: {email: email},
            success: function(response) {
              
                if (response.success) {
                    
                    $('#verifyOtpForm').on('submit', function(e) {
                        e.preventDefault(); // Prevent form submission
                        
                        var otp = $('#otp').val(); // Get OTP value
                        
                        $.ajax({
                            type: 'POST',
                            url: '/verify-otp',
                            data: {email: email, otp: otp},
                            success: function(response) {
                                if (response.success) {
                                    // OTP verification successful, handle accordingly (e.g., redirect)
                                    var email = response.email;
                                    openNewPassPopup(email);
                                } else {
                                    // OTP verification failed, display error message
                                    alert(response.error_message);
                                }
                            },
                            error: function(xhr, status, error) {
                                // Handle error
                                console.error('Error:', error);
                            }
                        });
                    });
                }
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error('Error:', error);
            }
        });
    });
});


