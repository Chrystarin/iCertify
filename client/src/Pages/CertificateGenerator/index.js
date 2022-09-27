import certificateBodyTemplate from './../../Assets/Images/template.png'
import certificateFooterTemplate from './../../Assets/Images/footer.png'
import './../../Assets/Styles/certificateStyle.css'

function CertificateGenerator() {
  return (
    <div className="CertificateGenerator">
        <h1>Certificate Info</h1>
        <ul>
            <li>Name: <input type="text" id="user_name_input"/></li>
            <li>Role: <input type="text" id="user_role_input"/></li>
            <li>Event: <input type="text" id="event_title_input"/></li>
            <li>Date:  <input type="date" id="event_date_input"/></li>
            <li>QR Content: <input type="text" id="qrcode_input"/></li>
            <button id="btn_generate">Generate</button>
            <a id="download"><button id="btn_download">Download</button></a>
        </ul>

        <div className="certificate" id="certificateContent">
            <div className="main_body">
                <img src={certificateBodyTemplate} alt="certificate body"/> 
                <h1 className="certificate_title">Certificate of Participation</h1>
                <h1 className="user_name" id="user_name">Harold James Castillo</h1>
                <h1 className="user_role" id="user_role">Speaker</h1>
                <h1 className="event_title" id="event_title">UI/UX Design Workshop</h1>
                <h1 className="event_date" id="event_date">2022-10-25</h1>
            </div>
            <div className="footer">
                <img src={certificateFooterTemplate} alt="certificate footer"/>
                <div id="qrcode" className="qrcode"></div> 
            </div>
        </div> 
    </div>
  );
}

export default CertificateGenerator;
