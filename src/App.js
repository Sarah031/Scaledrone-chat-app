import "./App.css";
import { useEffect, useState } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import randomColor from "./helpers/randomColor";
import randomName from "./helpers/randomName";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState();

  useEffect(() => {
    const drone = new window.Scaledrone(process.env.REACT_APP_SCALEDRONE_ID, {
      data: member,
    });
    setDrone(drone);
  }, [member]);

  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }

        member.id = drone.clientId;
        setMember(member);
      });

      const room = drone.subscribe("observable-room");
      room.on("message", (message) => {
        setMessages((prevState) => [...prevState, message]);
      });
    }
  }, [drone, member]);

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
