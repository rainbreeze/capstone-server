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

// 배열에서 랜덤으로 n개 뽑는 함수
const getRandomItems = (arr, n) => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

//limit 함수
const getLimitByScore = (score) =>{
    if (score < 1000) return 1;
    else if (score < 2000) return 2;
    else if (score < 3000) return 3;
    else if (score < 4000) return 4;
    else if (score < 5000) return 5;
    else if (score < 6000) return 6;
    else return 7;
}

// Spotify Search API를 호출하여 음악을 검색하는 함수
const searchSpotifyTracks = async (parsedScore, genre, year) => {
    const accessToken = await getSpotifyAccessToken();
    const url = 'https://api.spotify.com/v1/search';
    const score = parsedScore;
    const limit = getLimitByScore(score);
    console.log(limit);

    const query = `${genre} year:${year}`;

    const searchParams = new URLSearchParams({
        q: query,
        type: 'track',
        limit: 15, // 최대 10개 요청
    });

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await axios.get(`${url}?${searchParams.toString()}`, { headers });
        const allTracks = response.data.tracks.items;
        const randomTracks = getRandomItems(allTracks, Math.min(limit, allTracks.length)); // 랜덤으로 5개 선택

        return randomTracks;
    } catch (error) {
        console.error('Spotify 검색 실패:', error);
        throw new Error('Spotify 검색 실패');
    }
};

module.exports = {
    searchSpotifyTracks,
};
