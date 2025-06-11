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
- [기여 방법](#기여-방법)
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

📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┗ 📜Header.js
 ┃ ┣ 📂gamepage
 ┃ ┃ ┣ 📜ChoiceScene.js
 ┃ ┃ ┣ 📜GameScene.js
 ┃ ┃ ┣ 📜IntroScene.js
 ┃ ┃ ┗ 📜MainScene.js
 ┃ ┣ 📂homepage
 ┃ ┃ ┣ 📜ContainerWrapper.js
 ┃ ┃ ┣ 📜GameContainer.js
 ┃ ┃ ┣ 📜HomePage.js
 ┃ ┃ ┣ 📜ImageSlider.js
 ┃ ┃ ┣ 📜InfoCardContainer.js
 ┃ ┃ ┣ 📜LiveRankingContainer.js
 ┃ ┃ ┣ 📜Middle.js
 ┃ ┃ ┗ 📜StartGameContainer.js
 ┃ ┣ 📂loginpage
 ┃ ┃ ┗ 📜LoginPage.js
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜MyPage.js
 ┃ ┃ ┗ 📜ProfileImageUploader.js
 ┃ ┣ 📂playlistpage
 ┃ ┃ ┣ 📜playlistDetailModal.js
 ┃ ┃ ┣ 📜PlayListPage.js
 ┃ ┃ ┗ 📜playlistReviewModal.js
 ┃ ┣ 📂registerpage
 ┃ ┃ ┗ 📜RegisterPage.js
 ┃ ┣ 📂reviewpage
 ┃ ┃ ┣ 📜ReviewCommentModal.js
 ┃ ┃ ┗ 📜ViewReviewPage.js
 ┃ ┗ 📂testpage
 ┃ ┃ ┣ 📜TestPage.js
 ┃ ┃ ┗ 📜TestResultPage.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js

## 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-username/capstone-server.git
cd capstone-server

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env 파일 생성)
cp .env.example .env

# 4. 서버 실행
npm start

