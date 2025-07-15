import { useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
function App() {
  const [weatherData, setWeatherData] = useState({ type: 'cold' });
  return (
    <div className="page">
      <div className="page__content">
        <Header></Header>
        <Main weatherData={weatherData}></Main>
      </div>
    </div>
  );
}

export default App;
