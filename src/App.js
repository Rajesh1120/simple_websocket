
import './App.css';
import io from "socket.io-client"
import {useEffect,useState} from "react";
const socket=io.connect("http://localhost:3001")


function App() {

  const [msg,setmsg]=useState("")
  const [messageReceived,setmessageReceived]=useState("")
  const sendMessage=()=>{
    socket.emit("send_message", {msg , room})
  }

useEffect(()=>{

  socket.on("receive_message",(data)=>{
    setmessageReceived(data.msg)
  })
},[socket])
const [room , setRoom]=useState("")

const joinRoom=()=>{
  if(room !== ""){
    socket.emit("join_room",room);
  }
}

  return (
    <div className="App">
      <input type="text" onChange={(e)=>{setRoom(e.target.value)}} placeholder='roomnumber..' />
      <button onClick={joinRoom}>Join Room</button>
      <br />
      <input type="text" onChange={(e)=>{
        setmsg(e.target.value)}} placeholder="enter Message."/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
