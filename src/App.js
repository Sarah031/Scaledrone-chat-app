import React, { useState, useEffect } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

export default function App() {
  //Random pridjevi
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

    //Kreiranje random imena
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + " " + noun;
  }
  //Kreiranje random boje
  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  //GLavni state-ovi
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });

  //Spajanje sa Scaledrone-om
  const drone = new window.Scaledrone(process.env.REACT_APP_CLIENT_ID, {
    data: member,
  });
  //Kreiranje veze kao user
  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    member.id = drone.clientId;
    setMember(member);
  });
  const room = drone.subscribe("observable-room");
  //Spajanje sa chat mjestom i povlačenje poruka
  useEffect(() => {
    room.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
    });
  }, []);

  //Funkcija za slanje poruka u određenu chat sobu
  const handleInput = (message) => {
    drone.publish({ room: "observable-room", message });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Chat app</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={handleInput} />
    </div>
  );
}
