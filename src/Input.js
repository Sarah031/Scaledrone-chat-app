import React from "react";
import { useState } from "react";

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleAddPoruka = (e) => {
    e.prevent.default();
    setText("");
    onSendMessage(text);
  };

  return (
    <div className="Input">
      <form onSubmit={handleAddPoruka}>
        <input
          placeholder="Unesi poruku ..."
          autoFocus={true}
          value={text}
          onChange={handleChange}
        />
        <button
          disabled={!text}
          className={!text ? "button-disabled" : "button-active"}
        >
          Pošalji →
        </button>
      </form>
    </div>
  );
}

// class Input extends Component {
//   state = {
//     text: "",
//   };

//   onChange(e) {
//     this.setState({ text: e.target.value });
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     this.setState({ text: "" });
//     this.props.onSendMessage(this.state.text);
//   }

//   render() {
//     return (
//       <div className="Input">
//         <form onSubmit={(e) => this.onSubmit(e)}>
//           <input
//             onChange={(e) => this.onChange(e)}
//             value={this.state.text}
//             type="text"
//             placeholder="Upiši svoju poruku i pritisni ENTER"
//             autofocus="true"
//             onFocus={console.log("User is typing")}
//           />
//           <button>Send</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Input;
