import { useEffect, useState } from "react";
import { fetchConverter } from "../action/api";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function EditorView() {
  const [conv, setConv] = useState("");
  const urls = null;
  const text = `@startuml
  participant Participant as Foo
  actor       Actor       as Foo1
  boundary    Boundary    as Foo2
  control     Control     as Foo3
  entity      Entity      as Foo4
  database    Database    as Foo5
  collections Collections as Foo6
  queue       Queue       as Foo7
  Foo -> Foo1 : To actor 
  Foo -> Foo2 : To boundary
  Foo -> Foo3 : To control
  Foo -> Foo4 : To entity
  Foo -> Foo5 : To database
  Foo -> Foo6 : To collections
  Foo -> Foo7: To queue
  @enduml
  `;

  useEffect(() => {
    fetchConverter(text).then((urls) => {
      //   console.log(urls);
      setConv(urls);
    });
  }, []);

  return (
    <ReactMarkdown
      children={conv}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={docco}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
