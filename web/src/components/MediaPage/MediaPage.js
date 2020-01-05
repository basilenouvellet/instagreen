import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import SimpleJsonRenderer from '../SimpleJsonRenderer';
import useSessionStorage from '../../hooks/useSessionStorage';

import './MediaPage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function MediaPage() {
  const [media, setMedia] = useState(null);
  const [token, setToken] = useSessionStorage('token', null); // eslint-disable-line no-unused-vars

  const { mediaId } = useParams();
  const history = useHistory();

  // TODO:
  // check if User is logged in
  // useEffect(() => {})

  // Fetch Media
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchMediaAsync() {
      const res = await fetch(BASE_API_URL + '/media/' + mediaId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        signal: abortController.signal,
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
        // check if request was not intentionally aborted
        if (!abortController.signal.aborted) {
          console.error('Something happened while fetching Media', e);
        }
      }
    }

    // clean-up by cancelling potential on-going fetch request
    return () => {
      abortController.abort();
    };
  }, [mediaId, token]);

  const onBackButtonClick = () => { history.goBack(); };

  return (
    <div className="MediaPage">
      <Button
        variant="outline-secondary"
        onClick={onBackButtonClick}
        style={{ marginBottom: '2em' }}
      >
        Back
      </Button>

      {media && <SimpleJsonRenderer json={media} />}
    </div>
  );
}

export default MediaPage;
