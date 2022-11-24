import "./App.css";
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header>
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    </header>
  );
};

const Nav = ({ topics }) => {
  const liTag = topics.map((t) => {
    return (
      <li key={t.id}>
        <Link to={"/read/" + t.id}>{t.title}</Link>
      </li>
    );
  });
  return (
    <nav>
      <ul>{liTag}</ul>
    </nav>
  );
};

const Article = ({ title, body }) => {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
};

const Control = () => {
  return (
    <ul>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        <Link to="/update">Update</Link>
      </li>
    </ul>
  );
};

const Create = ({ onSave }) => {
  const submitHandler = (evt) => {
    evt.preventDefault();

    const title = evt.target.title.value;
    const body = evt.target.body.value;

    onSave(title, body);
  };

  return (
    <form onSubmit={submitHandler}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="Create" />
      </p>
    </form>
  );
};

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);

  const [nextId, setNextId] = useState(4);
  const navigate = useNavigate();

  // Control 에게 줄 도시락
  const saveHanlder = (title, body) => {
    // title, body를 이용해서 topics의 값을 추가한다.
    console.log(title, body);

    // topics.push({ id: nextId, title, body });
    const newTopics = [...topics];
    newTopics.push({ id: nextId, title, body });
    setTopics(newTopics);
    setNextId(nextId + 1);
    navigate(`/read/${nextId}`);
  };

  return (
    <div className="App">
      <Header title="웹" />
      <Nav topics={topics} />
      <Routes>
        <Route
          path="/"
          element={<Article title="Hello" body="Welcome, WEB!" />}
        />
        <Route path="/create" element={<Create onSave={saveHanlder} />}></Route>
        <Route path="/update" element={<>Update</>} />
        <Route path="/read/:id" element={<Article></Article>} />
      </Routes>
      <Control />
    </div>
  );
}

export default App;
