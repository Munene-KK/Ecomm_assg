const PopUp = () => {
  return (
    <article className="popup">
      <p>
        Are you sure you want to delete? <br /> This action is irreversible
      </p>
      <p>
        <button>Cancel</button>
        <button>Delete</button>
      </p>
    </article>
  );
};

export default PopUp;
