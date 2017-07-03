// Contact Form Scripts

var COMMENT_PLACEHOLDER = "Any questions or special requirements (high chairs for babies, parking...)";

$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

var form = $('form[name=sendRsvp]');
var successMessage = $('#rsvpResponse');

$("#message").attr("placeholder", COMMENT_PLACEHOLDER);

$("#entry1011176109yes, #entry1011176109no").on('change', function() {
  if ($("#entry1011176109no:checked").val() == "No") {
    $(".hide-if-declined").hide(200);
    $("#message").attr("placeholder", "Personal message, creative excuse...");
  } else {
    $(".hide-if-declined").show(200);
    $("#message").attr("placeholder", COMMENT_PLACEHOLDER);
  }
});

form.on('submit', function() {
  $("#rsvpSubmit").text("Sending...").attr("disabled", "disabled");

  var accepted = $("#entry1011176109yes:checked").val() == "Yes";

  if (accepted) {
    $("#replyMessage").html("We are honoured you have accepted our invitation <br/>and we look forward to seeing you at the wedding!");
  } else {
    $("#replyMessage").html("We regret that you won't be able to attend the wedding.<br/> We hope to see you in not-too-distant future.");
  }
})

$("#hidden_iframe").on('load', function() {
  $('html, body').stop().animate({
      scrollTop: ($("#rsvp").offset().top - 50)
  }, 750, 'easeInOutExpo');

  form.stop().animate({ height: "hide", opacity: "hide"});
  successMessage.stop().animate({ height: "show", opacity: "show"});
});

$('#resetForm').on('click', function() {
  $("#rsvpSubmit").text("Send RSVP").removeAttr("disabled");
  form.trigger("reset");
  form.animate({ height: "show", opacity: "show"});
  successMessage.animate({ height: "hide", opacity: "hide"});
  $(".hide-if-declined").show();
  $("#message").attr("placeholder", COMMENT_PLACEHOLDER);
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
