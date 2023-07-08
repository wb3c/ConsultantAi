import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded, BiSolidVolumeMute } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { VscCopy } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import ReactTyped from "react-typed";
import img from "../assets/logo.jpeg";
import values from "../values";
import Audio from "./Audio";
import Color from "./Color";

export default function Chatbot() {
  const { var1, name } = useParams();
  const [isColor, setIscolor] = useState(false);
  const [col, setCol] = useState("#6600ff");

  const body = useRef();
  const [chatData, setChatData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const { url } = values;
  const inputRef = useRef(null);

  const data = {
    uid: "-1",
    sceneId:
      "workspaces/default-1ekqgxmfrwwnaos46pmvgq/characters/" +
      (var1 || "galadriel"),
    characterId: "-1",
    playerName: "Client",
    serverId: "default-1ekqgxmfrwwnaos46pmvgq",
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputData) {
      setChatData((prev) => {
        return [...prev, { message: inputData, user: true }];
      });
      setIsloading(true);

      axios
        .post(`${url}/session/open`, data)
        .then((d) => {
          axios
            .post(`${url}/session/${d.data.sessionId}/message`, {
              message: inputData,
            })
            .then((d2) => {
              axios
                .get(`${url}/events/${data?.serverId}`)
                .then((d3) => {
                  let text = "";
                  d3.data.forEach((item) => {
                    if (item.type === "text" && item.type !== " ") {
                      if (item.text) {
                        text += item.text;
                      }
                    }
                  });
                  if (text) {
                    if (!isAudio) {
                      setIsloading(false);
                      setChatData((prev) => {
                        return [...prev, { message: text }];
                      });
                    } else if (isAudio) {
                      axios
                        .post(
                          `https://jymjsykl31.execute-api.us-east-1.amazonaws.com/v1/text2speech`,
                          {
                            text,
                            voice_id: "Joanna",
                          }
                        )
                        .then((d4) => {
                          setChatData((prev) => {
                            return [...prev, { audio: true, url: d4.data.url }];
                          });
                          setIsAudio(false);
                        })
                        .catch((e) => {
                          console.log;
                          setIsloading(false);
                        });
                    }
                    axios
                      .get(`${url}/session/${d.data.sessionId}/close`)
                      .then((d1) => {
                        setIsloading(false);
                        console.log;
                      })
                      .catch((e) => {
                        setIsloading(false);
                        console.log(e);
                      });
                  }
                })
                .catch((e) => {
                  setIsloading(false);
                  console.log(e);
                });
            })
            .catch((e) => {
              setIsloading(false);
              console.log(e);
            });
        })
        .catch((e) => {
          setIsloading(false);
          axios
            .get(`${url}/session/closeall/-1`)
            .then((d) => {
              console.log;
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(e);
        });
    }
    setInputData("");
  };

  const inputHandler = (e) => {
    setInputData(e.target.value);
  };

  const scrollToBottom = () => {
    body.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="chatbot">
      <div className="chatbot-head">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="info">
          <h4>{name || "Anna"} Consultant</h4>
        </div>
      </div>
      <div className="chatbot-body-wrp">
        <div className="chatbot-body" ref={body}>
          {chatData?.map((data, i) => {
            return (
              <div
                key={i}
                className={`chatbot-body-item ${(data?.user && "user") || ""}`}
              >
                <div className="img" style={{ background: col }}>
                  {(!data?.user && <img src={img} alt="" />) || "U"}
                </div>
                <div className="info">
                  {(!data.user && data.audio && <Audio url={data.url} />) || (
                    <p style={{ background: data.user && col }}>
                      {(!data.user && (
                        <ReactTyped
                          strings={[data.message]}
                          typeSpeed={10}
                          backSpeed={10}
                          cursorChar=""
                        />
                      )) ||
                        data.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="chat-bubble chatbot-body-item ">
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chatbot-footer">
        <div className="form">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => {
                inputHandler(e);
              }}
              placeholder="Message anna It consaltant"
              value={inputData}
            />
            <button style={{ color: col }}>
              <IoSend />
            </button>
          </form>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setIsAudio(!isAudio);
            }}
            className={(isAudio && "active") || ""}
          >
            <BiSolidVolumeMute />
          </button>{" "}
          <button
            onClick={() => {
              setInputData("");
            }}
          >
            <MdRestartAlt />
          </button>
          <button
            onClick={() => {
              inputRef.current.select();
              document.execCommand("copy");
            }}
          >
            <VscCopy />
          </button>{" "}
          <button onClick={() => setIscolor(true)}>
            <BiDotsVerticalRounded />
          </button>
          {isColor && (
            <Color closeHandler={setIscolor} col={col} setCol={setCol} />
          )}
        </div>
      </div>
    </div>
  );
}
