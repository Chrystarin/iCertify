const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//certificate information
const user_name_input = document.getElementById('user_name')
const user_role_input = document.getElementById('user_role')
const event_name_input = document.getElementById('event_name')
const event_date_input = document.getElementById('event_date')

const qrcode_input = document.getElementById('qrcode_input')

//reference buttons
const btn_download = document.getElementById('btn_download')
const btn_generate = document.getElementById('btn_generate')

//Loads certificate template
const cert_template = new Image()
const cert_footer = new Image()
const cert_footer_qr = new Image()

cert_template.src = 'template.png'
cert_template.onload = function () {
	drawImage()
}

cert_footer.src = 'footer.png'
cert_footer.onload = function () {
	drawImage()
}

cert_footer_qr.src = 'qr.png'
cert_footer_qr.onload = function () {
	drawImage()
}

//Prints information on the certificate template
function drawImage() {
    //Print the images and template
	ctx.drawImage(cert_template, 0, 0, canvas.width, (canvas.height-75))
    ctx.drawImage(cert_footer, 0, (canvas.height-75), canvas.width, 75)
    ctx.drawImage(cert_footer_qr, ( canvas.width-80), (canvas.height-70), 60, 60)

    //Set font style
	ctx.font = '30px monotype corsiva'
	ctx.fillStyle = '#0'
    ctx.textAlign = "center";

    //Print text info
    ctx.fillText(user_name_input.value, 380, 250)
    ctx.fillText(user_role_input.value + " at " + event_name_input.value, 380, 325)
    ctx.fillText("Received: " + event_date_input.value, 380, 375)
}

//generates certificate
btn_generate.addEventListener('click', function () {
	cert_footer_qr.src = 'https://chart.googleapis.com/chart?cht=qr&chl=' + qrcode_input.value + '&chs=160x160&chld=L|0'
    //cert_footer_qr.src=new QRCode(qrcode_input.value);
    drawImage()
})  

//download function for certificate
btn_download.addEventListener('click', function () {
	//btn_download.href = canvas.toDataURL('image/png')

    btn_download.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	btn_download.download = 'Certificate - ' + user_name_input.value
})

