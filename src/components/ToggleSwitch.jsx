import { useContext } from 'react';
import '../blocks/ToggleSwitch.css';
import currentTemperatureUnitContext from '../contexts/currentTemperatureUnitContext';
export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    currentTemperatureUnitContext
  );
  return (
    <label className="toggle__switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle__switch-checkbox"
      />
      <span className="toggle__switch-circle"></span>
      <span
        className={`toggle__switch-text toggle__switch-text_F ${currentTemperatureUnit === 'F' ? 'toggle__switch-text_color_white' : ''}`}
      >
        F
      </span>
      <span
        className={`toggle__switch-text toggle__switch-text_C ${currentTemperatureUnit === 'C' ? 'toggle__switch-text_color_white' : ''}`}
      >
        C
      </span>
    </label>
  );
}
