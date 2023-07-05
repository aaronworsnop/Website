document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // disable submit button
    var submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('submit-sending');

    // Get form data
    var formData = new FormData(this);

    // Create AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'mail.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Success and clear form
            alert('Email sent successfully!');
            document.getElementById('contact-form').reset();
        } else {
            var errorMessage = 'An error occurred with the contact pane. Please email me directly instead.';
            if (xhr.status === 500) {
                errorMessage = 'Internal server error. Please try again later or email me directly instead.';
            } else if (xhr.status === 400) {
                errorMessage = 'Bad request. Please check the contact pane and ensure you entered your details correctly.';
            }
            // Display error message to the user
            alert(errorMessage);
        }
        // re-enable submit button
        submitButton.disabled = false;
        submitButton.classList.remove('submit-sending');
    };

    // Send AJAX request with form data
    xhr.send(formData);
});