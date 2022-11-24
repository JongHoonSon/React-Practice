import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";

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

const Read = ({ topics }) => {
  const params = useParams();
  console.log(params);
  const topicId = Number(params.id);
  const topic = topics.find((topic) => topic.id === topicId);
  return <Article title={topic.title} body={topic.body}></Article>;
};

function App() {
  const [topics, setTopics] = useImmer([]);
  const navigate = useNavigate();

  // 서버와 통신하는 사이드 이펙트
  const fetchTopics = async () => {
    const fetchedTopics = await axios.get("http://localhost:3001/topics");
    console.log("fetchedTopics", fetchedTopics);
    setTopics((oldTodos) => fetchedTopics.data);
  };

  useEffect(() => {
    console.log("hi im useEffect");
    fetchTopics();
  }, []);

  // Control 에게 줄 도시락
  const saveHanlder = (title, body) => {
    // title, body를 이용해서 topics의 값을 추가한다.
    axios
      .post("http://localhost:3001/topics", { title, body })
      .then((result) => {
        setTopics((oldTopics) => {
          oldTopics.push(result.data);
        });

        // 새로운 topic 추가 이후,
        // result.data.id를 path parameter로 갖는 URL로 이동
        navigate(`/read/${result.data.id}`);
      });
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
        <Route path="/read/:id" element={<Read topics={topics} />} />
      </Routes>
      <Control />
    </div>
  );
}

export default App;
