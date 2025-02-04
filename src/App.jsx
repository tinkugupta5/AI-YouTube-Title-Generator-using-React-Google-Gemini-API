import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [keywords, setKeywords] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Use process.env.REACT_APP_GEMINI_API_KEY for Create React App
  const generateTitles = async () => {
    if (!keywords.trim()) {
      alert("Please enter some keyword");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: `Generate 5 catchy YouTube video titles related to: ${keywords}` }],
            },
          ],
        }
      );
      console.log("Response Data:", response.data); // Debugging Response
      const candidates = response.data.candidates || [];
      const titles = candidates.map((c) => c.content.parts[0].text);
      setGeneratedTitles(titles);
    } catch (error) {
      console.error("Error fetching titles:", error);
      alert("Failed to generate titles. Check API Key or Network.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h2>🎥 AI YouTube Title Generator</h2>
      <p>Titles that drive the attention your content deserves</p>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords (e.g., React, AI)"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={generateTitles} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Generating..." : "Generate Titles"}
      </button>
      <h3>Generated Titles:</h3>
      <ul>
        {generatedTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
