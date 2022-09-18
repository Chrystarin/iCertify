const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//certificate information
const certificate_full = document.getElementById('certificate')

const user_name_input = document.getElementById('user_name')
const event_name_input = document.getElementById('event_name')
const qrcode_input = document.getElementById('qrcode_input')

const cert_user_name = document.getElementById('user_fullname')
const cert_event_title = document.getElementById('event_title')

//reference buttons
const btn_download = document.getElementById('btn_download')
const btn_generate = document.getElementById('btn_generate')

//generates certificate
btn_generate.addEventListener('click', function () {
	document.getElementById('user_fullname').innerHTML = user_name_input.value;
    document.getElementById('event_title').innerHTML = event_name_input.value;
    alert("test"+qrcode_input.value);
    QRCode(document.getElementById("qrcode"), qrcode_input.value);
})  

// //download function for certificate
// btn_download.addEventListener('click', function () {
// 	//btn_download.href = canvas.toDataURL('image/png')

//     //btn_download.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
// 	//btn_download.download = 'Certificate - ' + user_name_input.value
//     //alert("test");
//     printToFile(certificate_full);

// })


// //Creating dynamic link that automatically click
// function downloadURI(uri, name) {
//     var link = document.createElement("a");
//     link.download = name;
//     link.href = uri;
//     link.click();
//     //after creating link you should delete dynamic link
//     //clearDynamicLink(link); 
// }

// //Your modified code.
// function printToFile(certificate_full) {
//     html2canvas(certificate_full, {
//         onrendered: function (canvas) {
//             var myImage = canvas.toDataURL("image/png");
//             //create your own dialog with warning before saving file
//             //beforeDownloadReadMessage();
//             //Then download file
//             downloadURI("data:" + myImage, "yourImage.png");
//         }
//     });
// }

// function autoClick(){
//     $("#btn_download").click();
//   }

//   $(document).ready(function(){
//     var element = $("#certificate_full");

//     $("#btn_download").on('click', function(){

//       html2canvas(element, {
//         onrendered: function(canvas) {
//           var imageData = canvas.toDataURL("image/jpg");
//           var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
//           $("#btn_download").attr("btn_download", "image.jpg").attr("href", newData);
//         }
//       });

//     });
//   });
