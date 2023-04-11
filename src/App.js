import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import RandomColor from "./assets/RandomColor";
import RandomName from "./assets/RandomName";

export default function App() {
  //glavni state-ovi
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: RandomName(),
    color: RandomColor(),
  });
  const [drone, setDrone] = useState();
  //Used for first time loading to web app
  useEffect(() => {
    //povezivanje sa Scaledrone-om
    const drone = new window.Scaledrone(process.env.REACT_APP_SCALEDRONE_ID, {
      data: member,
    });
    setDrone(drone);
  }, [member]);

  //Uspostavljanje veze kao user
  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }

        member.id = drone.clientId;
        console.log("Uspješni log in");
        setMember(member);
      });
      //Spajanje u određenu chat sobu "observable-room"
      const room = drone.subscribe("observable-room");
      room.on("message", (message) => {
        setMessages((prevState) => [...prevState, message]);
      });
    }
  }, [drone, member]);

  //f-ija za slanje poruka u sobu
  const handleInput = (message) => {
    drone.publish({ room: "observable-room", message });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome to the chat app</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={handleInput} />
    </div>
  );
}
