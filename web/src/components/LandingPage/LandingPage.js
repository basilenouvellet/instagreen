import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './LandingPage.css';

const BASE_URL = 'https://www.instagram.com/';
const BASE_API_URL = 'http://localhost:5000/api';

function LandingPage() {
  const [name, setName] = useState('');
  const history = useHistory();

  const handleAuthAsync = async () => {
    const res = await fetch(BASE_API_URL + '/auth/window_url');
    const resJson = await res.json();

    if(resJson.data) {
      window.open(resJson.data.url, '_self');
    } else {
      console.error(resJson.error.message, resJson.error);
    }
  };

  const onMyProfileButtonClick = () => {
    try {
      handleAuthAsync();
    } catch(e) {
      console.error('Something happened while fetching Auth Window', e);
    }
  };

  const onButtonClick = () => {
    console.log('Button clicked! Name is', name);
    history.push(`/result/${name}`);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <div className="LandingPage">
      <Button
        variant="primary"
        size="lg"
        onClick={onMyProfileButtonClick}
        style={{'marginBottom': '5em'}}
      >
        My profile
      </Button>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon3">{BASE_URL}</InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          id="basic-url"
          aria-describedby="basic-addon3"
          aria-label="your friend's username"
          placeholder="your friend's username"
          size="lg"
          onKeyPress={handleKeyPress}
          onChange={handleNameChange}
          value={name}
        />
      
        <InputGroup.Append>
          <Button
            variant="primary"
            size="lg"
            disabled={!name}
            onClick={onButtonClick}
          >
              Find it!
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default LandingPage;
