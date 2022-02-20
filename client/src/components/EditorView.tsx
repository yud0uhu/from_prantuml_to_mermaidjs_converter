import { useCallback, useEffect, useState } from "react";
import { fetchConverter } from "../action/api";
import { marked } from "marked";
import highlightjs from "highlight.js";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export function EditorView() {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      return highlightjs.highlightAuto(code, [lang]).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
  const urls = null;
  const text = `
  marmaid
  @startuml
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
  const [conv, setConv] = useState(text);

  const onChange = useCallback((value: string) => {
    // 文字列に「marmaid」が含まれていた場合APIを叩く
    if (value.match(/marmaid/g))
      fetchConverter(value).then((urls) => {
        setConv(urls);
        console.log("convert");
      });
  }, []);

  return (
    <section>
      <SimpleMdeReact value={conv} onChange={onChange} />
      <h1>Convert Preview</h1>
      <p>{conv}</p>
    </section>
  );
}
