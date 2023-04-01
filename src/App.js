import React, { useState, useEffect } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "Maria",
    "Pamela",
    "Vedrana",
    "Anne",
    "Dora",
    "Missy",
    "Zoe",
    "Tea",
    "Petra",
    "Gabi",
    "Iva",
    "Barbara",
    "Veronica",
    "Ivana",
    "Vera",
    "Leonarda",
    "Patricia",
    "Estee",
    "Amelia",
    "Kenza",
    "Avril",
    "Reese",
    "Emilia",
    "Alessia",
    "Katarina",
    "Cath",
    "Nikki",
    "Nicole",
    "Hana",
    "Lena",
    "Simona",
    "Martina",
    "Sanja",
    "Vesna",
    "Daniela",
    "Ela",
    "Elizabeta",
    "Marina",
    "Irena",
    "Tanja",
    "Vanja",
    "Lea",
    "Mila",
    "Tena",
    "Andriana",
    "Jelena",
    "Jelka",
    "Mara",
    "Sara",
    "Jana",
  ];
  const nouns = [
    "rose",
    "lilly",
    "tulip",
    "hyacinth",
    "peruvian lily",
    "chrysanthenum",
    "deep rose",
    "daisy",
    "marigold",
    "violet",
    "alpenrose",
    "amaryllis",
    "lotus",
    "wisteria",
    "hyssop",
    "aztec lilly",
    "iris",
    "beeblossom",
    "begonia",
    "lantana",
    "bearberry",
    "lechenaultia",
    "bluestar",
    "bluet",
    "plume",
    "bussy lizzie",
    "poppy",
    "calla",
    "camelia",
    "sorrel",
    "candytuft",
    "leadwort",
    "climber",
    "carnation",
    "catmint",
    "clematis",
    "cliffbush",
    "rose",
    "cockcomb",
    "primrose",
    "gorse",
    "lilac",
    "mallow",
    "orchid",
    "varvain",
    "zinnia",
    "conflower",
    "bells",
    "wildflower",
    "cranesbill",
    "mahonia",
    "mazus",
    "phlox",
    "cyclamen",
    "daffodil",
    "dahlias",
    "daylily",
    "hyacinth",
    "lavander",
    "feverfew",
    "fiddleneck",
    "fuchsisas",
    "peony",
    "daisy",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + " " + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    name: randomName(),
    color: randomColor(),
  });

  const [drone, setDrone] = useState(null);

  const [activeMembers, setActiveMembers] = useState([]);

  useEffect(() => {
    const drone = new window.Scaledrone("OgkDgDl9bscrfxLg", {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = drone.clientId;
      setMember(updatedMember);
    });
    const room = drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      setMessages((messages) => [...messages, { member, text: data }]);
    });

    room.on("members", (members) => {
      const allMembers = members;
      setActiveMembers(allMembers);
    });

    room.on("member_join", (member) => {
      const allMembers = (activeMembers) => [...activeMembers, member];
      setActiveMembers(allMembers);
      console.log(member.clientData.username);
      console.log(member.clientData.color);
      console.log(activeMembers);
    });
    room.on("member_leave", (member) => {
      setActiveMembers((activeMembers) =>
        activeMembers.filter((m) => m.id !== member.id)
      );
    });
    setDrone(drone);
  }, [member, activeMembers]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chat</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
