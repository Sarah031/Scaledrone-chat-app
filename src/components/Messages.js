import { useRef, useEffect } from "react";
import uuid from "react-uuid";

export default function Messages({ messages, currentMember }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function showMessage(message) {
    const { data, member } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className} key={uuid()}>
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
