import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export async function createIdea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { category, info, content } = req.body;

    const url =
      'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003';
    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY':
        'NTA0MjU2MWZlZTcxNDJiY/IIs6hKNWu7jVWk9J1uJCZ9ajHs0keWuO7NCEIcJWPp',
      'X-NCP-APIGW-API-KEY': process.env.NCP_API_GATEWAY_KEY,
      'Content-Type': 'application/json',
    };

    const data = {
      messages: [
        {
          role: 'system',
          content: `1. 답변은 배열형태로 다섯가지를 제공해야 합니다.
                    2. 설명은 생략하고 결과만 제공해야 합니다.
                    3. 명사 형태로 제공해야 합니다.`,
        },
        {
          role: 'user',
          content: `파리올림픽 관련으로 숏폼을 만들건데 아이디어 생성해줘`,
        },
        {
          role: 'assistant',
          content: `[파리 올림픽 종목 체험기, 파리 올림픽 선수들과의 인터뷰, 파리 올림픽 응원가 제작하기, 파리 올림픽 마스코트와 함께하는 댄스 챌린지, 파리 올림픽 경기장 및 주변 관광지 소개]`,
        },
        {
          role: 'user',
          content: `숏폼을 만들건데 아이디어 생성해줘

                    제작하고 싶은 숏폼 영상 카테고리: ${category}
                    내 채널 소개: ${info}
                    만들고 싶은 내용: ${content}`,
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

    const clovaResult = response.data;
    const ideasString = clovaResult.result.message.content;
    const result = ideasString.slice(1, -1).split(', ');

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createScript(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { idea, essential, opening, closing, length, tone, trend } = req.body;

    const url =
      'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-DASH-001';
    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY':
        'NTA0MjU2MWZlZTcxNDJiY/IIs6hKNWu7jVWk9J1uJCZ9ajHs0keWuO7NCEIcJWPp',
      'X-NCP-APIGW-API-KEY': process.env.NCP_API_GATEWAY_KEY,
      'Content-Type': 'application/json',
    };

    const data = {
      messages: [
        {
          role: 'system',
          content: `답변은 아래 형식에 맞춰 제공해야 합니다.
              
                    <aside>
                    제목: (제목)
                    인트로: (첫인사)

                    장면 n [화면 : 보여지는 모습 설명 문구]
                    영상에 어울릴 스크립트

                    장면 n [화면 : 보여지는 모습 설명 문구]
                    영상에 어울릴 스크립트

                    장면 n [화면 : 보여지는 모습 설명 문구]
                    영상에 어울릴 스크립트 (+ 끝맺음)
                    </aside>`,
        },
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                    맛꿀마 유행어가 제목에 필수로 들어가야 한다
                    맛꿀마: 맛있다라는 뜻

                    주제: 빵집 브이로그
                    필수 요소: 빵집에서 빵을 사려는데 빵이 다팔림
                    첫인사: 안녕하세요
                    끝맺음: 그럼 안녕
                    영상 길이: 1분
                    말투: 존댓말
                    유행어: 맛꿀마`,
        },
        {
          role: 'assistant',
          content: `제목 : 이 집 베이글 맛꿀마

                    인트로 : 안녕하세요

                    장면#1 (빵집으로 걸어가는 모습)
                    여기가 장원영이 베이글을 먹었던 빵집입니다. 사람 대박이죠?

                    장면#2 (빵집 내부로 진입하는 모습)
                    헉, 들어왔는데 빵이 하나도 없는데요? 직원 분한테 빵이 있는지 물어보죠.

                    장면#3 (빵집 직원과 대화를 하는 모습)
                    와, 직원분과 대화를 했는데, 빵이 20분 뒤에 나온다고 하네요! 20분만 기다리면 따끈한 빵을 먹을 수 있다니 저 완전 럭키비키 아닙니까?!

                    장면#4 (20분 뒤 빵을 골라온 모습)
                    짠, 이렇게 갓 나온 따끈따끈한 빵을 먹을 수 있게 되었어요! 너무 기분 좋네요~ 그럼 안녕.`,
        },
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                    ${trend} 유행어가 제목에 필수로 들어가야 한다
                    ${trend}: 맛있다라는 뜻
                  
                    주제: ${idea}
                    필수 요소: ${essential}
                    첫인사: ${opening}
                    끝맺음: ${closing}
                    영상 길이: ${length}
                    말투: ${tone}
                    `,
        },
      ],
      topP: 0.8,
      topK: 0,
      maxTokens: 2000,
      temperature: 0.5,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: false,
      seed: 0,
    };

    const response = await axios.post(url, data, { headers });

    const clovaResult = response.data;
    const result = clovaResult.result.message.content;

    return res.status(200).json(clovaResult);
  } catch (error) {
    next(error);
  }
}
