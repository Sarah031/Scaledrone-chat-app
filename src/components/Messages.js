import React from "react";
import { useRef, useEffect } from "react";

function Messages({ messages, currentMember }) {
  const bottomRef = useRef(null);

  //scroll na poruke
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //Glavna logika prikazivanja poruka sa map funkcijom
  function showMessage(message) {
    const { data, member } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className} key={Math.random()}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text" ref={bottomRef}>
            {data}
          </div>
        </div>
      </li>
    );
  }

  return (
    <ul className="Messages-list">{messages.map((m) => showMessage(m))}</ul>
  );
}

export default Messages;
