import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';
import Loading from "../../components/Loading/Loading";
const MemberView = (props) => {
  const { id } = useParams()
  const [member, setMember] = useState(props)

  useEffect(() => {
      const fetchMember = async () => {
          const response  = await fetch(`http://localhost:6787/members/${id}`)

          const json = await response.json()

          if(response.ok){
            setMember(json)
          }
      }

      fetchMember()
  }, [])

  if(!member) return <Loading/>

  async function isConnected() {
    const accounts = await window.ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
       console.log(`You're connected to: ${accounts[0]}`);
    } else {
       console.log("Metamask is not connected");
    }
  }

  return (
    <div>
        Wallet Address: {member.walletAddress} <br/>
        isStillAccountCreation: {member.isStillAccountCreation} <br/>
        isPremium: {member.isPremium} <br/>
        {/* firstName: {member.name.firstName}
        middleName: {member.name.middleName}
        lastName: {member.name.lastName}
        extension: {member.name.extension} */}
        about: {member.about} <br/>
        occupation: {member.occupation} <br/>
        {/* mobile: {member.contact.mobile}
        telephone: {member.contact.telephone} */}
    </div>
  )
}

export default MemberView