import { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios'
import globalState from './_config/driveAPI';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function Auth() {

  const navigate = useNavigate()

  useEffect(() => {
    const params = queryString.parse(window.location.search)
    getToken(params.code)
  }, [])

  const getToken = async (code: any) => {
    try {
      const body = {
        code,
        client_id: globalState.CLIENT_ID,
        client_secret: globalState.CLIENT_SECRET,
        grant_type: globalState.GRANT_TYPE,
        redirect_uri: globalState.REDIRECT_URI,
        to: ''
      }
      const { data } = await axios.post('https://accounts.google.com/o/oauth2/token', body)
      await localStorage.setItem('token', JSON.stringify(data))
    } catch {
      localStorage.removeItem('token')
      navigate('/')
    } finally {
      navigate('/')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Loading
        </p>
      </header>
    </div>
  );
}

export default Auth;
