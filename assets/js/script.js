var trigger_status = false;
function checkChange($this, index) {
  var regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var regex_phone = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  var regex_name = /^([a-zA-Z' ]+)$/;
  var value = $this.val();
  var field_type = $this.attr("name");
  var prevVal = $this.data("prevVal");

  if (field_type == "name") {
    var validName = regex_name.test(value);
    console.log(validName);
    if (!validName) {
      jQuery(".form-text").eq(index).text("Enter a valid Name");
      trigger_status = false;
    } else if (value === "") {
      jQuery(".form-text").eq(index).text("Cannot be empty");
      trigger_status = false;
    } else if (value == prevVal) {
      jQuery(".form-text").eq(index).empty();
      trigger_status = false;
    } else {
      trigger_status = true;
      jQuery(".form-text").eq(index).empty();
    }
  }
  // email validation //
  if (field_type == "email") {
    var validEmail = regex_email.test(value);
    if (!validEmail) {
      jQuery(".form-text").eq(index).text("Enter a valid Email");
      trigger_status = false;
    } else if (value == "") {
      jQuery(".form-text").eq(index).text("Cannot be empty");
      trigger_status = false;
    } else if (value == prevVal) {
      jQuery(".form-text").eq(index).empty();
      trigger_status = false;
    } else {
      trigger_status = true;
      jQuery(".form-text").eq(index).empty();
    }
  }

  if (field_type == "address") {
    if (value === "") {
      jQuery(".form-text").eq(index).text("Cannot be empty");
      trigger_status = false;
    } else if (value == prevVal) {
      jQuery(".form-text").eq(index).empty();
      trigger_status = false;
    } else {
      trigger_status = true;
      jQuery(".form-text").eq(index).empty();
    }
  }

  // phone validation //
  if (field_type == "phone") {
    var validPhone = regex_phone.test(value);
    if (!validPhone) {
      jQuery(".form-text").eq(index).text("Enter a valid Phone No");
      trigger_status = false;
    } else if (value === "") {
      jQuery(".form-text").eq(index).text("Cannot be empty");
      trigger_status = false;
    } else if (value.toLowerCase() == prevVal.toLowerCase()) {
      jQuery(".form-text").eq(index).empty();
      trigger_status = false;
    } else {
      trigger_status = true;
      jQuery(".form-text").eq(index).empty();
    }
  }
}

jQuery(document).ready(function () {
  jQuery(".loading").hide();
  jQuery(".updateProfileBtn").prop("disabled", true);

  jQuery(document).on("click", "input.disabled-box", function () {
    var index = jQuery("input.disabled-box").index(this);
    console.log(index);
    jQuery("input.disabled-box")
      .eq(index)
      .data("prevVal", jQuery("input.disabled-box").eq(index).val());
    jQuery("input.disabled-box")
      .eq(index)
      .bind("keyup", function () {
        checkChange(jQuery(this), index);
        if (!trigger_status) {
          jQuery(".updateProfileBtn").prop("disabled", true);
        } else {
          jQuery(".updateProfileBtn").prop("disabled", false);
        }
      });
  });

  jQuery(document).on("click", ".liked-btn", function () {
    var post_id = jQuery(this).attr("post-id");
    var button_index = jQuery(".liked-btn").index();
    var like;
    $(this).eq(button_index).prop("disabled", true);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: {
        action: "add_like_react",
        post_id: post_id,
      },
      success: function (response) {
        console.log(response);
        like = response.like;
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
  });

  jQuery(document).on("click", ".comment-send", function () {
    var post_id = jQuery(this).attr("post-id");
    var comment_data = jQuery(this)
      .parents(".panel-default")
      .find(".post-comment1")
      .val();
    console.log(comment_data);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: {
        action: "add_comment",
        post_id: post_id,
        comment_data: comment_data,
      },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
  });

  jQuery(document).on("click", ".postUploadBtn", function () {
    jQuery(".loading").show();
    var post_file = jQuery(".post_file")[0].files;
    var post_caption = jQuery(".post_caption").val();

    var formdata = new FormData();

    formdata.append("action", "upload_post_action");
    formdata.append("post_file", post_file[0]);
    formdata.append("post_caption", post_caption);

    console.log(post_file[0]);
    console.log(post_caption);

    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
        if (response.status) {
          jQuery(".loading").hide();
          jQuery(".close_modal").click();
        }
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
  });

  jQuery(document).on("click", ".updateProfileBtn", function () {
    var name = jQuery("#updateName").val();
    var email = jQuery("#updateEmail").val();
    var phone = jQuery("#updatePhone").val();
    var address = jQuery("#updateAddress").val();
    var gender = jQuery("input[name='gender']:checked").val();

    var formdata = new FormData();

    formdata.append("action", "update_data");
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("address", address);
    formdata.append("gender", gender);

    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
    jQuery(this).prop("disabled", true);
  });

  jQuery(document).on("click", ".add_friend_btn", function () {
    var people_id = jQuery(this).attr("data-id");
    console.log(people_id);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: {
        action: "add_friend_action",
        people_id: people_id,
      },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  });

  jQuery(document).on("click", ".btn-accept", function () {
    var sender_id = jQuery(this).attr("data-rqst-sender-id");
    console.log(sender_id);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: {
        action: "accept_action",
        sender_id: sender_id,
      },
      success: function (response) {
        console.log(response);
        if (response.status) {
          console.log("working");
        }
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
    jQuery(this).parents("li.user_item").hide();
  });

  jQuery(document).on("click", ".comment-btn", function () {
    var index = jQuery(".comment-btn").index(this);
    jQuery(".post-comment").eq(index).slideToggle();
  });

  jQuery(document).on("click", ".btn-reject", function () {
    var sender_id = jQuery(this).attr("data-rqst-sender-id");
    console.log(sender_id);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: {
        action: "reject_action",
        sender_id: sender_id,
      },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
  });

  jQuery(document).on("change", ".imgUploadBtn", function () {
    var user_id = jQuery(this).attr("data-id");
    var image_file = jQuery(".imgUploadBtn")[0].files;
    console.log(image_file);

    var formdata = new FormData();
    formdata.append("action", "upload_image_action");
    formdata.append("user_id", user_id);
    formdata.append("image_file", image_file[0]);

    console.log(formdata);
    console.log(image_file[0]);
    jQuery.ajax({
      url: "http://localhost/social-media/response-data.php",
      type: "POST",
      cache: false,
      dataType: "JSON",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
        jQuery(".profile-image, .header-profile-image").attr(
          "src",
          response.image
        );
      },
      error: function (xhr, status, error) {
        //var err = eval("(" + xhr.responseText + ")");
        console.log(error);
      },
    });
  });

  jQuery(document).on("click", ".chat_bubble", function () {
    jQuery(".chat_window_section").slideToggle();
  });

  jQuery(document).on(
    "click",
    ".chat_window_section > ul.friend-list > li",
    function () {
      jQuery(this).parent("ul.friend-list").find("li").not(this).hide();
      jQuery(this).addClass("active");
      jQuery(".chat_box").slideDown();
    }
  );

  jQuery(document).on("click", ".chat-send-btn", function () {
    var chat_request = jQuery(this).parents(".chat_box").find("input").val();
    jQuery(this).parents(".chat_box").find("input").val('');

    jQuery(".chat_box_message").append(
      '<p class="small p-2 m-3  text-white rounded-5 bg-primary w-50">' + chat_request + "</p>"
    );
  });
});
