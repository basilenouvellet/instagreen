import React, { useState, useEffect } from 'react';

import './MePage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function MePage() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userMedias, setUserMedias] = useState([]);

  // Fetch User ID & User Name
  useEffect(() => {
    async function fetchInfosAsync() {
      const res = await fetch(BASE_API_URL + '/infos');
      const resJson = await res.json();
      const { data } = resJson;
      setUserId(data.user_id);
      setUserName(data.username);
    }
    try {
      fetchInfosAsync();
    } catch(e) {
      console.error('Something happened while fetching User Infos', e);
    }
  }, []);

  // Fetch User Medias
  useEffect(() => {
    async function fetchMediasAsync() {
      const res = await fetch(BASE_API_URL + '/medias');
      const resJson = await res.json();
      console.log('resJson', resJson);
      
      const { data } = resJson;
      setUserMedias(data.data);
    }
    try {
      fetchMediasAsync();
    } catch(e) {
      console.error('Something happened while fetching User Medias', e);
    }
  }, []);

  return (
    <div className="MePage">
      <h5>Results for <b>{userName}</b></h5>

      <h8>User ID is <b>{userId}</b></h8>

      <h8>User Medias are {userMedias.map(media => (
        <div key={media.id}>
          <b>{JSON.stringify(media)}</b>
        </div>
      ))}</h8>
    </div>
  );
}

export default MePage;
