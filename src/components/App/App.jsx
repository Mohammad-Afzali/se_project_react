import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
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
    return postItems(item)
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
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
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
                  handleCardClick={handleCardClick}
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
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={handleModalClose}
          isOpen={activeModal === "add-garment"}
          handleAddItem={handleAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleModalClose}
          handleDeleteClick={handleDeleteCardClick}
        />
        <DeleteModal
          item={selectedCard}
          isOpened={activeModal === "delete-confirmation"}
          onClose={handleModalClose}
          handleDeleteItem={handleDeleteCard}
          selectedCard={selectedCard}
          handleCloseClick={handleModalClose}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;


