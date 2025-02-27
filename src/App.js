import useMemoManager from "./hooks/useMemoManager";
import Detail from "./components/Detail";
import List from "./components/List";
import "./App.css";

function App() {
  const {
    selectedId,
    memos,
    inputContent,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleSelect,
    handleDeselect,
    handleInputChange,
  } = useMemoManager();

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
