import React,{useEffect, useState} from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({messages}){
    const [seed,setSeed] =useState("")

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])
    return <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
        <div className="sidebarChat__info">
            <h2>Test Rooms</h2>
            <p>{messages[messages.length -1]?.message}</p>
        </div>
    </div>;
}

export default SidebarChat;