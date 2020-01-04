import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './MePage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function MePage() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userMedias, setUserMedias] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  // TODO:
  // check if User is logged in
  // useEffect(() => {})

  // Fetch Access Token
  useEffect(() => {
    async function fetchAccessTokenAsync() {
      const res = await fetch(BASE_API_URL + '/auth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const resJson = await res.json();

      if (resJson.data) {
        setToken(resJson.data.token);
      } else {
        console.error(resJson.error.message);
        setToken(null);
      }
    }

    if (code) { fetchAccessTokenAsync(); }
  }, [code]);

  // Fetch User ID, User Name and User Medias
  useEffect(() => {
    async function fetchInfosAsync() {
      const res = await fetch(BASE_API_URL + '/infos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const resJson = await res.json();
      const { data } = resJson;
      setUserId(data.user_id);
      setUserName(data.username);
    }

    async function fetchMediasAsync() {
      const res = await fetch(BASE_API_URL + '/medias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const resJson = await res.json();
      const { data } = resJson;
      setUserMedias(data.data || []);
    }

    if (token) {
      try {
        fetchInfosAsync();
        fetchMediasAsync();
      } catch(e) {
        console.error('Something happened while fetching User Infos & Medias', e);
      }
    }
  }, [token]);

  return (
    <div className="MePage">
      <h4>Results for <b>{userName}</b></h4>

      <h6>User ID is <b>{userId}</b></h6>

      <h6>User Medias are {userMedias.map(media => (
        <p key={media.id}>
          <b>{JSON.stringify(media)}</b>
        </p>
      ))}</h6>
    </div>
  );
}

export default MePage;
