import {FcSearch} from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./SearchBar.styled";
import { useState } from "react";


export const  SearchBar = (props) =>{
 const [query, setQuery] = useState('');

const  handleSubmit = evt => {
  evt.preventDefault();

  if (query.trim === '') {
    toast(" Oops! Search query is empty!", {
       icon: "🦄"});
    return;
  }else{
    toast.success("We found some images for you!", {
      icon: "🚀"}); 
  }
  props.onSubmit(query);
  setQuery('');
}; 

 const handleChange = evt => {
  setQuery(evt.target.value)
};
  return(
    <Header>
        <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type="submit">
                <FcSearch size={22}/>
            </SearchFormButton>

            <SearchFormInput
                type="text"
                value={query}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
            />
        </SearchForm>
    </Header>
)
}
    




