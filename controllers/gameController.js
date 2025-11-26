// controllers/gameController.js
const gameModel = require("../models/gameModel"); // 게임 데이터 저장 모델
const playlistModel = require("../models/playlistModel"); // 플레이리스트 생성 모델
const playlistMusicModel = require("../models/playlistMusicModel"); // 플레이리스트 음악 모델
const spotifyService = require("../services/spotifyService"); // Spotify 서비스 호출

// 게임 데이터 저장 API 처리
const saveGameData = async (req, res) => {
  const year = Math.floor(Math.random() * (2025 - 1990 + 1)) + 1990;

  const { userId, score, genre } = req.body; // year는 삭제
  // score가 빈 값일 경우 처리 (NaN이 되지 않도록)
  const parsedScore = score ? parseInt(score, 10) : null;

  // 1. 게임 데이터 저장
  try {
    const gameResult = await gameModel.saveGameData(
      userId,
      parsedScore,
      genre,
      year
    );
    console.log(
      "userId:",
      userId,
      "parsedScore:",
      parsedScore,
      "genre:",
      genre,
      "year:",
      year
    );

    console.log("게임 데이터 저장 성공:", gameResult);

    // 2. 플레이리스트 생성
    const playlist = await playlistModel.createPlaylist(userId, genre);
    console.log("플레이리스트 생성 성공:", playlist);

    // 3. 음악 추천을 받기 위한 API 호출s
    const recommendedTracks = await spotifyService.searchSpotifyTracks(
      parsedScore,
      genre,
      year
    );

    console.log("recommendedTracks:", recommendedTracks);

    // 4. 추천된 곡들을 플레이리스트에 추가
    for (const track of recommendedTracks) {
      const musicId = track.id; // Spotify의 track ID
      const trackName = track.name;
      const artistNames = track.artists.map((artist) => artist.name).join(", ");
      const albumImageUrl = track.album.images[0]?.url || ""; // 앨범 이미지 URL (첫 번째 이미지 사용)
      const spotifyUrl = track.external_urls.spotify;

      // 5. 플레이리스트에 음악 저장 전에 파라미터 로그 출력
      console.log("playlist.insertId:", playlist.insertId); // 플레이리스트 ID
      console.log("musicId:", musicId); // 트랙 ID
      console.log("trackName:", trackName); // 트랙 이름
      console.log("artistNames:", artistNames); // 아티스트 이름들
      console.log("genre:", genre); // 장르
      console.log("albumImageUrl:", albumImageUrl); // 앨범 이미지 URL
      console.log("spotifyUrl:", spotifyUrl); // Spotify URL
      // 5. 플레이리스트에 음악 저장
      await playlistMusicModel.savePlaylistMusic(
        playlist.insertId,
        musicId,
        trackName,
        artistNames,
        genre,
        albumImageUrl,
        spotifyUrl
      );
    }

    // 추천된 곡들 출력 (터미널에)
    recommendedTracks.forEach((track, index) => {
      console.log(
        `${index + 1}. ${track.name} - ${track.artists
          .map((artist) => artist.name)
          .join(", ")} (${track.album.name})`
      );
    });

    // 추천된 곡들을 클라이언트로 전송
    res.status(200).json({
      message: "게임 데이터 저장 및 음악 추천 성공!",
      musicRecommendation: recommendedTracks.map((track) => ({
        ...track,
        genre: genre,
      })),
    });
  } catch (error) {
    console.error("추천 실패:", error);
    res.status(500).json({ error: "게임 데이터 저장 또는 음악 추천 실패" });
  }
};

module.exports = {
  saveGameData,
};
