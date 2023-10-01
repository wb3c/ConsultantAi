import { BsFillSunFill } from "react-icons/bs";
import { PiMoonFill } from "react-icons/pi";

export default function DarkMode({ isDark, setIsDark }) {
  return (
    <div className="darkmode">
      <input
        onChange={() => {
          setIsDark(!isDark);
        }}
        type="checkbox"
        className="checkbox"
        id="checkbox"
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <PiMoonFill />
        <BsFillSunFill />
        <span className="ball"></span>
      </label>
    </div>
  );
}
