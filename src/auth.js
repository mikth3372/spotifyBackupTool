const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };
  
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };
  
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  
  export const generatePKCEChallenge = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    localStorage.setItem('code_verifier', codeVerifier);
    return codeChallenge;
  };

  export const redirectToSpotify = async () => {
    const codeChallenge = await generatePKCEChallenge();
    const clientId = '0c08a9fe82c344a8bad5319cafe76465'; // Replace with your client ID
    const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI
    const scope = 'user-read-private user-read-email playlist-read-private';
  
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };
  
  export const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
    const clientId = '0c08a9fe82c344a8bad5319cafe76465'; // Replace with your client ID
    const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI
    const url = "https://accounts.spotify.com/api/token";
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
  
    const response = await fetch(url, payload);
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  };
  
  export const getRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const clientId = 'your_client_id'; // Replace with your client ID
    const url = "https://accounts.spotify.com/api/token";
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    };
  
    const response = await fetch(url, payload);
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  };