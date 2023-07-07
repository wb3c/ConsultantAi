import { SketchPicker } from "react-color";
import { IoMdClose } from "react-icons/io";

export default function Color({ closeHandler, col, setCol }) {
  const handler = (c) => {
    setCol(c.hex);
  };
  return (
    <div className="color">
      <div className="info">
        <span>Theme color:</span>
        <button onClick={() => closeHandler(false)} className="close">
          {" "}
          <IoMdClose />
        </button>
      </div>

      <SketchPicker color={col} onChangeComplete={(c) => handler(c)} />
    </div>
  );
}
