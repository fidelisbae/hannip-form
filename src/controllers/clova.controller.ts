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
    const { idea, essential, opening, closing, length, tone } = req.body;

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
          content: `1. 답변은 문자열 형태로 한가지를 제공해야 합니다.
                    2. 설명은 생략하고 결과만 제공해야 합니다.
                    3. ${tone} 말투로 제공해야 합니다.
                    4. 아래 형식에 맞춰 제공해야 합니다.
                    <aside>
                    🚨 인트로: (첫인사)

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
                    주제: 파리 길거리 음식 먹어보기
                    필수 요소: 피자 맛집
                    첫인사: 선배 마라탕 사주세요
                    끝맺음: 구독과 좋아요
                    영상 길이: 1분
                    말투: 잼민이 말투`,
        },
        {
          role: 'assistant',
          content: `→ 제목 : 파리 길거리 음식 먹방

                  → 인트로 : 선배 마라탕 사주세요.

                  장면#1 (파리 거리를 걷는 모습)
                  여기가 바로 그 유명한 파리의 길거리에요! 너무 예쁘지 않나요?

                  장면#2 (피자 맛집 앞에 선 모습)
                  그리고 여기가 바로바로! 이 동네 사람들은 다 안다는 피자 맛집이에요! 소문 듣고 찾아왔답니다><

                  장면#3 (피자를 먹는 모습)
                  으음~ 역시 듣던 대로 너무너무 맛있어요! 치즈 늘어나는 것 좀 보세요 대박이죠?!

                  장면#4 (다른 길거리 음식을 먹는 모습)
                  이것도 먹고 저것도 먹고 완전 배터질거 같아요ᄏᄏᄏ 아 행복해ᅲᅲ

                  장면#5 (엔딩 포즈를 취하며)

                  이렇게 맛있는 걸 혼자 먹을 순 없죠! 우리 모두 파리 길거리 음식 먹으러 가보자구요!
                  그럼 안녕~ 지금까지 시청해 주셔서 감사해요! 구독과 좋아요~~`,
        },
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                    주제: ${idea}
                    필수 요소: ${essential}
                    첫인사: ${opening}
                    끝맺음: ${closing}
                    영상 길이: ${length}
                    말투: ${tone}`,
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
    const result = clovaResult.result.message.content;

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
