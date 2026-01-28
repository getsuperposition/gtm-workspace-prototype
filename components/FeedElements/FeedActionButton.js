const FeedActionButton = ({ label, onClick }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default FeedActionButton;
