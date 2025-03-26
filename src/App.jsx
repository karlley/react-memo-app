import { useState, useEffect } from "react";
import useMemos from "./hooks/useMemos";
import Detail from "./components/Detail";
import List from "./components/List";
import "./App.css";

function App() {
  const { memos, addMemo, updateMemo, deleteMemo } = useMemos();
  const [selectedId, setSelectedId] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    return storedIsLoggedIn || false;
  });

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
    if (!isLoggedIn) return;
    const newMemo = addMemo();
    setSelectedId(newMemo.id);
    setInputContent(newMemo.content);
  };
  const handleUpdateMemo = () => {
    if (!isLoggedIn) return;
    updateMemo(selectedId, inputContent);
    resetMemoSelection();
  };
  const handleDeleteMemo = () => {
    if (!isLoggedIn) return;
    deleteMemo(selectedId);
    resetMemoSelection();
  };
  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div className="app" onClick={resetMemoSelection}>
      <div className="index">
        <div className="header">
          <h2>一覧</h2>
          <p className="loginStatus">
            {isLoggedIn ? "ログイン済み" : "未ログイン"}
          </p>
        </div>
        <List
          memos={memos}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAdd={handleAddMemo}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="edit">
        <h2>編集</h2>
        <div className="list_detail">
          <List
            memos={memos}
            selectedId={selectedId}
            onSelect={handleSelect}
            onAdd={handleAddMemo}
            isLoggedIn={isLoggedIn}
          />
          <Detail
            selectedId={selectedId}
            inputContent={inputContent}
            onInputChange={handleInputChange}
            onUpdate={handleUpdateMemo}
            onDelete={handleDeleteMemo}
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
