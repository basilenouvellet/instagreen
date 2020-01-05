import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSessionStorage from '../../hooks/useSessionStorage';

import './MediaPage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function MediaPage() {
  const [media, setMedia] = useState(null);
  const [token, setToken] = useSessionStorage('token', null); // eslint-disable-line no-unused-vars

  const { mediaId } = useParams();

  // TODO:
  // check if User is logged in
  // useEffect(() => {})

  // Fetch Media
  useEffect(() => {
    async function fetchMediaAsync() {
      const res = await fetch(BASE_API_URL + '/media/' + mediaId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const resJson = await res.json();

      if (resJson.data) {
        setMedia(resJson.data);
      } else {
        console.error(resJson.error.message, resJson.error);
        setMedia(null);
      }
    }

    if (token) {
      try {
        fetchMediaAsync();
      } catch(e) {
        console.error('Something happened while fetching Media', e);
      }
    }
  }, [mediaId, token]);

  return (
    <div className="MediaPage">
      {media && <h6>{JSON.stringify(media)}</h6>}
    </div>
  );
}

export default MediaPage;
