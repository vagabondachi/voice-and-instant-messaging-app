import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

function LanguageRadioButtons() {
  const [userLanguage, setUserLanguage] = useState('');
  const [translateToLanguage, setTranslateToLanguage] = useState('');

  const userLanguageGlobal = useSelector((state) => state.userLang);
  const translateToLanguageGlobal = useSelector(
    (state) => state.languageTranslateTo
  );

  useEffect(() => {
    setUserLanguage(userLanguageGlobal);
    setTranslateToLanguage(translateToLanguageGlobal);
  }, []);

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'userLanguage') {
      setUserLanguage(value);
    } else {
      setTranslateToLanguage(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(user.uid).update({
      userLanguage: userLanguage,
      translateToLanguage: translateToLanguage,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <b>Choose your language:</b>
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="en"
          checked={userLanguage === 'en'}
          onChange={handleLanguageChange}
        />
        English
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="zh"
          checked={userLanguage === 'zh'}
          onChange={handleLanguageChange}
        />
        Chinese
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="ja-JP"
          checked={userLanguage === 'ja-JP'}
          onChange={handleLanguageChange}
        />
        Japanese
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="fil-PH	"
          checked={userLanguage === 'fil-PH	'}
          onChange={handleLanguageChange}
        />
        Tagalog
      </label>

      <label>
        <b>
          <br />
          Translate messages to:
        </b>
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="en"
          checked={translateToLanguage === 'en'}
          onChange={handleLanguageChange}
        />
        English
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="zh-CN"
          checked={translateToLanguage === 'zh-CN'}
          onChange={handleLanguageChange}
        />
        Chinese
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="ja"
          checked={translateToLanguage === 'ja'}
          onChange={handleLanguageChange}
        />
        Japanese
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="tl"
          checked={translateToLanguage === 'tl'}
          onChange={handleLanguageChange}
        />
        Tagalog
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
}

export default LanguageRadioButtons;
