const axios = require('axios');

// Spotify 인증을 위해 Client ID와 Client Secret
const CLIENT_ID = 'ef12e7f2cc9e44d289802eb44e98f5f4';
const CLIENT_SECRET = '04e341715a2948b98dc67f88530500e3';

// Spotify API 토큰을 얻는 함수
const getSpotifyAccessToken = async() => {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', CLIENT_SECRET);

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error('Spotify 인증 실패:', error);
        throw new Error('Spotify 인증 실패');
    }

};

// Spotify Search API를 호출하여 음악을 검색하는 함수
const searchSpotifyTracks = async(genre, year) => {
    const accessToken = await getSpotifyAccessToken();
    const url = 'https://api.spotify.com/v1/search';

    const query = `${genre} year:${year}`;

    const params = new URLSearchParams({
        q: query,
        type: 'track',
        limit: 50 // 더 많은 곡을 받아 playlistService에서 랜덤 선택하게 함
    });

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await axios.get(`${url}?${params.toString()}`, { headers });
        return response.data.tracks.items;
    } catch (error) {
        console.error('Spotify 검색 실패:', error);
        throw new Error('Spotify 검색 실패');
    }
};

module.exports = {
    searchSpotifyTracks,
};