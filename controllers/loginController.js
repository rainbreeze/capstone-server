// controllers/loginController.js

const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const axios = require('axios'); // axios 추가

// JWT 비밀 키
const JWT_SECRET = 'your_jwt_secret_key';

// 로그인 API 처리 (기존 아이디/비밀번호 로그인)
const login = (req, res) => {
    console.log('로그인 컨트롤러');
    const { userId, password } = req.body;

    // 사용자 정보 조회
    loginModel.getUserById(userId, (err, result) => {
        console.log('getUserById 호출됨');
        if (err) {
            console.error('로그인 실패:', err);
            return res.status(500).json({ error: '로그인 실패' });
        }

        // 사용자 존재하지 않음
        if (result.length === 0) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = result[0];
        console.log('정보: ', user);

        // 비밀번호 비교
        loginModel.comparePassword(password, user.password, (err, isMatch) => {
            console.log('comparePassword 호출됨');
            if (err) {
                console.error('비밀번호 비교 실패:', err);
                return res.status(500).json({ error: '로그인 실패' });
            }

            // 비밀번호 일치하지 않음
            if (!isMatch) {
                return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            const token = jwt.sign(
                {
                    userId: user.userId,
                    userName: user.userName,
                    profileImage: user.profileImage
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: '로그인 성공!', token });
        });
    });
};

// 카카오 로그인 콜백 API 처리
const kakaoCallback = async (req, res) => {
    const { code } = req.query;
    const KAKAO_REST_API_KEY = 'b0abcbdd05b3cc529063683c1a4e5003';
    const KAKAO_REDIRECT_URI = 'http://localhost:3001/login/kakao/callback';

    try {
        // 1. 인증 코드로 토큰 요청
        const tokenResponse = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    client_id: KAKAO_REST_API_KEY,
                    redirect_uri: KAKAO_REDIRECT_URI,
                    code: code,
                },
            }
        );

        const { access_token } = tokenResponse.data;

        // 2. 토큰으로 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const kakaoUser = userResponse.data;
        const kakaoId = kakaoUser.id;
        const userName = kakaoUser.properties.nickname;
        const profileImage = kakaoUser.properties.profile_image;

        // 3. 우리 DB에 사용자 정보가 있는지 확인
        loginModel.getKakaoUserById(kakaoId, (err, user) => {
            if (err) {
                console.error('카카오 로그인 실패:', err);
                return res.status(500).json({ error: '로그인 실패: 서버 오류' });
            }

            let finalUser = user;
            if (!finalUser) {
                // 사용자가 없으면 회원가입
                const newUser = {
                    userId: `kakao_${kakaoId}`,
                    userName: userName,
                    profileImage: profileImage,
                    provider: 'kakao'
                };
                loginModel.registerKakaoUser(newUser, (err, result) => {
                    if (err) {
                        console.error('카카오 회원가입 실패:', err);
                        return res.status(500).json({ error: '회원가입 실패' });
                    }
                    finalUser = newUser;
                    issueJwtAndRedirect(finalUser);
                });
            } else {
                issueJwtAndRedirect(finalUser);
            }
        });

        function issueJwtAndRedirect(user) {
            // JWT 토큰 생성
            const token = jwt.sign(
                {
                    userId: user.userId,
                    userName: user.userName,
                    profileImage: user.profileImage,
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        }

    } catch (error) {
        console.error('카카오 로그인 에러:', error);
        res.status(500).json({ error: '카카오 로그인 처리 중 오류 발생' });
    }
};

module.exports = {
    login,
    kakaoCallback,
};