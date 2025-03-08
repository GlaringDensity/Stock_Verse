import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { BiSupport } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import './chatbot.css'

const GEMINI_API_KEY = "AIzaSyCINQxg7kwwqJvxqJY0ySix8N1nuAxHG1A"; // Replace with your actual API key

const Chatbot = () => {
  const [click, setClick] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const formatMessage = (message) => {
    if (!message) return [];

    return message.split(/(\*\*.*?\*\*)|\*|(\#\#.#?\#\#)/).map((part, index) => {
      if (!part) return null;
      if (part.startsWith("**") && part.endsWith("**")) {
        return <><br /> <strong key={index}>{part.slice(2, -2)}</strong></>;
      }
      if (part === "*") {
        return <br key={index} />;
      }
      if (part.startsWith("##") && part.endsWith("##")) {
        return <><br /> <strong key={index}>{part.slice(2, -2)}</strong></>;
      }
      return part;
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setUserInput("");
    const newChat = [...chat, { role: "user", content: userInput }];
    setChat(newChat);
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: userInput }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const botReply =
        response.data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't process that.";
      setChat([...newChat, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error(error);
      setChat([...newChat, { role: "assistant", content: "Error fetching response." }]);
    }
    setLoading(false);
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3">
      {!click && (
        <button
          className="btn btn-info rounded-circle p-2"
          onClick={() => setClick(true)}
        >
          <BiSupport size={34} />
        </button>
      )}
      {click && (
        <div className=" p-3 rounded shadow-lg position-fixed bottom-0 end-0 mb-5 me-3" style={{ width: "30vw", height: "70vh",backgroundColor:"lightskyblue" }}>
          <div className="d-flex justify-content-between align-items-center k">
            <h4 className="m-0 fw-bold fs-4">StockVerse Assistant</h4>
            <button className="btn btn-sm fs-6 hover-effect" onClick={() => setClick(false)}>
              <ImCross />
            </button>
          </div>
          <div ref={chatContainerRef} className="border border-dark rounded p-3 mt-2 overflow-auto bg-light" style={{ height: "80%" }}>
            {chat.map((msg, index) => (
              <div key={index}style={{fontSize:"18px"}} className={`text-${msg.role === "user" ? "end text-primary " : "start text-dark"} mb-2`}>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {formatMessage(msg.content)}
              </div>
            ))}
            {loading && (<div className="d-flex align-items-center">
              <strong style={{fontSize:"19px"}}>Bot:</strong>
              <div className="d-flex align-items-center ms-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-circle bg-secondary mx-1"
                    style={{
                      width: "8px",
                      height: "8px",
                      animation: "pulse 1.2s infinite ease-in-out",
                      animationDelay: `${index * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            )

            

            }
          </div>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Ask about stocks..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{outline:"none",boxShadow: "none",height:"50px",fontSize:"18px"}}
            />
            <button className="btn btn-dark fw-semibold" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>

    
  );
};



export default Chatbot;
