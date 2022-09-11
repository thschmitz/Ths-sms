import React from 'react';
import { useChatContext } from 'stream-chat-react';

const FriendProfile = () => {
  const { client } = useChatContext();

  console.log(client)
  return (
    <div>FriendProfile</div>
  )
}

export default FriendProfile