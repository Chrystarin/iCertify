import React,{useState,useEffect} from 'react'
import './SearchInput.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { getAccordionDetailsUtilityClass } from '@mui/material';

import axiosInstance from '../../utils/axios';
import SearchSuggested from './SearchSuggested';
function SearchInput({data,setData}) {
    
  const [institutions, setInstitutions] = useState({});
  const [filteredInstitutions, setFilteredInstitutions] = useState(institutions);
  const keysInstitution = ["name"];

  const [users, setUsers] = useState({});
  
  const [search,setSearch] = useState({
    value:"",
    focus:false,
  })

  useEffect(() => {
    const fetchInstitutions = async () => {
			await axiosInstance
          .get(`/institutions`)
          .then((response) => {
          setInstitutions(response.data);
      });
		};
    fetchInstitutions();

    // searchData(institutions,keysInstitution,search.value.toLocaleLowerCase());
  }, [ search.value]);


  


  
  const searchData = (data, keys) => {
    // return data.filter((item)=>item["name"].toLocaleLowerCase().includes(search));
    return data.filter((item)=>keys.some((key)=>item[key]?.toString().toLowerCase().includes(search.value.toLowerCase())))
  }


  if (!institutions) return "";


  return (
    <div className='SearchInput'>
      <div className='SearchInput__Container'>
        <IconButton aria-label="delete">
          <SearchIcon />
        </IconButton>
        <input 
          type="text" 
          value={search.value} 
          onChange={(e)=> {
            setSearch(search => ({...search,value: e.target.value}));
            setFilteredInstitutions(searchData(institutions, keysInstitution))
            // console.log(institutions.filter((item)=>item["name"].toLocaleLowerCase().includes("sti")))
          
          }}
          onFocus={()=>setSearch(search => ({...search,focus: !search.focus}))} 
          onBlur={()=>setSearch(search => ({...search,focus: !search.focus}))} 
        />
        <div>
          <IconButton aria-label="delete" onClick={()=> setSearch(search => ({...search,value:""}))}>
            <CloseIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <TuneIcon />
          </IconButton>
        </div>
      </div>
      {(search.focus && search.value!== "")|| search.value!==""?<>
        <SearchSuggested institutions={filteredInstitutions}/>
      </>:<></>}
      
    </div>
  )
}

export default SearchInput