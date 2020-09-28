import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const VideoCallView = props => {
      const jitsiContainerId = "jitsi-container-id";
      const [jitsi, setJitsi] = useState({});
      let query = useQuery();
      let roomname = query.get('r');

      useEffect(() => {
        initialiseJitsi();

        return () => jitsi?.dispose?.();
      }, []);
      
      const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise = null;

        const loadJitsiScriptPromise = new Promise((resolve) => {
          resolveLoadJitsiScriptPromise = resolve;
        });

        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = resolveLoadJitsiScriptPromise;
        document.body.appendChild(script);

        return loadJitsiScriptPromise;
      };

      const initialiseJitsi = async () => {
        if (!window.JitsiMeetExternalAPI) {
          await loadJitsiScript();
        }

        const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName: roomname,
          parentNode: document.getElementById(jitsiContainerId),
        });

        setJitsi(_jitsi);
      };

    return <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />;
}

export default VideoCallView;