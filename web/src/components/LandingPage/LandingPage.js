import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './LandingPage.css';

const BASE_URL = "https://www.instagram.com/"

function LandingPage() {
  const [name, setName] = useState("");
  const history = useHistory();
  
  const onButtonClick = () => {
    console.log("Button clicked! Name is", name);
    history.push(`/result/${name}`);
  };
  
  const handleNameChange = event => {
    setName(event.target.value);
  };
  
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <div className="LandingPage">
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
