const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//certificate information
const cert_type = document.getElementById('cert_type')
const user_name_input = document.getElementById('user_name')
const user_role_input = document.getElementById('user_role')
const event_name_input = document.getElementById('event_name')
const event_date_input = document.getElementById('event_date')

//reference buttons
const btn_download = document.getElementById('btn_download')
const btn_generate = document.getElementById('btn_generate')

//Loads certificate template
const cert_template = new Image()
cert_template.src = 'template.png'
cert_template.onload = function () {
	drawImage()
}

//Prints information on the certificate template
function drawImage() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(cert_template, 0, 0, canvas.width, canvas.height)
	ctx.font = '20px monotype corsiva'
	ctx.fillStyle = '#0'

    ctx.fillText(cert_type.value, 100, 60)
    ctx.fillText("is awarded to", 100, 80)
	ctx.fillText(user_name_input.value, 100, 100)
    ctx.fillText("for participating as", 100, 120)
    ctx.fillText(user_role_input.value, 100, 140)
    ctx.fillText("from", 100, 160)
    ctx.fillText(event_name_input.value, 100, 180)
    ctx.fillText("at", 100, 200)
    ctx.fillText(event_date_input.value, 100, 220)
}

//generates certificate
btn_generate.addEventListener('click', function () {
	drawImage()
})

//download function for certificate
btn_download.addEventListener('click', function () {
	btn_download.href = canvas.toDataURL('image/jpg')
	btn_download.download = 'Certificate - ' + user_name_input.value
})
