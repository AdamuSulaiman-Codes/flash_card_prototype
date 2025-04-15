

const Flashcard = ({ heading, body }) => {
  return (
    <div className="flashcard-container">
      <h3 className="flashcard-heading">{heading}</h3>
      <p className="flashcard-body">{body}</p>
    </div>
  );
};

export default Flashcard;
