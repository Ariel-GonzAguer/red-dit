import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessToken, setAccessToken, clearAccessToken } from '../../redux/AccessTokenSlice';

export default function Auth() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.accessToken);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const clientId = '1ZIeoRNEvLMXs3kQidUQdA';
  const redirectUri = 'http://localhost:5173/';
  const state = Math.random().toString(36).substring(2); // Genera un string aleatorio
  const scope = 'read';
  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&duration=temporary&scope=${scope}`;

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      dispatch(setAccessToken(token));
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const accessCode = urlParams.get('code');

      if (accessCode) {
        dispatch(fetchAccessToken(accessCode));
      }
    }
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(clearAccessToken());
    window.localStorage.removeItem('token');
  };

  return (
    <>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!authToken
        ? <a href={authUrl}>Login with Reddit</a>
        : <button onClick={logout}>LogOut</button>
      }
    </>
  );
}
