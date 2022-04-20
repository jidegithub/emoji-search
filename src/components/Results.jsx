import ResultItem from "./ResultItem";

const ResultsRenderer = ({ results = [], isLoading }) => {

  const getResultItems = () => {
    if (!results) {
      return (
        <span id="no-results" role="img" aria-label={"no results"}>
          Try searching, "Love in the air!" 😉
        </span>
      );
    }

    if (Array.isArray(results) && !results.length) {
      return (
        <span id="no-results" role="img" aria-label={"no results"}>
          🤕 Nothing relevant found!!! Try something else.
        </span>
      );
    }

    return results.map((resultItem) => {
      return <ResultItem key={resultItem._id} item={resultItem} />;
    });
  };

  return <div className="results-renderer">{getResultItems()}</div>;
};

export default ResultsRenderer