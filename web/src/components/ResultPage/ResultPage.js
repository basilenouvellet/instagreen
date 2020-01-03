import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ResultPage.css';

const BASE_API_URL = 'http://localhost:5000/api';

function ResultPage() {
  const { name } = useParams();
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    async function fetchAsync() {
      const res = await fetch(BASE_API_URL + '/id');
      const resJson = await res.json();
      const { data } = resJson;
      setUserId(data.user_id);
    }
    try {
      fetchAsync();
    } catch {
      console.error('Something happened');
    }
  });

  return (
    <div className="ResultPage">
      <h3>Results for <b>{name}</b></h3>
      <h4>User ID is {userId}</h4>
    </div>
  );
}

export default ResultPage;
