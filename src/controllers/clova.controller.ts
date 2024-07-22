import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export async function createIdea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { subject, essential, opening, closing, length, tone } = req.body;

    const url =
      'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003';
    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY':
        'NTA0MjU2MWZlZTcxNDJiY/IIs6hKNWu7jVWk9J1uJCZ9ajHs0keWuO7NCEIcJWPp',
      'X-NCP-APIGW-API-KEY': 'LuUo3tEvQF1nnnZA4vOWmuJghmGhJvCCpUTsXG2E',
      //   'X-NCP-CLOVASTUDIO-REQUEST-ID': '736e4666-433c-45a4-8cc7-5414ac888df0',
      'Content-Type': 'application/json',
    };

    const data = {
      messages: [
        {
          role: 'system',
          content: `1. 답변의 말투는 ${tone} 로 해주세요.
                    2. 답변은 한가지만 제공합니다.`,
        },
        {
          role: 'user',
          content: `숏폼을 제작할건데 아래 조건에 맞는 아이디어를 추천해줘
          주제: ${subject}
          필수포함내용: ${essential}
          첫인사: ${opening}
          맺음말: ${closing}
          영상길이: ${length}
          `,
        },
      ],
      topP: 0.8,
      topK: 0,
      maxTokens: 256,
      temperature: 0.5,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: true,
      seed: 0,
    };

    const response = await axios.post(url, data, { headers });

    const result = response.data;

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
