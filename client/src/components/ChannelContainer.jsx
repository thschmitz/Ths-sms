import React from 'react';
import { Channel, MessageTeam, useChatContext } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from "./";

const ChannelContainer = ({isCreating, setIsCreating, IsEditing, setIsEditing, createType}) => {
  const {channel} = useChatContext();

  if(isCreating) {
    return(
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} createType={createType}/>
      </div>
    )
  }

  if(isCreating) {
    return(
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }


  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">This is the beggining of you chat history.</p>
      <p className="channel-empty__second">Send Messages, attachments, links, emojis and more!</p>
    </div>
  )
  
  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer