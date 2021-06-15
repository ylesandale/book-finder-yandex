import React from "react";

interface SearchFormProps {
  value: string;
  setValue(e: React.ChangeEvent<HTMLInputElement>): void;
  onGetBooks(): void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ value, setValue, onGetBooks, loading }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="search">
      <input
        value={value}
        onChange={(e) => setValue(e)}
        placeholder="Введите название книги"
        type="text"
        className="search__field"
      />
      <button disabled={loading} onClick={onGetBooks} type="submit" className="search__button">
        {!loading ? "Найти книгу" : "Идёт поиск книг..."}
      </button>
    </form>
  );
};

export default SearchForm;
