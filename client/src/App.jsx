import React, { useState } from 'react';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import Cookies from "universal-cookie";
import "./App.css";
import { Auth, ChannelContainer, ChannelListContainer } from "./components";

const cookies = new Cookies();

const apiKey = "uhxk25c6tt6r";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

// Connection with the DataBase, It will create the user if it doesn't exist
if(authToken) {
  client.connectUser({
    id: cookies.get("userId"),
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    image: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword"),
    phoneNumber: cookies.get("phoneNumber"),
  }, authToken)
}

const App = () => {

  // Context API would be better.
  // Transfer the params through the Component is not a good idea, mainly when the application
  // becomes bigger

  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(false);

  if(!authToken) return <Auth/>

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
          <ChannelListContainer isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} setProfile={setProfile}/>
          <ChannelContainer isCreating={isCreating} setIsCreating={setIsCreating} isEditing={isEditing} setIsEditing={setIsEditing} createType={createType} setProfile={setProfile} profile={profile}/>
      </Chat>
    </div>
  )
}

export default App