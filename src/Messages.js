import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Messages({ messages, currentMember }) {
  // const krajListe = useRef(null);

  // useEffect(() => {
  //   krajListe.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const renderMessage = (message, index) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
        ;
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m, index) => renderMessage(m, index))}
    </ul>
  );
}
