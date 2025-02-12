import './App.css';

const dummyMemo = [
  { id: 1, content: 'title\n text text text'},
  { id: 2, content: 'title\n text text text'},
  { id: 3, content: 'title\n text text text'}
]

function List({dummyMemo}) {
  return (
      <div className="list">
        <ul>
          {dummyMemo.map(memo => (
            <li key={memo.id}><a href="">{memo.content.split('\n')[0]}</a></li>
          ))}
          <li><a href="">+</a></li>
        </ul>
      </div>
  )
}

function App() {
  return (
    <div className="app">
      <div className="index">
        <p>一覧</p>
        <List dummyMemo={dummyMemo} />
      </div>
      <div className="edit">
        <p>編集</p>
        <div className="list_detail">
          <List dummyMemo={dummyMemo} />
          <div className="detail">
            <input></input>
            <div className="action">
              <button className="update">更新</button>
              <button className="delete">削除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
