// Added this function so download button only needs one click
// function autoClick(){
//     $("#download").click();
// }

$(document).ready(function(){
    var element = $("#certificateContent");

    // Triggers button to Generate Certificate
    $("#btn_generate").click(function () {

      // Replace Certificate Text Content
      $('#user_name').html($('#user_name_input').val());
      $('#user_role').html($('#user_role_input').val());
      $('#event_title').html($('#event_title_input').val());
      $('#event_date').html($('#event_date_input').val());

      // Clear Previous QR Code
      $('#qrcode').empty();

      //Generates QR Code
      $('#qrcode').qrcode({text: $('#qrcode_input').val()});
    });

    // Triggers button to Download Certificate
    $("#download").on('click', function(){

      //Renders HTML Div to Canvas then to Image
      html2canvas(element, {
        onrendered: function(canvas) {
          var imageData = canvas.toDataURL("image/jpg");
          var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
          $("#download").attr("download", "Certificate.png").attr("href", newData);
        }
      });
    });
});