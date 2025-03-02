import "../App.css";

const List = ({ memos, selectedId, onSelected, onAdd }) => {
  const setTitle = (memo) => {
    const line = memo.content.split("\n")[0];
    return line.trim() === "" ? "タイトルがありません" : line;
  };
  return (
    <div className="list">
      <ul>
        {memos.map((memo) => {
          const isSelected = memo.id === selectedId;
          return (
            <li
              key={memo.id}
              className={isSelected ? "selected" : ""}
              onClick={(e) => onSelected(memo.id, e)}
            >
              {setTitle(memo)}
            </li>
          );
        })}
        <li
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          +
        </li>
      </ul>
    </div>
  );
};

export default List;
