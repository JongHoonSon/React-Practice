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
            onChangeMode("READ");
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

function App() {
  const topics = [
    { title: "html", body: "html is ..." },
    { title: "css", body: "css is ..." },
    { title: "js", body: "js is ..." },
  ];

  const [mode, setMode] = useState();

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Hello" body="Welcome, WEB!" />;
  } else if (mode === "READ") {
    content = <Article title="Hello" body="Welcome, READ!" />;
  }

  console.log("hello~");

  const changeModeHandler = (mode) => {
    console.log("new mode" + mode);
    if (mode === "WELCOME") {
      setMode("WELCOME");
    } else if (mode === "READ") {
      setMode("READ");
    }
  };

  return (
    <div className="App">
      <Header title="웹" onChangeMode={changeModeHandler} />
      <Nav topics={topics} onChangeMode={changeModeHandler} />
      {content}
    </div>
  );
}

export default App;
