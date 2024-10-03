// import { useEffect, useState } from "react";
// import "./App.css";
// import { coordinates, APIkey } from "../../utils/constants";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import Main from "../Main/Main";
// import ModalWithForm from "../ModelWithForm/ModalWithForm";
// import ItemModal from "../ItemModal/ItemModal";
// import { getWeather, filterWeatherData } from "../../utils/weatherApi";

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: "",
//     temp: { F: 99 },
//     city: "",
//   });
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});

//   const handleCardClick = (card) => {
//     setActiveModal("preview");
//     setSelectedCard(card);
//   };

//   const handleAddClick = () => {
//     setActiveModal("add-garment");
//   };

//   const closeActiveModal = () => {
//     setActiveModal("");
//   };

//   useEffect(() => {
//     getWeather(coordinates, APIkey)
//       .then((data) => {
//         const filteredData = filterWeatherData(data);
//         setWeatherData(filteredData);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="page">
//       <div className="page__content">
//         <Header handleAddClick={handleAddClick} weatherData={weatherData} />
//         <Main weatherData={weatherData} handleCardClick={handleCardClick} />
//       </div>
//       <ModalWithForm
//         isOpen={activeModal === "add-garment"}
//         title="New garment"
//         buttonText="Add garment"
//         activeModal={activeModal}
//         onClose={closeActiveModal}
//       >
//         <label htmlFor="name" className="modal__label">
//           Name
//           <input
//             type="text"
//             className="modal__input"
//             id="name"
//             placeholder="Name"
//           />
//         </label>
//         <label htmlFor="imageUrl" className="modal__label">
//           Image
//           <input
//             type="text"
//             className="modal__input"
//             id="imageUrl"
//             placeholder="Image Url"
//           />
//         </label>
//         <fieldset className="modal__radio-buttons">
//           <legend className="modal__legend">Select the weather type:</legend>
//           <label htmlFor="hot" className="modal__label modal__label-type-radio">
//             <input id="hot" type="radio" name="modal__radio-input" /> Hot
//           </label>
//           <label
//             htmlFor="warm"
//             className="modal__label modal__label-type-radio"
//           >
//             <input id="warm" type="radio" name="modal__radio-input" /> Warm
//           </label>
//           <label
//             htmlFor="cold"
//             className="modal__label modal__label-type-radio"
//           >
//             <input id="cold" type="radio" name="modal__radio-input" /> Cold
//           </label>
//         </fieldset>
//       </ModalWithForm>
//       <ItemModal
//         activeModal={activeModal}
//         card={selectedCard}
//         onClose={closeActiveModal}
//       />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import Footer from "../Footer/Footer";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, postItems, deleteItems } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleAddItem = (item) => {
    return addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleModalClose();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteCard = (card) => {
    deleteItems(card._id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        setSelectedCard({});
        handleModalClose();
      })
      .catch(console.error);
  };
  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
        handleModalClose();
      }

      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        handleModalClose();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            clothingItems={clothingItems}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          handleModalClose={handleModalClose}
          isOpen={activeModal === "add-garment"}
          handleAddItem={handleAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleModalClose}
          confirmDeleteModal={handleDeleteCardClick}
        />
        <DeleteModal
          activeModal={activeModal}
          onClose={handleModalClose}
          handleDeleteCard={handleDeleteCard}
          selectedCard={selectedCard}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;


