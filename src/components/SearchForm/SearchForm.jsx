import style from "./SearchForm.module.css";

const SearchForm = ({ onSubmit, defaultValue }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formValue = form.elements.name.value.trim();

    if (formValue) {
      onSubmit(formValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={style.form}
        type="text"
        name="name"
        placeholder="Search for movies..."
        defaultValue={defaultValue}
        aria-label="Movie search"
      />
      <button className={style.formBtn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
