
const ResultItem = ({item: {_source: { emoji, label, tags }}}) => {
  return (
    <div className="result-item">
      <h4>{label}</h4>
      <span id="emoji-wrapper" role="img" aria-label={label}>
        {emoji}
      </span>
      <div className="tags">
        {tags?.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ResultItem;
