import React, { useEffect } from 'react';
import ChatView from './ChatView';
import SideBar from './SideBar';
import SideNav from './SideNav';
import { useSelector } from 'react-redux';
import Login from './Login';
import Idle from '../../../assets/icons/startconvopage-art.png';
import LoadSettings from './LoadSettings';
import { useNavigate } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';

const MainView = () => {
  const user = useSelector((state) => state.user);
  const groupId = useSelector((state) => state.groupId);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      window.electron.ipcRenderer.sendMessage('on-login');
    }
  }, [user]);

  return (
    <>
      {user && user.emailVerified ? (
        <>
          <LoadSettings />
          <SideNav />
          <SideBar />
          {groupId ? (
            <ChatView />
          ) : (
            <div className="chatcontainer">
<div id="chat-content">
              <div className="idle-content">
                <div className="idle-item">
                  <img src={Idle} alt="idle-logo" className="idle-img"></img>
                </div>

                <div className="idle-item">
                  <p>
                    Being alone in our world can be fun sometimes,
                    <br /> but it can be better with someone around!
                  </p>
                </div>
              </div>
            </div>
</div>
          )}
        </>
      ) : user && !user.emailVerified ? (
        <VerifyEmail />
      ) : (
        <Login />
      )}
    </>
  );
};

export default MainView;
