import useMemoManager from "./hooks/useMemoManager";
import Detail from "./components/Detail";
import List from "./components/List";
import "./App.css";

function App() {
  const {
    selectedId,
    memos,
    inputContent,
    addMemo,
    updateMemo,
    deleteMemo,
    deselectMemo,
    handleSelectMemo,
    handleInputChange,
  } = useMemoManager();

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
