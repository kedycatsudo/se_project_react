import { useEffect, useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, apiKey } from '../utils/constants';
import Footer from './Footer';
import currentTemperatureUnitContext from '../contexts/CurrentTemperatureUnitContext';
import AddItemModal from './AddItemModal';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import DeleteItemModal from './DeleteItemModal';
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from '../utils/api';
import RegisterModal from './RegisterModal';
import LoginModal from './Login';
import EditProfileModal from './EditProfileModal';
import { getUser, signup, signin, updateUser } from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
    condition: '',
    isDay: null,
  });
  const [activeModal, setActiveModal] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = !!currentUser; // new
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };
  const handleSwitchAuthModal = (modalType) => setActiveModal(modalType);
  function handleEditProfileOpen() {
    setIsEditProfileOpen(true);
  }
  const handleRequestDelete = () => {
    setIsDeleteModalOpen(true);
    closeModal();
  };

  function handleEditProfileClose() {
    setIsEditProfileOpen(false);
  }
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (!token) return; // or handle unauthenticated

    const likePromise = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    likePromise
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };
  function handleUpdateProfile({ name, avatar }) {
    setIsProfileUpdating(true);
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // update context immediately
        setIsEditProfileOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsProfileUpdating(false));
  }
  function handleRegister(data) {
    signup(data)
      .then(() => {
        // Auto-login after registration
        return signin({ email: data.email, password: data.password });
      })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
        closeModal();
        return getUser(res.token);
      })
      .then((userData) => setCurrentUser(userData))
      .catch(console.error);
  }
  function handleLogin(data) {
    signin(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
        setLoginError(''); // Clear errors on success
        closeModal();
        return getUser(res.token);
      })
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        setLoginError('Incorrect email or password'); // Set your error message here
      });
  }

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };
  const closeModal = () => {
    setActiveModal('');
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    postItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        // Add link property for consistency
        const item = newItem.data; // store the real item here
        const normalizedItem = {
          ...item, // use item
          link: item.link || item.imageUrl, // use item
        };
        setClothingItems((prevItems) => [normalizedItem, ...prevItems]);
        closeModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null); // This will make isLoggedIn === false
    navigate('/'); // Redirect to main page

    // Optionally redirect, etc.
  };
  const handleDeleteItem = (id) => {
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeModal(); // Close the modal after successful delete
      })
      .catch((error) => {
        console.log(error);
        // Optionally show an error message to the user
      });
  };
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          link: item.link || item.imageUrl, // fallback if needed
          likes: item.likes || [], // ensure likes array always exists
        }));
        setClothingItems(normalized);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (token) {
      getUser(token)
        .then((userData) => setCurrentUser(userData))
        .catch(() => {
          setCurrentUser(null);
          setToken(null);
          localStorage.removeItem('jwt');
        });
    }
  }, [token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <currentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              setActiveModal={setActiveModal}
              isLoggedIn={isLoggedIn}
            ></Header>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onCardLike={handleCardLike}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteItem={handleDeleteItem}
                  ></Main>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onSignOut={handleSignOut} // pass as prop
                      onEditProfile={handleEditProfileOpen}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike} // <-- pass the handler here
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id
                      )}
                      onClick={handleAddClick}
                    ></Profile>
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer></Footer>
          </div>

          <AddItemModal
            onClose={closeModal}
            isOpen={activeModal === 'add-garment'}
            activeModal={activeModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          ></AddItemModal>
          <ItemModal
            onRequestDelete={handleRequestDelete}
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeModal}
            onDelete={handleDeleteItem}
          />

          <DeleteItemModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => {
              handleDeleteItem(selectedCard._id);
              setIsDeleteModalOpen(false);
            }}
            itemName={selectedCard.name}
          />
          <RegisterModal
            onSwitchAuthModal={handleSwitchAuthModal}
            isOpen={activeModal === 'register'}
            activeModal={activeModal}
            onClose={closeModal}
            onRegister={handleRegister} // you’ll define this function!
          />
          <LoginModal
            onSwitchAuthModal={handleSwitchAuthModal}
            loginError={loginError}
            isOpen={activeModal === 'login'}
            activeModal={activeModal}
            onClose={closeModal}
            onLogin={handleLogin} // you’ll define this function!
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={handleEditProfileClose}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isProfileUpdating}
          />
        </div>
      </currentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
