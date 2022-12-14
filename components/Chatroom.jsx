import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInput,
  sendMessage,
  editMessage,
  deleteMessage,
} from '../store/reducers/messengerSlice';
import { Edit, Delete, ArrowCircleLeftOutlined } from '@mui/icons-material';

export default function Chatroom() {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(0);
  const { messageUserId, currentMessage, messages } = useSelector(
    (state) => state.messenger
  );
  const { firstname: matchFName, lastname: matchLName } = useSelector(
    (state) =>
      state.matches.find((match) => match.id === messageUserId) ?? {
        firstname: null,
        lastname: null,
      }
  );
  const { firstname, lastname } = useSelector((state) => state.profile);

  //scroll to the last message whenever a dif match is clicked
  useEffect(() => {
    const lastMessage = document.querySelector('.last');
    lastMessage?.scrollIntoView(false);
    setEditId(0);
    dispatch(changeInput(''));
  }, [messageUserId]);

  function handleSend() {
    if (!currentMessage) return;
    if (editId) {
      dispatch(editMessage(editId, currentMessage));
      setEditId(0);
    } else dispatch(sendMessage(currentMessage, messageUserId));
    dispatch(changeInput(''));
  }

  function handleEnter(e) {
    if (e.key === 'Enter') handleSend();
    if (e.key === 'Escape' && editId) {
      setEditId(0);
      dispatch(changeInput(''));
    }
  }
  function handleChange(e) {
    e.preventDefault();
    dispatch(changeInput(e.target.value));
  }

  //set timestamp on messages
  function setTime(sent) {
    const now = new Date();
    const then = new Date(sent.replace(/-\d{2}:\d{2}/, '-00:00')); //regex converts timezone to UTC (-XX:XX -> -00:00)
    const msInDay = 1000 * 60 * 60 * 24; //milliseconds in a day
    const dayDifference = (now - then) / msInDay;

    //double ternary, if less than 24 hours display time sent, 24-48 hrs displays yesterday, > 48hrs give date
    const date =
      dayDifference < 1
        ? then.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })
        : dayDifference < 2
        ? `Yesterday at ${then.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}`
        : then
            .toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
            .replace(',', ' at');

    return date;
  }

  //edit and delete messages here
  function handleEdit(id, message) {
    setEditId(id);
    dispatch(changeInput(message));
  }
  function handleDelete(id) {
    dispatch(deleteMessage(id));
  }

  return (
    <>
      {/* back button and name for mobile */}
      <div id="back">
        <Link href="/messages">
          <ArrowCircleLeftOutlined fontSize="large" />
        </Link>
        <small>{matchFName}</small>
      </div>
      {/* chat box starts here */}
      <div className="chatroom">
        <div className="chats">
          {messages
            .filter((message) => {
              return (
                message.to === messageUserId || message.from === messageUserId
              );
            })
            .map((message, idx, filteredArr) => (
              // messages from match here
              <div
                key={message.id}
                className={idx === filteredArr.length - 1 ? 'last' : ''}
              >
                {message.from === messageUserId ? (
                  <div className="single-message">
                    <img
                      src={message.from_pic?.avatar_url}
                      alt="user profile pic"
                    />
                    <p className={'chat-match'}>
                      <small>
                        {matchFName} {matchLName}
                      </small>
                      <br />
                      {message.message}
                      <br />
                      <small>Sent: {setTime(message.created_at)}</small>
                    </p>
                  </div>
                ) : (
                  // messages from logged in user start here
                  <div key={message.id} className="single-message right-user">
                    <Delete
                      sx={{ '&:hover': { color: 'red' } }}
                      onClick={() => handleDelete(message.id)}
                    />
                    <Edit
                      sx={{ '&:hover': { color: 'gray' } }}
                      onClick={() => handleEdit(message.id, message.message)}
                    />
                    <p className={'user'}>
                      <small>
                        {firstname} {lastname}
                      </small>
                      <br /> {message.message} <br />
                      <small>Sent: {setTime(message.created_at)}</small>
                    </p>
                    <img
                      src={message.from_pic?.avatar_url}
                      alt="user profile pic"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* input for chat box */}
      <div className="input-box">
        <input
          className="chat-input"
          type="text"
          placeholder="Shoot your shot!"
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={currentMessage}
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
}
