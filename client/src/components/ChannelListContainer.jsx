import React, { useState } from 'react';
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import Logo from "../assets/logo.png";
import LogoutIcon from "../assets/logout.png";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";

const cookies = new Cookies();

const SideBar = ({logout}) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__logo">
        <img src={Logo} alt="Logo" width="70"/>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>

  )
}

const CompanyHeader = () => {
  return(
    <div className="channel-list__header">
      <p className="channel-list__header__text">Ths SMS</p>
    </div>
  )
}

const CustomChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type==="team")
}

const CustomChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type==="messaging")
}

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setProfile}) => {

  const {client} = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  }

  const filters = {members: {$in: [client.userID]}}

  return (
    <>
      <SideBar logout={logout}/>
      <div className="channel-list__list__wrapper">
        <CompanyHeader/>
        <ChannelSearch setToggleContainer={setToggleContainer}/>
        <div className="channel-list__list__wrapper-logged">
          <p>Logged as {client.user.fullName}</p>
        </div>
        <ChannelList filters={filters} channelRenderFilterFn={CustomChannelTeamFilter} List={(listProps) => (
          <TeamChannelList {...listProps} type="team" setToggleContainer={setToggleContainer} isCreating={isCreating} setIsCreating={setIsCreating} setIsEditing={setIsEditing} setCreateType={setCreateType}/>
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="team" setToggleContainer={setToggleContainer} setIsCreating={setIsCreating} setIsEditing={setIsEditing} setProfile={setProfile} />
        )}
        />
        <ChannelList filters={filters} channelRenderFilterFn={CustomChannelMessagingFilter} List={(listProps) => (
          <TeamChannelList {...listProps} type="messaging" setToggleContainer={setToggleContainer} isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}/>
        )}
        Preview={(previewProps) => (
          <TeamChannelPreview {...previewProps} type="messaging" setToggleContainer={setToggleContainer} setIsCreating={setIsCreating} setIsEditing={setIsEditing} setProfile={setProfile}/>
        )}
        />
      </div>
    </>
  )
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing, setProfile, profile}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return(
    <>
      <div className="channel-list__container">
        <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} setProfile={setProfile} profile={profile}/>

      </div>
      <div className="channel-list__container-responsive" style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}>
        <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
        </div>
        <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} setToggleContainer={setToggleContainer} setProfile={setProfile} profile={profile}/>
      </div>
    </>
  )
}

export default ChannelListContainer