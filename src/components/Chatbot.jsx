import { useEffect, useRef, useState } from "react";
import {
  BiDotsVerticalRounded,
  BiSolidMicrophone,
  BiSolidMicrophoneOff,
  BiSolidVolumeMute,
} from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { useParams } from "react-router-dom";
import ReactTyped from "react-typed";
import Audio from "./Audio";

import axios from "axios";
import values from "../values";
import Color from "./Color";

export default function Chatbot() {
  const { var1, name, voice } = useParams();
  const [isColor, setIscolor] = useState(false);
  const [col, setCol] = useState("#6600ff");

  const body = useRef();
  const [chatData, setChatData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const { url } = values;
  const inputRef = useRef(null);
  const [img, setImg] = useState("");
  const [voiceId, setVoiceId] = useState("Joanna");
  const [qus, setQus] = useState([
    "What is Consultant Ai ?",
    "How to Join Consultant Ai?",
    "How to get started?",
  ]);

  const submitAssistan = (input) => {
    if (input.trim()) {
      setChatData((prev) => {
        return [...prev, { message: input, user: true }];
      });

      setIsloading(true);
      setInputData("");

      axios
        .post(url, {
          text: input,
          name: var1,
        })
        .then((d) => {
          let text = "";

          d.data.forEach((item) => {
            if (item.text) {
              text = `${text} ${(text && "\n") || ""} ${item.text}`;
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
                    voice_id: voiceId,
                  }
                )
                .then((d1) => {
                  setIsloading(false);

                  setChatData((prev) => {
                    return [
                      ...prev,
                      { audio: true, url: d1.data.url, message: text },
                    ];
                  });
                })
                .catch((e) => {
                  console.log(e);
                  setIsloading(false);
                });
            }
          }
        })
        .catch((e) => {
          console.log(e);
          setIsloading(false);
        });
    }
  };

  useEffect(() => {
    if (voice && voice === "male") {
      setVoiceId("Matthew");
    } else {
      setVoiceId("Joanna");
    }
  }, [voice]);

  useEffect(() => {
    setImg(
      `https://projects-all-together.s3.amazonaws.com/consultantai/images/${var1}.jpg`
    );
  }, [var1]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const submitHandler = (e) => {
    e.preventDefault();
    submitAssistan(inputData);
  };

  const inputHandler = (e) => {
    setInputData(e.target.value);
  };

  const scrollToBottom = () => {
    body.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // speech to text
  const [recognizedText, setRecognizedText] = useState("");
  const [isMic, setIsMic] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;

  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const recognizedText = event.results[lastResultIndex][0].transcript;
    setRecognizedText(recognizedText);
  };

  recognition.onerror = (event) => {
    console.error("Error occurred in recognition:", event.error);
  };

  recognition.onstart = () => {
    setIsMic(true);
  };

  recognition.onend = () => {
    setIsMic(false);
  };

  const toggleListening = () => {
    if (isMic) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  useEffect(() => {
    submitAssistan(recognizedText);
  }, [recognizedText]);

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
                  {
                    <p style={{ background: data.user && col }}>
                      {(!data.user &&
                        ((data.audio && (
                          <>
                            <Audio url={data.url} />
                            <ReactTyped
                              strings={[
                                data.message.replace(/\n/g, "<br /> <br />"),
                              ]}
                              typeSpeed={10}
                              backSpeed={10}
                              cursorChar=""
                              onStringTyped={() => scrollToBottom()}
                            />
                          </>
                        )) || (
                          <ReactTyped
                            strings={[
                              data.message.replace(/\n/g, "<br /> <br />"),
                            ]}
                            typeSpeed={10}
                            backSpeed={10}
                            cursorChar=""
                            onComplete={() => scrollToBottom()}
                          />
                        ))) ||
                        data.message}
                    </p>
                  }
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

          <div className="pre-qus">
            {qus.map((q, i) => (
              <button
                style={{ background: col }}
                onClick={() => submitAssistan(q)}
                key={i}
              >
                {q}
              </button>
            ))}
          </div>
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
              placeholder="Message"
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
              setChatData([]);
            }}
          >
            <MdRestartAlt />
          </button>
          <button
            className={(isMic && "active") || ""}
            onClick={() => toggleListening()}
          >
            {(isMic && <BiSolidMicrophone />) || <BiSolidMicrophoneOff />}
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
