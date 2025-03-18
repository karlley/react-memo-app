import { useState, useEffect } from "react";

const useMemoManager = () => {
  const [memos, setMemos] = useState(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos"));
    return storedMemos ? storedMemos : [];
  });
  const addMemo = () => {
    const newMemo = { id: crypto.randomUUID(), content: "新規メモ" };
    const newMemos = [...memos, newMemo];
    setMemos(newMemos);
    return newMemo;
  };
  const updateMemo = (id, content) => {
    const updateMemo = {
      id: memos.find((memo) => memo.id === id).id,
      content: content,
    };
    const newMemos = memos.map((memo) => (memo.id === id ? updateMemo : memo));
    setMemos(newMemos);
  };
  const deleteMemo = (id) => {
    const newMemos = memos.filter((memo) => memo.id !== id);
    setMemos(newMemos);
  };
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  return {
    memos,
    addMemo,
    updateMemo,
    deleteMemo,
  };
};

export default useMemoManager;
