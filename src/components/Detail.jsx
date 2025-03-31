import { useLogin } from "../hooks/useLogin";
import "../App.css";

const Detail = ({
  selectedId,
  inputContent,
  onUpdate,
  onDelete,
  onInputChange,
}) => {
  const { isLoggedIn, login } = useLogin();
  const handleLogin = () => login();

  return (
    <div className="detail">
      <div className="login">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLogin();
          }}
        >
          {isLoggedIn ? "ログアウト" : "ログイン"}
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate();
        }}
      >
        <textarea
          value={inputContent}
          onChange={onInputChange}
          onClick={(e) => e.stopPropagation()}
          disabled={!selectedId || !isLoggedIn}
        />
        <div className={isLoggedIn ? "action" : "action disabled"}>
          <button
            className="update"
            type="submit"
            onClick={(e) => e.stopPropagation()}
            disabled={!selectedId}
          >
            更新
          </button>
          <button
            className="delete"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(selectedId);
            }}
            disabled={!selectedId}
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
