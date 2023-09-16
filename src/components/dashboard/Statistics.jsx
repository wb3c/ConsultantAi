import { AiOutlineLayout, AiOutlineStar } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Statistics() {
  return (
    <div className="statistics bg-white">
      <div className="statistics-top">
        <AiOutlineLayout />
        <h4>Statistics</h4>
      </div>
      <div className="statistics-body">
        <div className="item">
          <div className="item-top">
            <strong>
              <AiOutlineStar />
              Message Usage
            </strong>
            <Link to="pricing">Upgrade</Link>
          </div>
          <div className="item-body">
            <span>9/25</span>
          </div>
        </div>
        <div className="item">
          <div className="item-top">
            <strong>
              <VscServerProcess />
              Appearance
            </strong>
            <Link to="/">Customize</Link>
          </div>
          <div className="item-body">
            <span>80/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
