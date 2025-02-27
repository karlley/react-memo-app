import "../App.css";

const Detail = ({
  inputContent,
  onInputChange,
  onUpdate,
  onDelete,
  selectedId,
}) => {
  return (
    <div className="detail">
      <input
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
  );
};

export default Detail;
