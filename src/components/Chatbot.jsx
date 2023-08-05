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

import React from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chatbot() {
  const { var1, name, voice } = useParams();
  const [isColor, setIscolor] = useState(false);
  const [col, setCol] = useState("#6600ff");

  const body = useRef();
  const [chatData, setChatData] = useState([]);
  const [qus, setQus] = useState([
    {
      qus: "What is Consultant Ai ? ",
      ans: `Consultant Ai are conversational Ai chatbots designed to help answer questions related to the chatbot your are talking with.
    Each Consultant is trained using custom Ai language models, to accurately answer your questions in a conversational style, making Consultant Ai the first personalized assistant with immersive responses.`,
    },
    {
      qus: "How to join Consultant Ai? ",
      ans: `1. Follow us on Twitter : <a target="blanck" href="https://twitter.com/Consultant_Ais"> https://twitter.com/Consultant_Ais</a>
        2. Contact Us here to find our more: <a target="blanck" href="https://consultantai.co/contacts/"> https://consultantai.co/contacts/ </a>`,
    },
    {
      qus: "How to get started?",
      ans: `1. say your name and say Hi
        2. Ask questions
        3. Have Fun
        * Try to ask specific questions for best results`,
    },
  ]);
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const { url } = values;
  const inputRef = useRef(null);
  const [img, setImg] = useState("");
  const [voiceId, setVoiceId] = useState("Joanna");

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

  useEffect(() => {
    let recognition = null;

    const handleRecognitionResult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const recognizedText = event.results[lastResultIndex][0].transcript;
      setRecognizedText(recognizedText);
    };

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.onresult = handleRecognitionResult;
    recognition.onerror = (event) => {
      console.error("Error occurred in recognition:", event.error);
    };

    const startRecognition = () => {
      recognition.start();
    };

    recognition.onend = () => {
      setIsMic(false);
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };
    if (isMic) {
      startRecognition();
    } else {
      stopRecognition();
    }
  }, [isMic]);

  const toggleListening = () => {
    if (isMic) {
      setIsMic(false);
    } else {
      setIsMic(true);
    }
  };

  useEffect(() => {
    submitAssistan(recognizedText);
  }, [recognizedText]);

  const preQus = (d) => {
    if (isAudio) {
      setChatData((prev) => {
        return [...prev, { message: d.qus, user: true }];
      });
      setIsloading(true);
      axios
        .post(
          `https://jymjsykl31.execute-api.us-east-1.amazonaws.com/v1/text2speech`,
          {
            text: d.ans,
            voice_id: voiceId,
          }
        )
        .then((d1) => {
          setIsloading(false);

          setChatData((prev) => {
            return [...prev, { audio: true, url: d1.data.url, message: d.ans }];
          });
        })
        .catch((e) => {
          console.log(e);
          setIsloading(false);
        });
    } else {
      setChatData((prev) => {
        return [...prev, { message: d.qus, user: true }, { message: d.ans }];
      });
    }
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
                        )) ||
                          (!data.type && (
                            <ReactTyped
                              strings={[
                                data.message.replace(/\n/g, "<br /> <br />"),
                              ]}
                              typeSpeed={(!data.type && 10) || 0}
                              backSpeed={(!data.type && 10) || 1}
                              cursorChar=""
                              onComplete={() => scrollToBottom()}
                            />
                          )) ||
                          data.message.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          )))) ||
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
                onMouseOver={(e) => {
                  e.target.style.background = col;
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                }}
                style={{
                  borderColor: col,
                }}
                onClick={() => preQus(q)}
                key={i}
              >
                {q.qus}
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
            style={{
              color: isAudio && col,
            }}
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
            style={{
              color: isMic && col,
            }}
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
