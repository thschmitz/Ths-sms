import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';
import FriendProfile from "./FriendProfile";

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType, setProfile, profile }) => {
    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )


    return (
        <div className=" channel__container">
            {
                profile===true?
                    <FriendProfile/>
                :
                <Channel
                    EmptyStateIndicator={EmptyState}
                    Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
                >
                    <ChannelInner setIsEditing={setIsEditing} setProfile={setProfile}/>
                </Channel>
            }
        </div>
    );
}

export default ChannelContainer;