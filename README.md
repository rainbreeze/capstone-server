# BETOPHIA DATABASE SERVER

> Node.js + Express 기반 RESTful API 서버  
> JWT 인증, 프로필 이미지 업로드, 플레이리스트, 리뷰, 댓글 등 기능 포함

---

## 목차

- [소개](#소개)
- [기술 스택](#기술-스택)
- [폴더 구조](#폴더-구조)
- [설치 및 실행](#설치-및-실행)
- [환경 변수](#환경-변수)
- [API 주요 기능](#api-주요-기능)
- [라이선스](#라이선스)

---

## 소개

본 프로젝트는 음악 플레이리스트, 리뷰, 댓글 등의 기능을 제공하는 API 서버입니다.  
Model, Controller, Route를 분리하여 유지보수와 확장성을 높였습니다.

---

## 기술 스택

- Node.js  
- Express  
- JWT 인증  
- Multer (프로필 이미지 업로드)  
- MongoDB / MySQL (사용 DB에 따라 수정)  
- dotenv (환경변수 관리)

---

## 폴더 구조

```plaintext
.idea/
config/
  └── db.js
controllers/
  ├── commentController.js
  ├── gameController.js
  ├── loginController.js
  ├── mypageController.js
  ├── playlistController.js
  ├── playlistMusicController.js
  ├── registerController.js
  ├── replyController.js
  └── reviewController.js
models/
  ├── commentModel.js
  ├── gameModel.js
  ├── loginModel.js
  ├── mypageModel.js
  ├── playlistModel.js
  ├── playlistMusicModel.js
  ├── registerModel.js
  ├── replyModel.js
  └── reviewModel.js
node_modules/
routes/
  ├── commentRoutes.js
  ├── gameRoutes.js
  ├── loginRoutes.js
  ├── mypageRoutes.js
  ├── playlistMusicRoutes.js
  ├── playlistRoutes.js
  ├── registerRoutes.js
  ├── replyRoutes.js
  └── reviewRoutes.js
services/
  └── spotifyService.js
uploads/
README.md
package-lock.json
package.json
server.js
```

## 설치 및 실행

```bash
# 1. 저장소 클론
git clone <레포지토리 URL>
cd <프로젝트 폴더>

# 2. 의존성 설치
npm install

# 4. 서버 실행
npm start
# 또는 개발 중 자동 리로드
npm run dev
```

## 환경 변수

프로젝트 실행에 필요한 환경 변수는 `.env` 파일에 설정합니다.  
예시 `.env` 파일 내용은 다음과 같습니다:

```env
# 데이터베이스 접속 정보
DB_HOST=maglev.proxy.rlwy.net
DB_USER=root
DB_PASSWORD='XKgncJXdXqGqAwJTOaPBAuSLxpZRYGqG',
DB_NAME=railway
DB_PORT=30153

# JWT 시크릿 키
JWT_SECRET=your_jwt_secret_key

# 서버 포트 (선택 사항)
PORT=3001
```

## API 주요 기능

| 기능          | 메서드 | 경로                                 | 설명                         |
|---------------|--------|------------------------------------|------------------------------|
| 댓글 (Comment) | POST   | `/api/:reviewId/comment`            | 댓글 등록                    |
|               | GET    | `/api/:reviewId/comment`            | 댓글 목록 조회               |
|               | DELETE | `/api/:commentId`                   | 댓글 삭제                   |
| 게임 데이터 (Game) | POST   | `/api/savegamedata`                | 게임 데이터 저장             |
| 로그인 (Login) | POST   | `/api/`                            | 로그인                      |
| 마이페이지 (MyPage) | GET    | `/api/:userId`                    | 마이페이지 정보 조회         |
|               | POST   | `/api/:userId/profile-image`       | 프로필 이미지 업로드        |
|               | GET    | `/api/:userId/profile-image`       | 프로필 이미지 조회          |
| 플레이리스트 음악 (PlaylistMusic) | GET    | `/api/image/:playlistMusicId`    | 음악 ID로 이미지 URL 조회    |
|               | GET    | `/api/genre/:playlistMusicId`      | 음악 ID로 장르 조회         |
| 플레이리스트 (Playlist) | GET    | `/api/full/:userId`               | 전체 플레이리스트 조회       |
|               | GET    | `/api/:userId`                     | 플레이리스트 ID 조회         |
|               | GET    | `/api/playlist/:playlistId/created_at` | 플레이리스트 생성일 조회 |
|               | GET    | `/api/playlistmusic/:playlistId`  | 플레이리스트 음악 ID 조회   |
|               | DELETE | `/api/:playlistId`                 | 플레이리스트 삭제            |
| 회원가입 (Register) | POST   | `/api/`                          | 회원가입                   |
| 답글 (Reply)  | POST   | `/api/:reviewId/reply`              | 답글 등록                   |
|               | GET    | `/api/:parentId/replies`            | 특정 댓글의 답글 조회        |
| 리뷰 (Review) | POST   | `/api/`                            | 리뷰 등록                   |
|               | GET    | `/api/:playlistMusicId`             | 특정 음악 리뷰 목록 조회    |
|               | GET    | `/api/`                            | 전체 리뷰 조회 (관리자용)   |
|               | POST   | `/api/:reviewId/like`               | 리뷰 좋아요 (like +1)       |
|               | POST   | `/api/:reviewId/unLike`             | 리뷰 좋아요 해제 (like -1)  |



## 라이선스

MIT License

Copyright (c) 2025 CAPSTONE GROUP 8

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

자세한 내용은 프로젝트 루트의 `LICENSE` 파일을 참고하세요.

