import "../App.css";

const Detail = ({
  selectedId,
  inputContent,
  onUpdate,
  onDelete,
  onInputChange,
}) => {
  return (
    <div className="detail">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate();
        }}
      >
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
            onClick={(e) => e.stopPropagation()}
            disabled={!selectedId}
          >
            更新
          </button>
          <button
            className="delete"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(selectedId);
            }}
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
