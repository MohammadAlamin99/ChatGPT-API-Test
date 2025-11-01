import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [activeTab, setActiveTab] = useState("text"); // For tab switching

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

  // ---- IMAGE UPLOAD REQUEST ----
  const handleImageSend = async () => {
    if (!imageFile) return alert("⚠️ Please select an image!");
    setLoading(true);
    setOutput("");
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/api/v1/openai/image-to-text", {
        method: "POST",
        body: formData,
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
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">AI Assistant</h1>
          <p className="app-subtitle">Ask anything or analyze images with AI</p>
        </div>
      </header>

      <main className="main-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === "text" ? "active" : ""}`}
            onClick={() => setActiveTab("text")}
          >
            📝 Text Prompt
          </button>
          <button
            className={`tab-btn ${activeTab === "image" ? "active" : ""}`}
            onClick={() => setActiveTab("image")}
          >
            🖼️ Image Analysis
          </button>
        </div>

        {/* Text Input Section */}
        {activeTab === "text" && (
          <div className="input-card">
            <div className="card-header">
              <h2>Text Prompt</h2>
              <span className="icon">💬</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="What would you like to know?..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="prompt-input"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSend()}
              />
              <button
                onClick={handleTextSend}
                disabled={loading || !input.trim()}
                className="send-btn primary"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="icon">✨</span>
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Image Input Section */}
        {activeTab === "image" && (
          <div className="input-card">
            <div className="card-header">
              <h2>Image Analysis</h2>
              <span className="icon">🖼️</span>
            </div>
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input" className="upload-label">
                {imageFile ? (
                  <>
                    <span className="icon">✅</span>
                    <span className="file-name">{imageFile.name}</span>
                    <span className="change-text">Click to change</span>
                  </>
                ) : (
                  <>
                    <span className="icon">📁</span>
                    <span>Choose an image file</span>
                    <span className="file-types">PNG, JPG, JPEG supported</span>
                  </>
                )}
              </label>
              <button
                onClick={handleImageSend}
                disabled={loading || !imageFile}
                className="send-btn secondary"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="icon">🔍</span>
                    Analyze Image
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Response Area */}
        {(output || loading) && (
          <div className="response-card">
            <div className="card-header">
              <h2>Response</h2>
              <span className="icon">🤖</span>
            </div>
            <div className="response-content">
              {loading && (
                <div className="loading-state">
                  <div className="pulse-loader">
                    <div className="pulse-dot"></div>
                    <div className="pulse-dot"></div>
                    <div className="pulse-dot"></div>
                  </div>
                  <p>AI is thinking...</p>
                </div>
              )}

              {!loading && output && (
                <>
                  <div className="output-text">
                    {output}
                  </div>
                  <div className="response-actions">
                    <button
                      className="action-btn"
                      onClick={() => navigator.clipboard.writeText(output)}
                    >
                      <span className="icon">📋</span>
                      Copy
                    </button>
                  </div>
                </>
              )}

              {imageUrl && (
                <div className="image-result">
                  <img src={imageUrl} alt="Generated" className="result-image" />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;