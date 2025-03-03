import "../App.css";

const Detail = ({
  selectedId,
  inputContent,
  onUpdate,
  onDelete,
  onInputChange,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="detail">
        <textarea
          value={inputContent}
          onChange={onInputChange}
          onClick={(e) => e.stopPropagation()}
          disabled={!selectedId}
        />
        <div className="action">
          <button className="update" onClick={onUpdate} disabled={!selectedId}>
            更新
          </button>
          <button className="delete" onClick={onDelete} disabled={!selectedId}>
            削除
          </button>
        </div>
      </div>
    </form>
  );
};

export default Detail;
