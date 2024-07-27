import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const CHUGUMI = [
  {
    role: 'user',
    content: `해당 내용으로 숏폼을 만들어줘
            추구미 유형어가 제목에 필수로 들어가야 한다
            추구미: 롤모델 같은건데, 단순히 닮고 싶은 사람만 의미하는 게 아니고, 내가 추구하는 '분위기', '이미지', '모습' 등 다양한걸 말함

            주제: 쿨톤 메이크업
            필수요소: 무쌍
            인트로: 팽하~!
            엔딩: 구독좋아요알람설정
            영상길이: 30초
            말투:
            사투리: 
            유행어: 추구미~`,
  },
  {
    role: 'assistant',
    content: `제목: 무쌍인간의 추구미 메이크업
              인트로: 펭하!~

              [장면#1] (브러쉬에 섀도우를 묻히며)
              저는 일단 여름 쿨톤이라 여름 쿨톤 메이크업을 자주하는 편이에요

              [장면#2] (눈썹을 그리며)
              그리고 요즘에는 아이브로우나 브로우카라로 눈썹을 가득 채우는걸 좋아해요

              [장면#3] (핑크색 섀도우를 묻히며)
              평소에 라이트한 핑크톤을 자주 사용하는데 오늘의 픽은 "에뛰드 섀도우"로 갑니다. 연하게 눈두덩이에 바르는게 좋아요. 밝은 색으로는 애교살을 밝혀줍니다

              [장면#4] (립스틱을 바르며)
              짠, 이렇게 오늘 여름 쿨톤 메이크업이 다됐습니다! 저녁약속을 잡아야할 정도로 상큼하죠!? 구독 좋아요 알림설정 한번씩 부탁해요~ 그럼 안녕~`,
  },
  {
    role: 'user',
    content: `해당 내용으로 숏폼을 만들어줘
              추구미 유형어가 제목에 필수로 들어가야 한다
              추구미: 롤모델 같은건데, 단순히 닮고 싶은 사람만 의미하는 게 아니고, 내가 추구하는 '분위기', '이미지', '모습' 등 다양한걸 말함
      
      주제: "장마철 코디",
      필수요소: "장마",
      인트로: "안뇽 여러분",
      엔딩: "없음",
      영상길이: "45초",
      말투: "존댓말",
      사투리: "충청도 사투리",
      유행어: "추구미"
     `,
  },
  {
    role: 'assistant',
    content: `제목: 요즘 추구미 한가득! 장마철 부츠 코디
      인트로: 안뇽 여러분
      
      [장면#1] (한바퀴 빙그르르 돌며)
      오늘은 장마철 맞이 부츠 코디 보여드릴게유. 77-88언냐들 드루와!!
  
      [장면#2] (한껏 모델포즈를 취하며)
      LOOK1번은 검정 나시원피스에 흰색 포인트 나시 그리고 팔뚝을 가려줄 볼레로 가디건으로 코
      디해봤어유. 팔뚝도 가리고 시원힘은 지킬 수 있어유!
  
      [장면#3] (옷을 갈아입고 모델포즈를 취하며)
      LOOK2번은 요즘 추구미의 꾸안꾸 룩이여라! 전체적으로 루즈한 핏이라 가방도 루즈하게 매치
      혀야 힙하다!
  
      [장면#4] (카메라로 가까이오며)
      오땨. 이게 요즘 추구미 스타일의 부츠 코디였어유. 장마철에도 끄떡 없겠쥬? 잘입고 또봐~~    
      `,
  },
  {
    role: 'user',
    content: `해당 내용으로 숏폼을 만들어줘
            추구미 유형어가 제목에 필수로 들어가야 한다
            추구미: 롤모델 같은건데, 단순히 닮고 싶은 사람만 의미하는 게 아니고, 내가 추구하는 '분위기', '이미지', '모습' 등 다양한걸 말함
            
          주제: 이종석
					필수요소: 
					인트로: 
					엔딩: 
					영상길이: 60초
					말투: 
					사투리: 
					유행어: 추구미
    `,
  },
  {
    role: 'assistant',
    content: `
	    제목: 이종석 추구미 알아냄
	    인트로: 
	    
	    [장면#1] (이종석이 인터뷰하는 모습)
			배우 이종석이 보그 매거진에서 인터뷰한 내용이 화제입니다.

			[장면#2] (이종석이 손을 흔들며 웃는 모습)
			요즘 추구미가 무엇이냐는 질문에 배우 이종석은 이렇게 답했습니다.
			
			[장면#3] (이종석 인터뷰 영상)
			
			[장면#4] (이종석이 레드카펫을 걸어가는 모습)
			이렇게 이종석의 추구미를 알아봤습니다.감사합니다.
    `,
  },
  {
    role: 'user',
    content: `해당 내용으로 숏폼을 만들어줘
              추구미 유형어가 제목에 필수로 들어가야 한다
              추구미: 롤모델 같은건데, 단순히 닮고 싶은 사람만 의미하는 게 아니고, 내가 추구하는 '분위기', '이미지', '모습' 등 다양한걸 말함
              
              주제: 제로베이스원
              필수요소: 장하오가 꼭 나와야함
              인트로: 
              엔딩: 
              영상길이: 30초
              말투: 반말
              사투리: 
              유행어: 추구미
      `,
  },
  {
    role: 'assistant',
    content: `
        제목: 장하오 한유진 추구미 차이
        인트로: 
        
        [장면#1] (한유진이 해맑게 웃는 모습)
        (자막 : 어른이 되고 싶은 아기)
        어른이 되고 싶어요
        
        [장면#2] (장하오가 애교를 부리는 모습)
        (자막 : 아기가 되고 싶은 어른)
        나도 애기야ㅑㅑㅑ
        
        [장면#3] (장하오가 꽃받침을 하는 모습)
        (자막 : 고등학교 선생님 자격증 보유)
        나도 애기할거야 뿌잉뿌잉
        
        [장면#4] (장하오와 한유진이 같이 있는 모습을 보여주며)
        이렇게 보니까 형과 막내의 추구미가 엄청 반대네...? 그래도 둘 다 귀여움
      `,
  },
];

const MAGGULMA = [
  {
    role: 'user',
    content: `해당 내용으로 숏폼 대본을 만들어줘
            맛꿀마 유행어가 제목에 필수로 들어가야 한다
            맛꿀마: 맛있다라는 뜻

            주제: 빵집 브이로그
            필수요소: 빵집에서 빵을 사려는데 빵이 다팔림
            인트로: 안녕하세요
            엔딩: 그럼 안녕
            영상길이: 1분
            말투: 존댓말
            사투리: 
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
];

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
    } else if (trend === '맛꿀마') {
      trendScript.push(...MAGGULMA);
    }

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
        ...trendScript,
        {
          role: 'user',
          content: `해당 내용으로 숏폼 대본을 만들어줘
                  
                    주제: ${idea}
                    필수 요소: ${essential}
                    인트로: ${intro}
                    엔딩: ${ending}
                    영상 길이: ${length}
                    말투: ${tone}
                    사투리: ${accent}
                    유행어: ${trend}
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
