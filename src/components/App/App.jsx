import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
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
import { getItems, addItem, deleteCard, addCardLike, removeCardLike} from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal";
import * as auth from "../../utils/auth";
import Register from "../RegisterModal/RegisterModal";
import Login from "../LoginModal/LoginModal";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

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
    deleteCard(card._id)
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

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleRegisterClick = () => {
    setActiveModal("signup");
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

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .signUp({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
        handleModalClose();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const [isLoggedIn, setIsLoggedIn] = useState("");
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signIn({ email, password })
      .then((res) => {
        setToken(res.token);
        return auth.getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user.data);
        setIsLoggedIn(true);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const handleUpdateUser = (data) => {
    auth
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res.data);
        handleModalClose();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = getToken();

    !isLiked
      ? addCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (values) => {
    const jwt = getToken();
    addItem(values, jwt)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem.data, ...clothingItems]);
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <AppContext.Provider value={{ isLoggedIn }}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
                   <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                handleRegisterClick={handleRegisterClick}
                handleLoginClick={handleLoginClick}
                weatherLocation={weatherLocation}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      weatherTemp={temp}
                      handleCardClick={handleCardClick}
                      defaultClothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        defaultClothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleEditClick={handleEditClick}
                        onCardLike={handleCardLike}
                        handleLogOut={handleLogOut}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              </Routes>
              <Footer />
            </div>
            {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                closeActiveModal={handleModalClose}
                handleAddItem={handleAddItem}
                isLoading={isLoading}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                isOpen={activeModal === "preview"}
                card={selectedCard}
                closeActiveModal={handleModalClose}
                handleDeleteClick={handleDeleteCardClick}
              />
            )}
            {activeModal === "delete-confirmation" && (
              <DeleteModal
              item={selectedCard}
              isOpened={activeModal === "delete-confirmation"}
              closeActiveModal={handleModalClose}
              handleDeleteItem={handleDeleteCard}
              selectedCard={selectedCard}
              handleCloseClick={handleModalClose}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
          {activeModal === "signup" && (
            <Register
              isOpen={activeModal === "signup"}
              closeActiveModal={handleModalClose}
              handleRegistration={handleRegistration}
              handleLoginClick={handleLoginClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "login" && (
            <Login
              isOpen={activeModal === "login"}
              closeActiveModal={handleModalClose}
              isLoading={isLoading}
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              handleModalClose={handleModalClose}
              updateUser={handleUpdateUser}
              isLoading={isLoading}
            />
          )}
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;