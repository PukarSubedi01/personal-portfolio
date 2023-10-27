function validateForm() {
  const name = $("#name").val();
  const email = $("#email").val();
  const subject = $("#subject").val();
  const message = $("#message").val();

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Initialize error message variable
  let errorName, errorEmail, errorMessage, errorSubject;

  // Validate Name
  if (name === "") {
    errorName = "Name is required.\n";
    $("#errorName").html("<span class='error' >Name is required. </span>");
    return false;
  } else {
    $("#errorName").html("");
  }

  // Validate Email
  if (email === "") {
    $("#errorEmail").html("<span class='error' >Email is required. </span>");
    return false;
  } else if (!email.match(emailRegex)) {
    $("#errorEmail").html("<span class='error' >Invalid email format. </span>");
    return false;
  } else {
    $("#errorEmail").html("");
  }

  // Validate Subject
  if (subject === "") {
    $("#errorSubject").html(
      "<span class='error' >Subject is required. </span>"
    );
    return false;
  } else {
    $("#errorSubject").html("");
  }

  // Validate Message
  if (message === "") {
    $("#errorMessage").html(
      "<span class='error' > Message is required </span>"
    );
    return false;
  } else {
    $("#errorMessage").html("");
  }

  // Display error message if there are validation errors

  // If form is valid, send an AJAX request
  const date = new Date();
  const messageId = date.getTime();
  $.ajax({
    type: "POST",
    url: "https://xmtutnswfa.execute-api.us-east-1.amazonaws.com/v1/contact-me",

    data: JSON.stringify({
      name,
      email,
      subject,
      message,
    }),

    cache: false,
    success: function (response) {
      // Display the success message
      $("#success").html(
        "<span class='success' > Message sent successfully.</span>"
      );
      document.getElementById("contactForm").reset();
      return true;
    },
    error: function (error) {
      // Display an error message if the request fails
      $("#error-message").html(
        "<span class='error' > An error occurred while processing your request.</span>"
      );
    },
  });
  return false;
  // Prevent the default form submission
}

// Add form submission event listener

$("form").submit((e) => {
  e.preventDefault();
  if (!validateForm()) {
    e.preventDefault(); // Prevent form submission if validation fails
  }
});
