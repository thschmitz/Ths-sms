import React, { useEffect, useState } from 'react';
import { useChatContext } from "stream-chat-react";

import { CloseCreateChannel } from '../assets';
import { UserList } from "./";

const ChannelNameInput = ({channelName="", setChannelName}) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value)
  }

  return(
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name"/>
    </div>
  )
}

const QueryingMembers = async(channel) => {

  let sort = {created_at: 1};

  return await channel.queryMembers({}, sort, {})
}

const EditChannel =  ({setIsEditing}) => {

  const {channel} = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [members, setMembers] = useState();

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id)

    if(nameChanged) {
      await channel.update({name: channelName }, {text: `Channel name changed to ${channelName}`})
    }

    if(selectedUsers.length) {
      await channel.addMembers(selectedUsers)
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([])
  }

  useEffect(() => {
    QueryingMembers(channel).then((response) => {
      setMembers(response.members)
    })
  }, [])

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers} createType={"editing"} members={members}/>
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel