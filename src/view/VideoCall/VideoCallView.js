/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../firebase/Auth';

const useQuery = () => new URLSearchParams(useLocation().search);

const VideoCallView = (props) => {
  const { currentUser } = useContext(AuthContext);
  const jitsiContainerId = 'jitsi-container-id';
  const [jitsi, setJitsi] = useState({});
  const [roomName, setRoomName] = useState('');
  const query = useQuery();
  const roomQueryId = query.get('r');

  useEffect(() => {
    currentUser.getIdToken().then((token) => {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const data = {
        roomQueryId,
      };
      axios.post('getroomName', data).then((res) => {
        const resData = res.data;
        const { roomName } = resData;
        setRoomName(roomName);
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  });

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise;
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
      roomName,
      parentNode: document.getElementById(jitsiContainerId),
    });

    setJitsi(jitsi);
    jitsi.addEventListener('participantRoleChanged', (
      event,
    ) => {
      console.log(JSON.stringify(event));
    });
  };

  useEffect(() => {
    if (roomName) initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, [roomName]);

  const evenListen = () => {

  };

  return <div id={jitsiContainerId} style={{ height: '100vh', width: '100%' }} />;
};

export default VideoCallView;
