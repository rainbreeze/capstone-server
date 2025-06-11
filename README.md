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


