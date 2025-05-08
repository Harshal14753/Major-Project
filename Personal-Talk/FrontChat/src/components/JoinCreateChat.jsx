import React, { useContext, useState } from 'react'
import chatIcon from "../assets/chat.png"
import toast from 'react-hot-toast';
import {createRoomApi, joinChatApi } from '../services/RoomService';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router';

function JoinCreateChat() {

  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const {roomId, currentUser, connected, setRoomId, setCurrentUser, setConnected} = useChatContext();

  const navigate = useNavigate();

  function handleFormInputChange(e){
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm(){
    if (detail.roomId === "" || detail.userName === ""){
      toast.error("Invalid Input !!")
      return false;
    } else {
      return true;
    }
  }

  async function joinChat(){
    if (validateForm()){
      // Join chat
      try {
        const response = await joinChatApi(detail.roomId);
        setCurrentUser(detail.userName)
        setRoomId(response.roomId)
        setConnected(true)
        navigate('/chat')
        toast.success("Room join successfully");
      } catch (error) {
        toast.error("Error in joining room")
      } 
    }
  }

  async function createRoom() {
    if (validateForm()){
      // Create room
      console.log(detail)

      // call api to create room on backend
      try {
        const room = await createRoomApi(detail.roomId)
        console.log(room)
        toast.success("Room created successfully");

        setCurrentUser(detail.userName);
        setRoomId(room.roomId)
        setConnected(true);

        navigate('/chat');

      } catch (error) {
        console.log(error);
        if (error.status == 400){
          toast.error("Room already exist");
        }else {
          toast.error("Error in creating room");
        }
      }

    }
  }


  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='p-8 w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow'>
        <div>
          <img src={chatIcon} className="w-24 mx-auto" />
        </div>

            <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room..</h1>
            <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="name"
            name="userName"
            placeholder="Enter the name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* room id div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.roomId}
            name="roomId"
            type="text"
            id="name"
            placeholder="Enter the room id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* button  */}
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"
          >
            Join Room
          </button>
          <button onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full"
          >
            Create Room
          </button>
        </div> 
        </div>
    </div>
  )
}

export default JoinCreateChat