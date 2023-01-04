import React from 'react'
import './Table.scss'
function Table() {
  return (
    <div id='Table'>
        <ul>
            <div>
                <p>Event</p>
                <p>Role</p>
                <p>Date</p>
            </div>
            <li>
                <a href="credential/View">
                    <p>[Event Title]</p>
                    <p>[Role]</p>
                    <p>[MM-DD-YYYY]</p>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Table