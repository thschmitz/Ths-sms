import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';

const FriendProfile = ({setProfile}) => {
  const { channel } = useChatContext();
  const { client } = useChatContext();
  const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

  const user = members[0]?.user;

  const createdHour = `${user?.created_at[8]}${user?.created_at[9]}/${user?.created_at[5]}${user?.created_at[6]}/${user?.created_at[0]}${user?.created_at[1]}${user?.created_at[2]}${user?.created_at[3]} at ${user?.created_at[11]}${user?.created_at[12]}:${user?.created_at[14]}${user?.created_at[15]}`

  return (
    <div className="profile-list__body">
      <div onClick={() => setProfile(false)} className="profile-list__header">
        <CloseCreateChannel className="profile-list__header-button"/>
      </div>
      
      <div className="profile-list__content">
        <div className="profile-list__content-user">
          <div className="profile-list__content-data">
            <div className="profile-list__content-photo">
              <Avatar image={user.image} name={user.fullName || user.id} size={200}/>
            </div>
              {
                user?.online?
                <div className="profile-list__online">
                  <p>● Online</p>
                </div>
                :
                <div className="profile-list__offline">
                  <p>● Offline</p>
                </div>
              }
            <div className="profile-list__info">
              <p><b>Name:</b> {user?.fullName}</p>
              <p><b>Username:</b> {user?.name}</p>
              <p><b>Phone number:</b> {user?.phoneNumber}</p>
              <p><b>Creation date:</b> {createdHour}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FriendProfile