import "../App.css";

const List = ({ memos, selectedId, onSelected, onAdd }) => {
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
              {memo.content.split("\n")[0]}
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
