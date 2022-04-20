
const SentimentStats = ({ sentimentData, scriptTime }) => {
  console.log({sentimentData, scriptTime})
  if (!Array.isArray(sentimentData) || sentimentData.length === 0) {
    return null;
  }

  return (
    <div className="sentiment-stats">
      {sentimentData?.map((sentimentObject, idx) => (
        <div key={idx} className="sentiment-sentence">
          <div className="sentiment-sentence__stats">
            <div className="sentiment-sentence__stats--meta">
              <span>
                Confidence: {sentimentObject.stats.confidence.toFixed(2)}
              </span>
              <span>
                Sentiment Score: {sentimentObject.profile.sentiment.toFixed(2)}
              </span>
              <span>
                Amplitude: {sentimentObject.profile.amplitude.toFixed(2)}
              </span>
              <span>
                emphasis: {sentimentObject.profile.emphasis.toFixed(2)}
              </span>
            </div>

            <div className="sentiment-sentence__stats--types">
              {sentimentObject.profile.types.map((type) => (
                <span key={type}>{type}</span>
              ))}
              <span className={sentimentObject.profile.label}>
                {sentimentObject.profile.label}
              </span>
            </div>
          </div>
          <div className="sentiment-sentence__token-data">
            {sentimentObject.tokens.map((token, tokenIndex) => {
              let entityIndex = -1;
              for (
                let index = 0;
                index < sentimentObject.entities.length;
                index++
              ) {
                let entity = sentimentObject.entities[index];
                if (
                  entity.raw === token.raw &&
                  entity.fromIndex === tokenIndex
                ) {
                  entityIndex = index;
                  break;
                }
              }

              return (
                <div
                  key={tokenIndex}
                  className={`token ${entityIndex !== -1 ? "entity-item" : ""}`}
                >
                  <span
                    id="raw"
                    className={`${
                      token.profile.emphasis > 1 ? "emphasis" : ""
                    } ${
                      token.profile.sentiment > 0
                        ? "positive"
                        : token.profile.sentiment < 0
                        ? "negative"
                        : ""
                    } `}
                  >
                    {token.raw}
                    {entityIndex !== -1 ? (
                      <span className="entity">
                        {sentimentObject.entities[entityIndex].type}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span id="pos">
                    {token.pos}{" "}
                    {token.profile.sentiment
                      ? `/ ${token.profile.sentiment.toFixed(2)}`
                      : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="sentiment-sentence__time-taken">
        Total time: {scriptTime} milliseconds
      </div>
    </div>
  );
};

export default SentimentStats;
