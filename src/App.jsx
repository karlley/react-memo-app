import { useState, useEffect } from "react";
import Detail from "./components/Detail";
import List from "./components/List";
import "./App.css";

function App() {
  const [memos, setMemos] = useState(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos"));
    return storedMemos ? storedMemos : [];
  });
  const [selectedId, setSelectedId] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const selectMemo = (id, content) => {
    setSelectedId(id);
    setInputContent(content);
  };
  const deselectMemo = () => selectMemo(null, "");
  const addMemo = () => {
    const newMemo = { id: crypto.randomUUID(), content: "新規メモ" };
    const newMemos = [...memos, newMemo];
    selectMemo(newMemo.id, newMemo.content);
    setMemos(newMemos);
  };
  const updateMemo = () => {
    if (!selectedId) return;
    const updateMemo = {
      id: memos.find((memo) => memo.id === selectedId).id,
      content: inputContent,
    };
    const newMemos = memos.map((memo) =>
      memo.id === selectedId ? updateMemo : memo,
    );
    deselectMemo();
    setMemos(newMemos);
  };
  const deleteMemo = () => {
    if (!selectedId) return;
    const newMemos = memos.filter((memo) => memo.id !== selectedId);
    deselectMemo();
    setMemos(newMemos);
  };
  const handleSelectMemo = (id, e) => {
    e.stopPropagation();
    const selectedContent = memos.find((memo) => memo.id === id).content;
    selectMemo(id, selectedContent);
  };
  const handleInputChange = (e) => setInputContent(e.target.value);
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  return (
    <div className="app" onClick={deselectMemo}>
      <div className="index">
        <p>一覧</p>
        <List
          memos={memos}
          selectedId={selectedId}
          onSelect={handleSelectMemo}
          onAdd={addMemo}
        />
      </div>
      <div className="edit">
        <p>編集</p>
        <div className="list_detail">
          <List
            memos={memos}
            selectedId={selectedId}
            onSelect={handleSelectMemo}
            onAdd={addMemo}
          />
          <Detail
            inputContent={inputContent}
            onInputChange={handleInputChange}
            onUpdate={updateMemo}
            onDelete={deleteMemo}
            selectedId={selectedId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
