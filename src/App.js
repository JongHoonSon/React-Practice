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

const Controller = () => {
  return (
    <ul>
      <li>
        <a herf="/create">Create</a>
      </li>
    </ul>
  );
};

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  const [mode, setMode] = useState();
  const [topicId, setTopicId] = useState("null");

  let content = null;

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
  }

  console.log("hello~");

  const changeModeHandler = (mode, topicId) => {
    setMode(mode);
    if (topicId !== undefined) {
      setTopicId(topicId);
    }
  };

  return (
    <div className="App">
      <Header title="웹" onChangeMode={changeModeHandler} />
      <Nav topics={topics} onChangeMode={changeModeHandler} />
      {content}
      <Controller />
    </div>
  );
}

export default App;
