import { useState, useEffect } from "react";

const useMemoManager = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [memos, setMemos] = useState(() => {
    const storedMemos = JSON.parse(localStorage.getItem("memos"));
    return storedMemos ? storedMemos : [];
  });
  const [inputContent, setInputContent] = useState("");
  const selectMemo = (id, content) => {
    setSelectedId(id);
    setInputContent(content);
  };

  const handleAdd = () => {
    if (selectedId) return;
    const newMemo = { id: crypto.randomUUID(), content: "新規メモ" };
    const newMemos = [...memos, newMemo];
    selectMemo(newMemo.id, newMemo.content);
    setMemos(newMemos);
  };
  const handleUpdate = () => {
    if (!selectedId) return;
    const updateMemo = {
      id: memos.find((memo) => memo.id === selectedId).id,
      content: inputContent,
    };
    const newMemos = memos.map((memo) =>
      memo.id === selectedId ? updateMemo : memo,
    );
    selectMemo(null, "");
    setMemos(newMemos);
  };
  const handleDelete = () => {
    if (!selectedId) return;
    const newMemos = memos.filter((memo) => memo.id !== selectedId);
    selectMemo(null, "");
    setMemos(newMemos);
  };
  const handleSelect = (id, e) => {
    e.stopPropagation();
    const selectedContent = memos.find((memo) => memo.id === id).content;
    selectMemo(id, selectedContent);
  };
  const handleDeselect = () => selectMemo(null, "");
  const handleInputChange = (e) => setInputContent(e.target.value);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  return {
    selectedId,
    memos,
    inputContent,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleSelect,
    handleDeselect,
    handleInputChange,
  };
};

export default useMemoManager;
