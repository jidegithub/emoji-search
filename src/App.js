import { useState } from "react";
import appbasejs from "appbase-js";
import Results from "./components/Results"
import SentimentStats from "./components/SentinentStats"
import './App.css';

const appbaseRef = appbasejs({
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "emoji-dataset",
  credentials: "f1da7b624918:3331c67d-3477-4b24-aa89-aefc6ca4683e"
})

function App() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({
    isLoading: false,
    data: null
  })
  const [sentimentData, setSentimentData] = useState([])
  const [scriptTime, setScriptTime] = useState(0)

  const queryDataSet = () => {
    setData({ isLoading: true })
    const SEARCH_ID = "emoji_search";
    appbaseRef.reactiveSearch(
      [
        {
          id: SEARCH_ID,
          size: 10,
          ...(searchText && { value: searchText})
        }
      ],
      {
        enableQueryRules: true
      }
    ).then((result) => {
      setData({ isLoading:false, data: result[SEARCH_ID].hits.hits})
      setSentimentData(result.analysis)
      setScriptTime(result?.settings?.script_took ?? 0)
    })
    .catch(({ message }) => {
      console.log('search error: ', message)
    })
  }

  return (
    <div className="app-root">
      <div className="input-wrapper">
        <input
          name="search-field"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="Try searching, 'man swimming' "
        />
        <button id="recommend-btn" onClick={queryDataSet}>
          Recommend
        </button>
      </div>
      <SentimentStats sentimentData={sentimentData} scriptTime={scriptTime} />
      <div className="result-wrapper">
        <Results results={data.data} isLoading={data.isLoading} />
      </div>
    </div>
  );
}

export default App;
