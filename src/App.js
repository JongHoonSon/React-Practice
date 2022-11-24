import "./App.css";
import { useState } from "react";

const Header = ({ title, onChangeMode }) => {
  return (
    <header>
      <h1>
        <a
          href="index.html"
          onClick={(evt) => {
            evt.preventDefault();
            onChangeMode("WELCOME");
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
};

const Nav = ({ topics, onChangeMode }) => {
  const liTag = topics.map((t) => {
    return (
      <li key={t.id}>
        <a
          href={"/read/" + t.id}
          onClick={(evt) => {
            evt.preventDefault();
            onChangeMode("READ", t.id);
          }}
        >
          {t.title}
        </a>
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

const Control = ({ onChangeMode }) => {
  const createClickHanlder = (evt) => {
    evt.preventDefault();
    onChangeMode("CREATE");
  };

  const updateClickHanlder = (evt) => {
    evt.preventDefault();
    onChangeMode("UPDATE");
  };

  return (
    <ul>
      <li>
        <a href="/create" onClick={createClickHanlder}>
          Create
        </a>
      </li>
      <li>
        <a href="/update" onClick={updateClickHanlder}>
          Update
        </a>
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

  const [mode, setMode] = useState();
  const [topicId, setTopicId] = useState("null");
  const [nextId, setNextId] = useState(4);

  let content = null;

  // Header, Nav, Control 에게 줄 도시락
  const changeModeHandler = (mode, topicId) => {
    setMode(mode);
    console.log("topicId");
    console.log(topicId);
    // Nav에 존재하는 각 Topic에 대한 li을 누른 경우 topicId를 넘김
    if (topicId !== undefined) {
      setTopicId(topicId);
    }
  };

  // Control 에게 줄 도시락
  const saveHanlder = (title, body) => {
    // title, body를 이용해서 topics의 값을 추가한다.
    console.log(title, body);

    // topics.push({ id: nextId, title, body });
    const newTopics = [...topics];
    newTopics.push({ id: nextId, title, body });
    setTopics(newTopics);
    setMode("READ"); // 새로 생성된 Topic으로 컴포넌트 전환 과정1
    setTopicId(nextId); // 새로 생성된 Topic으로 컴포넌트 전환 과정2
    setNextId(nextId + 1);
  };

  if (mode === "WELCOME") {
    content = <Article title="Hello" body="Welcome, WEB!" />;
  } else if (mode === "READ") {
    const currentTopic = topics.find((topic) => topic.id === topicId);
    content = (
      <Article
        title={currentTopic.title}
        body={"Welcome, " + currentTopic.body}
      />
    );
    console.log(currentTopic);
  } else if (mode === "CREATE") {
    content = <Create onSave={saveHanlder} />;
  } else if (mode === "UPDATE") {
    content = <div>Update</div>;
  }

  console.log("hello~");

  return (
    <div className="App">
      <Header title="웹" onChangeMode={changeModeHandler} />
      <Nav topics={topics} onChangeMode={changeModeHandler} />
      {content}
      <Control onChangeMode={changeModeHandler} />
    </div>
  );
}

export default App;
