import "./App.scss";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-funky.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

const Editor = ({
  content,
  handleTextAreaChange,
  maximize,
  handleMaximize,
}) => {
  return (
    <div
      className={`editor-container ${maximize === "editor" ? "maximize" : ""}`}
    >
      <div className="notch">
        <span>Editor</span>
        <div
          className="maximize-btn"
          title="expand"
          onClick={handleMaximize}
        ></div>
      </div>
      <textarea
        id="editor"
        name="editor"
        onChange={handleTextAreaChange}
        value={content}
        rows={30}
      />
    </div>
  );
};

const Previewer = ({ content, maximize, handleMaximize }) => {
  const html = marked.parse(content, { breaks: true, gfm: true });
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);
  console.log(html);
  return (
    <div
      className={`preview-container ${
        maximize === "previewer" ? "maximize" : ""
      }`}
    >
      <div className="notch">
        <span>Previewer</span>
        <div
          title="expand"
          className="maximize-btn"
          onClick={handleMaximize}
        ></div>
      </div>
      <div id="preview" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

const defaultContent = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![cat](https://preview.redd.it/coding-cat-is-raising-your-productivity-3-v0-dtkrm36qtnb81.png?auto=webp&s=bf17359fa9c55f41e0e1910558f4a8475b28091c)
`;

function App() {
  const [content, setContent] = useState(defaultContent);
  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };
  const [maximize, setMaximize] = useState("");
  const handleMaximize = (which) => {
    setMaximize(maximize === which ? "" : which);
  };

  return (
    <div className="App">
      <Editor
        content={content}
        handleTextAreaChange={handleTextAreaChange}
        maximize={maximize}
        handleMaximize={() => handleMaximize("editor")}
      />
      <Previewer
        content={content}
        maximize={maximize}
        handleMaximize={() => handleMaximize("previewer")}
      />
    </div>
  );
}

export default App;
