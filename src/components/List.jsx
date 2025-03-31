import { useLogin } from "../hooks/useLogin";
import "../App.css";

const List = ({ memos, selectedId, onSelect, onAdd }) => {
  const { isLoggedIn } = useLogin();
  const setTitle = (content) => {
    const line = content.split("\n")[0];
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
              onClick={(e) => {
                e.stopPropagation();
                onSelect(memo.id);
              }}
            >
              {setTitle(memo.content)}
            </li>
          );
        })}
        <li
          className={isLoggedIn ? "" : "disabled"}
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
