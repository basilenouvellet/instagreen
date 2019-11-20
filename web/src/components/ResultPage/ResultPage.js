import React from 'react';
import { useParams } from "react-router-dom";

import './ResultPage.css';

function ResultPage() {
  const { name } = useParams();

  return (
    <div className="ResultPage">
      <h3>Results for <b>{name}</b></h3>
    </div>
  );
}

export default ResultPage;
