import "./App.css";

const Header = ({ title, onChangeMode }) => {
  return (
    <header>
      <h1>
        <a
          href="index.html"
          onClick={(evt) => {
            evt.preventDefault();
            onChangeMode();
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
            onChangeMode();
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
  let mode = "WELCOME";
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Hello" body="Welcome, WEB!" />;
  } else if (mode === "READ") {
    content = <Article title="Hello" body="Welcome, READ!" />;
  }

  return (
    <div className="App">
      <Header
        title="웹"
        onChangeMode={() => {
          alert("WELCOME");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={() => {
          alert("READ");
        }}
      />
      {content}
    </div>
  );
}

export default App;
