import React, { useState } from 'react';
import './SearchInput.scss';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
function SearchSuggested({institutions}) {
    console.log(institutions)
    const [stepper, setStepper] = useState("institutions");
    console.log(institutions.length)
    return <>
        <div className='SearchSuggested'>
            <div className='SearchSuggested__SetterNavigation'>
              {/* <Chip  id={stepper==="users"?"active":""} label={typeof users.length === "undefined"? `Users (0)`: `Users (${users.length})`} variant="outlined" onClick={()=>setStepper("users")}/> */}
                <Chip  id={stepper==="institutions"?"active":""} label={typeof institutions.length === "undefined"?  `Institutions (0)`:`Institutions (${institutions.length})`}variant="outlined" onClick={()=>setStepper("institutions")}/>
            </div>
            <hr />
            <ul>
                {stepper === "institutions"?<>
                    {institutions.length > 0 &&
                        institutions.map((item) => {
                        return <>
                            <li key={item.id}>
                                <a href={`/institutions/${item.walletAddress}`}>
                                    <Avatar src={item.photos?.profile ? item.photos?.profile : null} />
                                    <p className="BodyText3">{item.name}</p>
                                </a>
                            </li>
                        </>
                    })}
                    {institutions.length===0?<>
                        No input
                    </>:""}
                </>:<></>}
            </ul>
        </div>
    </>
}

export default SearchSuggested