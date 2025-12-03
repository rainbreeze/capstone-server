// playlistService.js
const playlistModel = require("../models/playlistModel");
const playlistMusicModel = require("../models/playlistMusicModel");
const spotifyService = require("./spotifyService");


const getLimitByScore = score => {
    if (score < 1000) return 1;
    if (score < 2000) return 2;
    if (score < 3000) return 3;
    if (score < 4000) return 4;
    if (score < 5000) return 5;
    if (score < 6000) return 6;
    return 7;
};

const getRandomItems = (arr, n) => {
    console.log(arr);
    return arr.sort(() => Math.random() - 0.5).slice(0, n);
};

const saveTracks = async(playlistId, tracks, genre) => {
    for (const track of tracks) {
        const musicId = track.id; // Spotify의 track ID
        const trackName = track.name;
        const artistNames = track.artists.map((artist) => artist.name).join(", ");
        const albumImageUrl = track.album.images[0]?.url || ""; // 앨범 이미지 URL (첫 번째 이미지 사용)
        const spotifyUrl = track.external_urls.spotify;

        // 5. 플레이리스트에 음악 저장
        await playlistMusicModel.savePlaylistMusic(
            playlistId,
            musicId,
            trackName,
            artistNames,
            genre,
            albumImageUrl,
            spotifyUrl
        );
    }
    //콘솔 확인용
    tracks.forEach((track, index) => {
        console.log(
            `${index + 1}. ${track.name} - ${track.artists
          .map((artist) => artist.name)
          .join(", ")} (${track.album.name})`
        );
    });
}

const generatePlaylist = async(userId, genre, score, year) => {

    try {
        const playlist = await playlistModel.createPlaylist(userId, genre);
        const playlistId = playlist.insertId;
        console.log("플레이리스트 생성 성공:", playlistId);

        const allTracks = await spotifyService.searchSpotifyTracks(genre, year);
        console.log("allTracks:", allTracks);

        const limit = getLimitByScore(score);

        const recommendedTracks = getRandomItems(allTracks, limit);

        console.log('recommendedTracks', recommendedTracks)

        await saveTracks(playlistId, recommendedTracks, genre);

        return recommendedTracks.map((track) => ({
            ...track,
            genre
        }));

    } catch (error) {
        console.error("[playlistService] 에러 발생:", error);
        throw new Error("플레이리스트 생성 실패");
    }




}

module.exports = {
    generatePlaylist,
};