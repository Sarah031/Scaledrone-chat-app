import React, { useState } from "react";

export default function Input(props) {
  const [text, setText] = useState("");

  //postavaljanje state-a za input
  function onChange(e) {
    setText(e.target.value);
  }
  //F-ija submit za input
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
        <button>Send</button>
      </form>
    </div>
  );
}
