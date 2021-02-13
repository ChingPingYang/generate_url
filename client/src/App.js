import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState("");
  const handleOnchange = (e) => setInputUrl(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        longUrl: inputUrl,
      };
      const res = await axios.post("/api/url", body, config);

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          className="myInput"
          onChange={handleOnchange}
          value={inputUrl}
          placeholder="Please feed me an url."
        />
        <button type="submit">submit</button>
      </form>
      <h3>Your input: {inputUrl}</h3>
      {error && <h4 className="error">{error}</h4>}
      {shortUrl && (
        <>
          <div className="wrapper">
            <h2>Your new url</h2>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
