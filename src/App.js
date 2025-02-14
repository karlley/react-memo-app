import { useCallback, useState } from "react";
import "./App.css";

function List({ memos, selectedId, onSelected, onAdd }) {
  const extractTitle = (memo) => memo.content.split("\n")[0];
  const applySelectedClass = (id) => (id - 1 === selectedId ? "selected" : "");
  return (
    <div className="list">
      <ul>
        {memos.map((memo) => (
          <li
            key={memo.id}
            className={applySelectedClass(memo.id)}
            onClick={() => onSelected(memo.id - 1)}
          >
            {extractTitle(memo)}
          </li>
        ))}
        <li onClick={() => onAdd()}>+</li>
      </ul>
    </div>
  );
}

function Detail({ inputContent, onInputChange, onUpdate }) {
  return (
    <div className="detail">
      <input value={inputContent} onChange={onInputChange} />
      <div className="action">
        <button className="update" onClick={onUpdate}>更新</button>
        <button className="delete">削除</button>
      </div>
    </div>
  );
}

function App() {
  const dummyMemos = [
    { id: 1, content: "memo1\n text text text" },
    { id: 2, content: "memo2\n text text text" },
    { id: 3, content: "memo3\n text text text" },
  ];
  const memosJson = JSON.stringify(dummyMemos);
  localStorage.setItem("memos", memosJson);
  const [selectedId, setSelectedId] = useState(0);
  const [memos, setMemos] = useState(JSON.parse(localStorage.getItem("memos")));
  const [inputContent, setInputContent] = useState(memos[selectedId].content);
  const handleAdd = () => {
    const newMemo = { id: memos.length + 1, content: "新規メモ" };
    const updateMemos = [...memos, newMemo];
    const newSelectedId = updateMemos.length - 1;
    setMemos(updateMemos);
    setSelectedId(newSelectedId);
    setInputContent(updateMemos[newSelectedId].content);
    localStorage.setItem("memos", JSON.stringify(updateMemos));
  };
  const handleUpdate = () => {
    const updateMemo = { id: memos[selectedId].id, content: inputContent };
    const updateMemos = memos.map((memo, index) => {
      return index === selectedId ? updateMemo : memo
    })
    setMemos(updateMemos);
    localStorage.setItem("memos", JSON.stringify(updateMemos));
  }
  const handleSelect = (id) => {
    setSelectedId(id);
    setInputContent(memos[id].content);
  };
  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  return (
    <div className="app">
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
