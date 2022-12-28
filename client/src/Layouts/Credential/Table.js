import React from 'react'
import '../../Assets/Styles/Components/style-Table.scss'
function Table() {
  return (
    <div id='Table'>
        <ul>
            <div>
                <p>Name</p>
                <p>Event</p>
                <p>Event</p>
            </div>
            <li>
                <a href="credential/View">
                    <p>Art & Design Certificate</p>
                    <p>Art & Design Training</p>
                    <p>Oct 2, 2001</p>
                </a>
            </li>
            <li>
                <a href="/">
                    <p>Certificate of Completion</p>
                    <p>The Future of Money, Governance, & the Law</p>
                    <p>Oct 17, 2022</p>
                </a>
            </li>
            <li>
                <a href="/">
                    <p>Certificate of Completion</p>
                    <p>Blockchain Introducton 101</p>
                    <p>Nov 26, 2021</p>
                </a>
            </li>
            <li>
                <a href="/">
                    <p>Certificate of Completion</p>
                    <p>What is the internet?</p>
                    <p>Nov 5, 2021</p>
                </a>
            </li>
            <li>
                <a href="/">
                    <p>Respect me and I respect you</p>
                    <p>Event</p>
                    <p>Nov 25, 2022</p>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Table