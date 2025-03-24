// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { ImCross } from "react-icons/im";
// import { BiSupport } from "react-icons/bi";
// import "bootstrap/dist/css/bootstrap.min.css";
// import './chatbot.css'

// const GEMINI_API_KEY = "AIzaSyCINQxg7kwwqJvxqJY0ySix8N1nuAxHG1A"; 

// const Chatbot = () => {
//   const [click, setClick] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatContainerRef = useRef(null);
//   const [loading, setLoading] = useState(false);


//   const formatMessage = (message) => {
//     if (!message) return [];

//     return message.split(/(\*\*.*?\*\*)|\*|(\#\#.#?\#\#)/).map((part, index) => {
//       if (!part) return null;
//       if (part.startsWith("**") && part.endsWith("**")) {
//         return <><br /> <strong key={index}>{part.slice(2, -2)}</strong></>;
//       }
//       if (part === "*") {
//         return <br key={index} />;
//       }
//       if (part.startsWith("##") && part.endsWith("##")) {
//         return <><br /> <strong key={index}>{part.slice(2, -2)}</strong></>;
//       }
//       return part;
//     });
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [chat, loading]);

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;
//     setUserInput("");
//     const newChat = [...chat, { role: "user", content: userInput }];
//     setChat(newChat);
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           contents: [{ role: "user", parts: [{ text: userInput }] }],
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const botReply =
//         response.data.candidates[0]?.content?.parts[0]?.text ||
//         "Sorry, I couldn't process that.";
//       setChat([...newChat, { role: "assistant", content: botReply }]);
//     } catch (error) {
//       console.error(error);
//       setChat([...newChat, { role: "assistant", content: "Error fetching response." }]);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="position-fixed bottom-0 end-0 m-3">
//       {!click && (
//         <button
//           className="btn btn-info rounded-circle p-2"
//           onClick={() => setClick(true)}
//         >
//           <BiSupport size={34} />
//         </button>
//       )}
//       {click && (
//         <div className=" p-3 rounded shadow-lg position-fixed bottom-0 end-0 mb-5 me-3" style={{ width: "30vw", height: "70vh",backgroundColor:"lightskyblue" }}>
//           <div className="d-flex justify-content-between align-items-center k">
//             <h4 className="m-0 fw-bold fs-4">StockVerse Assistant</h4>
//             <button className="btn btn-sm fs-6 hover-effect" onClick={() => setClick(false)}>
//               <ImCross />
//             </button>
//           </div>
//           <div ref={chatContainerRef} className="border border-dark rounded p-3 mt-2 overflow-auto bg-light" style={{ height: "80%" }}>
//             {chat.map((msg, index) => (
//               <div key={index}style={{fontSize:"18px"}} className={`text-${msg.role === "user" ? "end text-primary " : "start text-dark"} mb-2`}>
//                 <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {formatMessage(msg.content)}
//               </div>
//             ))}
//             {loading && (<div className="d-flex align-items-center">
//               <strong style={{fontSize:"19px"}}>Bot:</strong>
//               <div className="d-flex align-items-center ms-2">
//                 {[...Array(5)].map((_, index) => (
//                   <div
//                     key={index}
//                     className="rounded-circle bg-secondary mx-1"
//                     style={{
//                       width: "8px",
//                       height: "8px",
//                       animation: "pulse 1.2s infinite ease-in-out",
//                       animationDelay: `${index * 0.2}s`,
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             )



//             }
//           </div>
//           <div className="input-group mt-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Ask about stocks..."
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               style={{outline:"none",boxShadow: "none",height:"50px",fontSize:"18px"}}
//             />
//             <button className="btn btn-dark fw-semibold" onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>


//   );
// };
// export default Chatbot;



//---------------------------------------------------UPDATE----------------------------------------------------


//api key: R1K0S9KLFUS4IMDG.
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { BiSupport } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chatbot.css";

const ALPHA_VANTAGE_API_KEY = "R1K0S9KLFUS4IMDG"; // Replace with your actual API key
const GEMINI_API_KEY = "AIzaSyCINQxg7kwwqJvxqJY0ySix8N1nuAxHG1A";



const Chatbot = () => {
  const [click, setClick] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat, loading]);

  // Function to fetch stock prices
  const stockSymbolMap = {
    // 🌍 Big Tech
    "apple": "AAPL",
    "microsoft": "MSFT",
    "tesla": "TSLA",
    "google": "GOOGL",
    "amazon": "AMZN",
    "meta": "META",
    "nvidia": "NVDA",
    "intel": "INTC",
    "amd": "AMD",
    "ibm": "IBM",
    "oracle": "ORCL",
    "sap": "SAP",
    "adobe": "ADBE",
    "salesforce": "CRM",
    "cisco": "CSCO",
    "zoom": "ZM",
    "snowflake": "SNOW",
    "spotify": "SPOT",
    "shopify": "SHOP",
    "block": "SQ",

    // 💰 Finance
    "jpmorgan": "JPM",
    "bank of america": "BAC",
    "wells fargo": "WFC",
    "citigroup": "C",
    "goldman sachs": "GS",
    "morgan stanley": "MS",
    "american express": "AXP",
    "paypal": "PYPL",
    "visa": "V",
    "mastercard": "MA",
    "square": "SQ",
    "coinbase": "COIN",

    // 🏥 Healthcare & Pharma
    "pfizer": "PFE",
    "moderna": "MRNA",
    "johnson & johnson": "JNJ",
    "astrazeneca": "AZN",
    "gilead": "GILD",
    "biogen": "BIIB",
    "abbott": "ABT",
    "eli lilly": "LLY",
    "merck": "MRK",
    "novartis": "NVS",
    "regeneron": "REGN",
    "bristol myers squibb": "BMY",

    // 🚗 Automotive
    "ford": "F",
    "general motors": "GM",
    "toyota": "TM",
    "honda": "HMC",
    "bmw": "BMWYY",
    "mercedes": "DDAIF",
    "volkswagen": "VWAGY",
    "hyundai": "HYMTF",
    "ferrari": "RACE",
    "rivian": "RIVN",
    "lucid": "LCID",
    "nio": "NIO",
    "xpeng": "XPEV",

    // ⚡ Energy & Oil
    "exxon mobil": "XOM",
    "chevron": "CVX",
    "bp": "BP",
    "shell": "SHEL",
    "totalenergies": "TTE",
    "conocophillips": "COP",
    "halliburton": "HAL",
    "schlumberger": "SLB",
    "enbridge": "ENB",
    "duke energy": "DUK",
    "nextEra energy": "NEE",

    // 🛒 Retail & Consumer Goods
    "walmart": "WMT",
    "costco": "COST",
    "target": "TGT",
    "home depot": "HD",
    "lowe's": "LOW",
    "mcdonald's": "MCD",
    "starbucks": "SBUX",
    "nike": "NKE",
    "adidas": "ADDYY",
    "under armour": "UAA",
    "lululemon": "LULU",

    // 🎮 Gaming & Entertainment
    "disney": "DIS",
    "netflix": "NFLX",
    "sony": "SONY",
    "nintendo": "NTDOY",
    "electronic arts": "EA",
    "activision": "ATVI",
    "take-two interactive": "TTWO",
    "ubisoft": "UBSFY",

    // 🏠 Real Estate
    "zillow": "Z",
    "redfin": "RDFN",
    "re/max": "RMAX",
    "realty income": "O",
    "american tower": "AMT",

    // 🏗️ Industrials & Manufacturing
    "boeing": "BA",
    "lockheed martin": "LMT",
    "raytheon": "RTX",
    "caterpillar": "CAT",
    "general electric": "GE",
    "honeywell": "HON",
    "siemens": "SIEGY",

    // ☁️ Cloud & Cybersecurity
    "cloudflare": "NET",
    "palantir": "PLTR",
    "crowdstrike": "CRWD",
    "okta": "OKTA",
    "zscaler": "ZS",
    "fortinet": "FTNT",

    // 📡 Telecom & Internet
    "verizon": "VZ",
    "at&t": "T",
    "t-mobile": "TMUS",
    "comcast": "CMCSA",
    "charter": "CHTR",
    "rogers communications": "RCI",
    "telus": "TU",

    // 🚀 Space & Defense
    "spacex": "SPACEX",
    "rocket lab": "RKLB",
    "virgin galactic": "SPCE",
    "northrop grumman": "NOC",
    "general dynamics": "GD",

    // ⛏️ Mining & Commodities
    "barrick gold": "GOLD",
    "newmont": "NEM",
    "rio tinto": "RIO",
    "bhp group": "BHP",
    "vale": "VALE",
    "freeport-mcmoran": "FCX",

    // 🍔 Food & Beverages
    "coca cola": "KO",
    "pepsi": "PEP",
    "nestle": "NSRGY",
    "kraft heinz": "KHC",
    "tyson foods": "TSN",
    "general mills": "GIS",
    "mondelez": "MDLZ",
    "kellogg": "K",

    // 🔋 Electric Vehicles & Battery Tech
    "panasonic": "PCRFY",
    "lg energy solution": "373220.KQ",
    "quantumscape": "QS",
    "solid power": "SLDP",
    "albemarle": "ALB",
    "lithium americas": "LAC",

    // 🏦 Investment Firms & ETFs
    "blackrock": "BLK",
    "vanguard": "VTSAX",
    "charles schwab": "SCHW",
    "fidelity": "FXAIX",

    // 🏆 Luxury Brands
    "louis vuitton": "LVMUY",
    "hermes": "HESAY",
    "gucci": "KER.PA",
    "prada": "PRDSY"
  };

  const getStockSymbol = (query) => {
    const lowerQuery = query.toLowerCase();
    return stockSymbolMap[lowerQuery] || query.toUpperCase();
  };


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
  const fetchStockPrice = async (query) => {
    const symbol = getStockSymbol(query);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      const stockData = response.data["Global Quote"];

      if (!stockData || Object.keys(stockData).length === 0) {
        return { content: `❌ Stock "${query}" not found. Try again with a valid ticker.`, source: "vantage" };
      }

      const price = parseFloat(stockData["05. price"]).toFixed(2);
      const change = parseFloat(stockData["09. change"]).toFixed(2);
      const changePercent = stockData["10. change percent"];
      const openPrice = parseFloat(stockData["02. open"]).toFixed(2);
      const highPrice = parseFloat(stockData["03. high"]).toFixed(2);
      const lowPrice = parseFloat(stockData["04. low"]).toFixed(2);
      const prevClose = parseFloat(stockData["08. previous close"]).toFixed(2);
      const volume = stockData["06. volume"];

      // Determine trend (increase or decrease)
      const trend = change >= 0 ? "🔼 Up" : "🔻 Down";

      return {
        content: `📈 **${symbol} Stock Price**: $${price}
${trend} by $${Math.abs(change)} (${changePercent})

📌 **Previous Close**: $${prevClose}
🚀 **High Price**: $${highPrice}
📉 **Low Price**: $${lowPrice}
📊 **Volume**: ${volume}`,
        source: "vantage",
      };
    } catch (error) {
      console.error(error);
      return { content: "Error fetching stock data.", source: "vantage" };
    }
  };






  // Function to detect stock-related queries
  const detectStockQuery = (message) => {
    const stockRegex = /\b(?:stock price of|price of|current price of|how much is) ([A-Z]{1,5})\b/i;
    const match = message.match(stockRegex);
    return match ? match[1].toUpperCase() : null;
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setUserInput("");
    const newChat = [...chat, { role: "user", content: userInput }];
    setChat(newChat);
    setLoading(true);

    // Detect if the query is about a stock
    const stockSymbol = detectStockQuery(userInput);

    let botReply;

    if (stockSymbol) {
      // Fetch stock price
      const stockResponse = await fetchStockPrice(stockSymbol);
      botReply = stockResponse.content;
      setChat([...newChat, { role: "assistant", content: botReply, source: "vantage" }]);
    } else {
      // Fetch response from Gemini
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

        botReply =
          response.data.candidates[0]?.content?.parts[0]?.text ||
          "Sorry, I couldn't process that.";

        setChat([
          ...newChat,
          { role: "assistant", content: botReply, source: "gemini" },
        ]);
      } catch (error) {
        console.error(error);
        setChat([
          ...newChat,
          { role: "assistant", content: "Error fetching response.", source: "gemini" },
        ]);
      }
    }

    setLoading(false);
  };



  return (
    <div className="position-fixed bottom-0 end-0 m-3">
      {!click && (
        <button className="btn btn-info rounded-circle p-2" onClick={() => setClick(true)}>
          <BiSupport size={34} />
        </button>
      )}
      {click && (
        <div className="p-3 rounded shadow-lg position-fixed bottom-0 end-0 mb-5 me-3"
          style={{ width: "30vw", height: "70vh", backgroundColor: "lightskyblue" }}>

          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0 fw-bold fs-4">StockVerse Assistant</h4>
            <button className="btn btn-sm fs-6 hover-effect" onClick={() => setClick(false)}>
              <ImCross />
            </button>
          </div>

          <div ref={chatContainerRef} className="border border-dark rounded p-3 mt-2 overflow-auto bg-light"
            style={{ height: "80%" }}>
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}
              >
                <div
                  style={{
                    fontSize: "18px",
                    backgroundColor:
                      msg.role === "user"
                        ? "#f3e5f5"
                        : msg.source === "vantage"
                          ? "#d1e3f5" // Light green for stock API
                          : "#d1e3f5", // Light blue for Gemini
                    color: msg.source === "vantage" ? "#4CAF50" : msg.source === "gemini" ? "#2196F3" : "black",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "80%",
                  }}
                  className="text-dark"
                >
                  <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {formatMessage(msg.content)}
                </div>
              </div>

            ))}

            {loading && (
              <div className="d-flex align-items-center">
                <strong style={{ fontSize: "19px" }}>Bot:</strong>
                <div className="d-flex align-items-center ms-2">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="rounded-circle bg-secondary mx-1"
                      style={{
                        width: "8px",
                        height: "8px",
                        animation: "pulse 1.2s infinite ease-in-out",
                        animationDelay: `${index * 0.2}s`,
                      }}>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="input-group mt-2">
            <input type="text" className="form-control" placeholder="Ask about stocks..."
              value={userInput} onChange={(e) => setUserInput(e.target.value)}
              style={{ outline: "none", boxShadow: "none", height: "50px", fontSize: "18px" }} />
            <button className="btn btn-dark fw-semibold" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
