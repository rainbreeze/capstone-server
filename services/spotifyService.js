const axios = require('axios');

// Spotify 인증을 위해 Client ID와 Client Secret
const CLIENT_ID = 'ef12e7f2cc9e44d289802eb44e98f5f4';
const CLIENT_SECRET = '04e341715a2948b98dc67f88530500e3';

// Spotify API 토큰을 얻는 함수
const getSpotifyAccessToken = async () => {
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
const searchSpotifyTracks = async (genre, year, hipster) => {
    const accessToken = await getSpotifyAccessToken();
    const url = 'https://api.spotify.com/v1/search';

    const query = `${genre} ${hipster === 'yes' ? 'hipster' : ''}`;
    const searchParams = new URLSearchParams({
        q: query,
        type: 'track',
        limit: 5,
        year: year,
    });

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await axios.get(`${url}?${searchParams.toString()}`, { headers });
        
        // 터미널에 추천된 곡 출력
        console.log('추천된 곡들:');
        response.data.tracks.items.forEach((track, index) => {
            console.log(`${index + 1}. ${track.name} - ${track.artists.map(artist => artist.name).join(', ')} (${track.album.name})`);
        });

        return response.data.tracks.items;  // 검색된 트랙 목록 반환
    } catch (error) {
        console.error('Spotify 검색 실패:', error);
        throw new Error('Spotify 검색 실패');
    }
};

module.exports = {
    searchSpotifyTracks,
};
