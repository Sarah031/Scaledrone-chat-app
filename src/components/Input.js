import React, { useState } from "react";

export default function Input(props) {
  const [text, setText] = useState("");

  function onChange(e) {
    setText(e.target.value.trimStart());
  }

  function onSubmit(e) {
    e.preventDefault();
    setText("");
    props.onSendMessage(text);
  }

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <input className="button" type="submit" value="Send" />
      </form>
    </div>
  );
}
