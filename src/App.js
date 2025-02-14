import { useCallback, useState } from "react";
import "./App.css";

const dummyMemos = [
  { id: 1, content: "memo1\n text text text" },
  { id: 2, content: "memo2\n text text text" },
  { id: 3, content: "memo3\n text text text" },
];

function List({ dummyMemos, selected, onSelected }) {
  const extractTitle = (memo) => memo.content.split("\n")[0];
  const applySelectedClass = (memo) =>
    memo.id - 1 === selected ? "selected" : "";
  return (
    <div className="list">
      <ul>
        {dummyMemos.map((memo) => (
          <li
            key={memo.id}
            className={applySelectedClass(memo)}
            onClick={() => onSelected(memo.id - 1)}
          >
            {extractTitle(memo)}
          </li>
        ))}
        <li>+</li>
      </ul>
    </div>
  );
}

function Detail({ dummyMemos, selected }) {
  const memo = dummyMemos[selected];
  return (
    <div className="detail">
      <input value={memo.content} />
      <div className="action">
        <button className="update">更新</button>
        <button className="delete">削除</button>
      </div>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="app">
      <div className="index">
        <p>一覧</p>
        <List
          dummyMemos={dummyMemos}
          selected={selected}
          onSelected={setSelected}
        />
      </div>
      <div className="edit">
        <p>編集</p>
        <div className="list_detail">
          <List
            dummyMemos={dummyMemos}
            selected={selected}
            onSelected={setSelected}
          />
          <Detail dummyMemos={dummyMemos} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;
