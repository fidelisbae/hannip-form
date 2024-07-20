import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function kakaoLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redirectUri = 'http://localhost:3000/auth/kakao/callback';
    const clientId = process.env.KAKAO_CLIENT_ID;

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    return res.redirect(kakaoAuthURL);
  } catch (error) {
    next(error);
  }
}

export async function kakaoCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log('aaaaaaa');
    const userRepository = dataSource.getRepository('User');

    const { code } = req.query;

    const response = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/auth/kakao/callback',
        code: code,
      },
    });

    const { access_token } = response.data;

    const userResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(userResponse);

    const email: string = userResponse.data.kakao_account.email;

    const isExistUser = await userRepository.findOne({ where: { email } });

    if (!isExistUser) {
      const user = await userRepository.save({ email });

      return res.status(200).json(user);
    } else {
      // req.session.email = email;

      return res.status(200).json(isExistUser);
    }
  } catch (error) {
    next(error);
  }
}
