// controllers/loginController.js

const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const axios = require('axios');

// JWT 비밀 키
const JWT_SECRET = 'your_jwt_secret_key';

// 로그인 API 처리 (기존 아이디/비밀번호 로그인)
const login = (req, res) => {
    console.log('로그인 컨트롤러');
    const { userId, password } = req.body;

    loginModel.getUserById(userId, (err, result) => {
        if (err) {
            console.error('로그인 실패:', err);
            return res.status(500).json({ error: '로그인 실패' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = result[0];

        loginModel.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('비밀번호 비교 실패:', err);
                return res.status(500).json({ error: '로그인 실패' });
            }

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

            res.status(200).json({
                message: '로그인 성공!',
                token,
                user: {
                    userId: user.userId,
                    userName: user.userName,
                    profileImage: user.profileImage
                }
            });
        });
    });
};

// 카카오 로그인 콜백 API 처리
const kakaoCallback = async (req, res) => {
    const { code } = req.query;
    const KAKAO_REST_API_KEY = 'b0abcbdd05b3cc529063683c1a4e5003';
    const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_API_URL}/login/kakao/callback`;

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

        // 3. DB 사용자 확인 및 처리
        loginModel.getKakaoUserById(kakaoId, (err, user) => {
            if (err) {
                console.error('카카오 로그인 실패:', err);
                return res.status(500).json({ error: '로그인 실패: 서버 오류' });
            }

            let finalUser = user;
            if (!finalUser) {
                // 회원가입 처리
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

            // [수정됨] 클라이언트(React)가 읽을 수 있도록 쿠키 설정 (httpOnly: false)
            const cookieOptions = {
                path: '/',
                httpOnly: false,
                maxAge: 60 * 1000 // 1분 동안 유효 (전송용)
            };

            res.cookie('token', token, cookieOptions);
            res.cookie('userId', user.userId, cookieOptions);
            // 한글 이름 깨짐 방지를 위해 인코딩
            res.cookie('userName', encodeURIComponent(user.userName), cookieOptions);
            res.cookie('profileImage', user.profileImage || '', cookieOptions);

            // [중요] 프론트엔드 홈(포트 3000)으로 리다이렉트
            res.redirect(`${process.env.REACT_APP_CLIENT_URL}/home`);
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