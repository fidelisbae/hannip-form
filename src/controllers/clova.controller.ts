import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import { CHUGUMI } from '../scripts/chugumi';
import { MAGGULMA } from '../scripts/maggulma';
import { GUJABCHAE } from '../scripts/gujabchae';
import { LUCKYBIKI } from '../scripts/luckybiki';
import { REMEMBER } from '../scripts/remember';

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
    const { idea, essential, intro, ending, length, tone, accent, trend } =
      req.body;

    const url =
      'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-DASH-001';
    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY':
        'NTA0MjU2MWZlZTcxNDJiY/IIs6hKNWu7jVWk9J1uJCZ9ajHs0keWuO7NCEIcJWPp',
      'X-NCP-APIGW-API-KEY': process.env.NCP_API_GATEWAY_KEY,
      'Content-Type': 'application/json',
    };

    const trendScript = [];

    if (trend === '추구미') {
      trendScript.push(...CHUGUMI);
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼을 만들어줘
                  추구미 유형어가 제목에 필수로 들어가야 한다
                  추구미: 롤모델 같은건데, 단순히 닮고 싶은 사람만 의미하는 게 아니고, 내가 추구하는 '분위기', '이미지', '모습' 등 다양한걸 말함
      
                  주제: ${idea}
                  필수요소: ${essential}
                  인트로: ${intro}
                  엔딩: ${ending}
                  영상길이: ${length}
                  말투: ${tone}
                  사투리: ${accent}
                  유행어: 추구미`,
      });
    } else if (trend === '맛꿀마') {
      trendScript.push(...MAGGULMA);
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼을 만들어줘
                  맛꿀마 유행어가 제목에 필수로 들어가야 한다
                  맛꿀마: 맛있다라는 뜻
      
                  주제: ${idea}
                  필수요소: ${essential}
                  인트로: ${intro}
                  엔딩: ${ending}
                  영상길이: ${length}
                  말투: ${tone}
                  사투리: ${accent}
                  유행어: 맛꿀마`,
      });
    } else if (trend === '~그 잡채') {
      trendScript.push(...GUJABCHAE);
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼을 만들어줘
                ~그 잡채 유형어가 제목에 필수로 들어가야 한다
                ~그 잡채: ~그 자체를 재미있게 표현한 단어를 말함. ~그 자체 대신에 ~그 잡채로 쓰임
                
                주제: ${idea}
                필수요소: ${essential}
                인트로: ${intro}
                엔딩: ${ending}
                영상길이: ${length}
                말투: ${tone}
                사투리: ${accent}
                유행어: ~그 잡채`,
      });
    } else if (trend === '완전 럭키비키잖아') {
      trendScript.push(...LUCKYBIKI);
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼을 만들어줘
                완전 럭키비키잖아 유형어가 제목에 필수로 들어가야 한다
                완전 럭키비키잖아: 운이 좋잖아를 표현하는 말. 부정적일 수도 있는 상황에서 긍정적인 사고회로로 전환할때 쓰인다. 
                앞 문장이 부정적 내용이고, 그 뒤에 부정적인 상황에서도 긍정적일 수 있다는 걸 얘기한다. ~해서 완전 럭키비키잖아 의 형태로 쓰인다.
                
                주제: ${idea}
                필수요소: ${essential}
                인트로: ${intro}
                엔딩: ${ending}
                영상길이: ${length}
                말투: ${tone}
                사투리: ${accent}
                유행어: 완전 럭키비키잖아`,
      });
    } else if (trend === '~은 이 일을 기억할 것입니다') {
      trendScript.push(...REMEMBER);
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼을 만들어줘
                ~은 이 일을 기억할 것입니다 유형어가 제목에 필수로 들어가야 한다
                ~은 이 일을 기억할 것입니다: 후일을 도모하겠다 라는 느낌으로 쓰임. 특정 대상 혹은 사건에서 자신에게 있었던 일을 기억할 것이라는 뜻으로 쓰임. 
                혹은 그냥 기억하겠다 라는 말로도 쓰임.
                
                주제: ${idea}
                필수요소: ${essential}
                인트로: ${intro}
                엔딩: ${ending}
                영상길이: ${length}
                말투: ${tone}
                사투리: ${accent}
                유행어: ~은 이 일을 기억할 것입니다`,
      });
    } else {
      trendScript.push({
        role: 'user',
        content: `해당 내용으로 숏폼 대본을 만들어줘
                
                  주제: ${idea}
                  필수요소: ${essential}
                  인트로: ${intro}
                  엔딩: ${ending}
                  영상길이: ${length}
                  말투: ${tone}
                  사투리: ${accent}
                  `,
      });
    }

    const data = {
      messages: [...trendScript],
      topP: 0.8,
      topK: 0,
      maxTokens: 2000,
      temperature: 0.2,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: false,
      seed: 0,
    };

    const response = await axios.post(url, data, { headers });

    const clovaResult = response.data;
    const result = clovaResult.result.message.content;

    const response2 = await axios.post(
      url,
      {
        messages: [
          {
            role: 'user',
            content: `${result}

            위 대본으로 영상을 만들때 팁을 5가지 알려줘
            위 대본내용에 대한 조언이 들어가야해
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
      },
      { headers },
    );
    const clovaResult2 = response2.data;
    const result2 = clovaResult2.result.message.content;

    console.log(result2);

    return res.status(200).json({
      script: result,
      advice: result2,
    });
  } catch (error) {
    next(error);
  }
}
