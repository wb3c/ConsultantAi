import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Chatbots() {
  return (
    <div className="chatbots bg-white">
      <div className="chatbots-top">
        <FiUsers /> <h4>Other Chatbots</h4>
      </div>
      <div className="chatbots-body">
        <Link to="/" className="item">
          <h5>Harun</h5>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            qui, hic ut ratione architecto cupiditate fugit nulla culpa
            laboriosam aspernatur, eaque id, aliquid cumque at obcaecati nam
            eius dicta ea.
          </p>
        </Link>
        <Link to="/" className="item">
          <h5>Harun</h5>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            qui, hic ut ratione architecto cupiditate fugit nulla culpa
            laboriosam aspernatur, eaque id, aliquid cumque at obcaecati nam
            eius dicta ea.
          </p>
        </Link>
      </div>
    </div>
  );
}
