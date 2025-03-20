import { useState } from "react";
import useMemos from "./hooks/useMemos";
import Detail from "./components/Detail";
import List from "./components/List";
import "./App.css";

function App() {
  const { memos, addMemo, updateMemo, deleteMemo } = useMemos();
  const [selectedId, setSelectedId] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const handleSelect = (id) => {
    setSelectedId(id);
    const content = memos.find((memo) => memo.id === id).content;
    setInputContent(content);
  };
  const resetMemoSelection = () => {
    setSelectedId(null);
    setInputContent("");
  };
  const handleInputChange = (e) => setInputContent(e.target.value);
  const handleAddMemo = () => {
    const newMemo = addMemo();
    setSelectedId(newMemo.id);
    setInputContent(newMemo.content);
  };
  const handleUpdateMemo = () => {
    updateMemo(selectedId, inputContent);
    resetMemoSelection();
  };
  const handleDeleteMemo = () => {
    deleteMemo(selectedId);
    resetMemoSelection();
  };

  return (
    <div className="app" onClick={resetMemoSelection}>
      <div className="index">
        <p>一覧</p>
        <List
          memos={memos}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAdd={handleAddMemo}
        />
      </div>
      <div className="edit">
        <p>編集</p>
        <div className="list_detail">
          <List
            memos={memos}
            selectedId={selectedId}
            onSelect={handleSelect}
            onAdd={handleAddMemo}
          />
          <Detail
            selectedId={selectedId}
            inputContent={inputContent}
            onInputChange={handleInputChange}
            onUpdate={handleUpdateMemo}
            onDelete={handleDeleteMemo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
