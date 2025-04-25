import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({onSubmit}) => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = event => setInputValue(event.target.value);

    const handleSubmit = event => {
    event.preventDefault();
    if (inputValue === ""){
        return;
    }
    onSubmit(inputValue);
    setInputValue('');
    
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange}/>
        <button type='submit' className={css.SearchBtn}>Search</button>
    </form>
    </>
  )
}

export default SearchBar