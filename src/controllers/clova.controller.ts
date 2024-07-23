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
          content: `1. 답변은 문자열 형태로 한가지를 제공해야 합니다.
                    2. 설명은 생략하고 결과만 제공해야 합니다.
                    3. ${tone} 말투로 제공해야 합니다.
                    4. 럭키비키 는 좋지않은 상황에도 긍적적으로 표현할때 사용하는 유행어입니다.
                    5. 아래 형식에 맞춰 제공해야 합니다.
              
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
                    주제: 빵원정대
                    필수 요소: 빵집
                    첫인사: 안녕하세요
                    끝맺음: 그럼 안녕
                    영상 길이: 1분
                    말투: 존댓말
                    유행어: 럭키비키`,
        },
        {
          role: 'assistant',
          content: `제목 : 빵원정대

                    인트로 : 안녕하세요.

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
                    주제: 물이 이만큼이나 남았네?!
                    필수 요소: 춤연습
                    첫인사: 안녕하세요
                    끝맺음: 완전 럭키비키잖아
                    영상 길이: 30초
                    말투: 존댓말
                    유행어: 럭키비키`,
        },
        {
          role: 'assistant',
          content: `제목 : 물이 이만큼이나 남았네?!

                    인트로 : 안녕하세요.

                    장면#1 (춤 연습을 끝낸 모습)
                    연습 너무 힘들어요ㅠㅠ 한시간이나 춤을 춘거 있죠! 목말라서 물을 마셔야 겠어요.

                    장면#2 (물병을 집어든 모습)
                    헉, 어쩜 물이 딱 반 정도 남았네요!!
                    한병을 다 먹기엔 너무 많고, 덜 먹기엔 너무 적어서 딱 반 만 있었으면 좋겠다고 생각했는데!!!! 어쩜 완전 럭키비키잖아!`,
        },
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                    주제: 어쨌든 1등
                    필수 요소: 게임
                    첫인사: 오예
                    끝맺음: 완전 럭키비키잖아
                    영상 길이: 15초
                    말투: 반말
                    유행어: 럭키비키`,
        },
        {
          role: 'assistant',
          content: `제목 : 어쨌든 1등

                    인트로 : 오예!!

                    장면#1 (게임을 했는데 진 모습)
                    앗싸~ 뒤에서 1등이다! 꼴찌 해도 뒤에서 1등이니까 완전 럭키비키잖아!`,
        },
        {
          role: 'user',
          content: '럭키비키 유행어는 어떻게 사용하나요?',
        },
        {
          role: 'assistant',
          content: `럭키비키는 좋지 않은 상황에서도 긍정적으로 표현할 때 사용하는 유행어예요. 
                    예를 들어 시험을 망쳤을 때 \"시험을 망쳤지만 빵점은 아니니까 럭키비키!\"라고 말할 수 있어요. 
                    이렇게 사용하면 상황을 긍정적으로 받아들일 수 있고, 스트레스도 덜 받을 수 있답니다. 
                    또 다른 예시로는 과제 제출일을 놓쳤을 때 \"과제 제출일을 놓쳤지만 어쩔 수 없지 뭐.. 열심히 놀았으니까 럭키비키!\"
                    라고 사용 할 수도 있어요.`,
        },
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                    주제: ${idea}
                    필수 요소: ${essential}
                    첫인사: ${opening}
                    끝맺음: ${closing}
                    영상 길이: ${length}
                    말투: ${tone}
                    유행어: ${trend}`,
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
