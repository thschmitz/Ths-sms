import React, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from "stream-chat-react"

import { InviteIcon } from '../assets'

const ListContainer = ({children}) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const queryChannel = async(client, user) => {
    const filters = {
        type: 'messaging',
        member_count: 2,
        members: { $eq: [client.user.id, user.id] },
    };

    const [existingChannel] = await client.queryChannels(filters);
    if(existingChannel.data) {
        return existingChannel;
    }
}

const UserItem = ({user, setSelectedUsers}) => {
    const [selected, setSelected] = useState(false);
    const [responseChannel, setResponseChannel] = useState();
    const {client} = useChatContext();

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers(( prevUsers ) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers(( prevUsers ) =>  [...prevUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected)
    }

    queryChannel(client, user).then((response) => {
        console.log(response)
        setResponseChannel(response)
    })

    if(responseChannel){
        return (
            <div className="user-item__wrapper" onClick={handleSelect}>
                <div className="user-item__name-wrapper">
                    <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                    <p className="user-item__name">{user.fullName || user.id}</p>
                </div>
                <div className="privated">
                    <InviteIcon/>
                </div>
                
            </div>
        )
    } else {
        return(
            <div className="user-item__wrapper" onClick={handleSelect}>
                <div className="user-item__name-wrapper">
                    <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                    <p className="user-item__name">{user.fullName || user.id}</p>
                </div>
                {selected? <InviteIcon/> : <div className="user-item__invite-empty"/>}
            </div>

        )
    }

    
}

const UserList = ({setSelectedUsers}) => {
    const {client} = useChatContext();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;

            setLoading(true);

            try{
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8}
                )

                if(response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
                setLoading(false);
            } catch(error) {
                setError(true);
                console.log("Error on loading users: ", error)
            }
        }

        if(client) getUsers();
    }, [])

    if(error) {
        return(
            <ListContainer>
                <div className="user-list__message">Error Loading, please refresh and try again.</div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return(
            <ListContainer>
                <div className="user-list__message">No users found.</div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">Loading users...</div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>
                ))
            )}
        </ListContainer>
    )
}

export default UserList