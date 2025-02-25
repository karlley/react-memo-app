import { useState } from "react";
import "./App.css";

function List({ memos, selectedId, onSelected, onAdd }) {
  const extractTitle = (memo) => memo.content.split("\n")[0];
  const applySelectedClass = (id) => (id === selectedId ? "selected" : "");
  return (
    <div className="list">
      <ul>
        {memos.map((memo) => (
          <li
            key={memo.id}
            className={applySelectedClass(memo.id)}
            onClick={(e) => onSelected(memo.id, e)}
          >
            {extractTitle(memo)}
          </li>
        ))}
        <li
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className={selectedId ? "disabled" : ""}
        >
          +
        </li>
      </ul>
    </div>
  );
}

function Detail({
  inputContent,
  onInputChange,
  onUpdate,
  onDelete,
  selectedId,
}) {
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
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [memos, setMemos] = useState(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos"));
    return storedMemos ? storedMemos : [];
  });
  const [inputContent, setInputContent] = useState("");

  const handleAdd = () => {
    if (selectedId) return;
    const newMemo = { id: crypto.randomUUID(), content: "新規メモ" };
    const newMemos = [...memos, newMemo];
    setSelectedId(newMemo.id);
    setMemos(newMemos);
    setInputContent(newMemo.content);
    localStorage.setItem("memos", JSON.stringify(newMemos));
  };
  const handleUpdate = () => {
    if (!selectedId) return;
    const updateMemo = {
      id: memos.find((memo) => memo.id === selectedId).id,
      content: inputContent,
    };
    const newMemos = memos.map((memo) => {
      return memo.id === selectedId ? updateMemo : memo;
    });
    setSelectedId(null);
    setMemos(newMemos);
    setInputContent("");
    localStorage.setItem("memos", JSON.stringify(newMemos));
  };
  const handleDelete = () => {
    if (!selectedId) return;
    const deleteMemo = memos.find((memo) => memo.id === selectedId);
    const newMemos = memos.filter((memo) => memo.id !== deleteMemo.id);
    setSelectedId(null);
    setMemos(newMemos);
    setInputContent("");
    localStorage.setItem("memos", JSON.stringify(newMemos));
  };
  const handleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedId(id);
    setInputContent(memos.find((memo) => memo.id === id).content);
  };
  const handleDeselect = () => {
    setSelectedId(null);
    setInputContent("");
  };
  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  return (
    <div className="app" onClick={handleDeselect}>
      <div className="index">
        <p>一覧</p>
        <List
          memos={memos}
          selectedId={selectedId}
          onSelected={handleSelect}
          onAdd={handleAdd}
        />
      </div>
      <div className="edit">
        <p>編集</p>
        <div className="list_detail">
          <List
            memos={memos}
            selectedId={selectedId}
            onSelected={handleSelect}
            onAdd={handleAdd}
          />
          <Detail
            inputContent={inputContent}
            onInputChange={handleInputChange}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            selectedId={selectedId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
