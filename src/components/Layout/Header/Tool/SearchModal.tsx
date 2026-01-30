import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import "../../../../styles/searchnodal.scss"

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchList = [
    { id: 1, name: "What is Dashcode ?" },
    { id: 2, name: "Our Services" },
    { id: 3, name: "Our Team" },
    { id: 4, name: "Our Clients" },
    { id: 5, name: "Our Partners" },
    { id: 6, name: "Our Blog" },
    { id: 7, name: "Our Contact" },
  ];

  const filteredSearchList = searchList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="search-modal__trigger">
        <input
          type="text"
          className="search-modal__trigger-input"
          placeholder="Search for anything"
          onClick={openModal}
          readOnly
        />
        <button className="search-modal__trigger-btn" onClick={openModal}>
          <BiSearch className="search-modal__trigger-icon" />
        </button>
      </div>

      {isOpen && (
        <div className="search-modal">
          <div className="search-modal__overlay" onClick={closeModal}></div>
          <div className="search-modal__panel">
            <div className="search-modal__header">
              <h2 className="search-modal__title">Search</h2>
              <button className="search-modal__close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="search-modal__container">
              <div className="search-modal__input-container">
                <BiSearch className="search-modal__search-icon" />
                <input
                  type="text"
                  className="search-modal__input"
                  placeholder="Search..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="search-modal__options">
                {filteredSearchList.length === 0 && query !== "" ? (
                  <div className="search-modal__no-results">
                    <p>No result found</p>
                  </div>
                ) : (
                  filteredSearchList.map((item) => (
                    <div key={item.id} className="search-modal__option">
                      {item.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;