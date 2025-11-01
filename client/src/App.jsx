import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // ---- TEXT REQUEST ----
  const handleTextSend = async () => {
    if (!input.trim()) return alert("⚠️ Please enter a prompt!");
    setLoading(true);
    setOutput("");
    setImageUrl("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/openai/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.status === "success") {
        setOutput(data.response);
      } else {
        setOutput("⚠️ " + data.response);
      }
    } catch (error) {
      console.error(error);
      setOutput("❌ Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">What’s on your mind today?</h1>

      {/* Input area */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Type your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="prompt-input"
        />
        <button
          onClick={handleTextSend}
          disabled={loading}
          className="send-btn"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>

      {/* Response area */}
      <div className="response-box">
        <h3>Response:</h3>
        {loading && <div className="loader"></div>}
        {!loading && output && <p className="output-text">{output}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Generated"
            className="result-image"
          />
        )}
      </div>
    </div>
  );
}

export default App;
