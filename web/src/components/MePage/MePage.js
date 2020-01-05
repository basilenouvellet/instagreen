import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSessionStorage from '../../hooks/useSessionStorage';

import './MePage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function MePage() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userMedias, setUserMedias] = useState([]);
  const [token, setToken] = useSessionStorage('token', null);

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
        console.error(resJson.error.message, resJson.error);
        setToken(null);
      }
    }

    if (code && !token) {
      try {
        fetchAccessTokenAsync();
      } catch(e) {
        console.error('Something happened while fetching Token', e);
      }
    }
  }, [code, token, setToken]);

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

      if (resJson.data) {
        setUserId(resJson.data.user_id);
        setUserName(resJson.data.username);
      } else {
        console.error(resJson.error.message, resJson.error);
        setUserId(null);
        setUserName(null);
      }
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

      if (resJson.data) {
        setUserMedias(resJson.data.data);
      } else {
        console.error(resJson.error.message, resJson.error);
        setUserMedias([]);
      }
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
        <Link to={`/media/${media.id}`} key={media.id}>
          <b>{JSON.stringify(media)}</b>
        </Link>
      ))}</h6>
    </div>
  );
}

export default MePage;
