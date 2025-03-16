import "../App.css";

const Detail = ({
  selectedId,
  inputContent,
  onUpdate,
  onDelete,
  onInputChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.name;
    if (action === "update") {
      onUpdate();
    } else if (action === "delete") {
      onDelete();
    }
  };

  return (
    <div className="detail">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={inputContent}
          onChange={onInputChange}
          onClick={(e) => e.stopPropagation()}
          disabled={!selectedId}
        />
        <div className="action">
          <button
            className="update"
            type="submit"
            name="update"
            onClick={(e) => e.stopPropagation()}
            disabled={!selectedId}
          >
            更新
          </button>
          <button
            className="delete"
            type="submit"
            name="delete"
            onClick={(e) => e.stopPropagation()}
            disabled={!selectedId}
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
