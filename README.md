# ✈️ Shall We Trip
# 🤔서비스 기획 의도 ?
위드 코로나 정책이 시작됨으로써, 여행에 대한 기대감이 높아지고 있습니다.  
오랜만에 떠난 여행에서 예산 관리에 대한 걱정없이 즐길 수 있도록 여행지에서 유용하게 사용 할 수 있는 가계부 서비스를 기획했습니다.  
여행지를 설정하면 현지 통화로 예산을 설정하고, 지출 내역 등록 및 총 지출 내역과 남은 예산을 보여줍니다.  
실시간 환율 계산 기능과 주요 여행지 환율도 함께 제공합니다.

<br />
<br />

# 🗓 프로젝트 기간
2021.10.30 - 2021.11.05

<br />
<br />

# 👩‍💻 프로젝트 인원 및 역할 분담
| 이름                                      | 설명                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| [박바름](https://github.com/congaweb) | 회원가입(실시간 form validation, id 중복 체크), 로그인 / 로그아웃 (JWT 활용) 페이지 구현 |
| [이정훈](https://github.com/jhyj0521)     | 웹팩 설정, 지출 추가 기능, 카테고리 별 필터링 및 인피니트 스크롤을 이용해 지출 내역 조회                          |
| [이효원](https://github.com/hhhyyo)   | 여행리스트 페이지, 여행 추가 기능(실시간 form validation), 원화 입력 시 여행지에 따른 환율 계산 결과 제공 |
| [박태준](https://github.com/joker77z)   | 나라 이름 검색 자동 완성 기능, 환율 API를 이용한 환율 계산기, 주요 여행지 실시간 환율 제공                                      |

<br />
<br />

# 📚 기술 스택
* HTML
* Sass
* Javascript
* Node.js
* Express

<br />
<br />

# ✨ 주요 기능
### 1. 로그인

| 회원가입 | 로그인 | 로그아웃 | 
|:------:|:------:|:------:|
| ![56d0d8d1a9a971cf](https://user-images.githubusercontent.com/61184798/143239286-e26c6c89-4f61-400b-9ac0-0776b1894f09.gif) | ![cfca4a4a5d4a81d7](https://user-images.githubusercontent.com/61184798/143239347-bef6bf82-aaa4-4105-94a3-96edd14a8c56.gif) | ![6bbf5de325f7c7e8](https://user-images.githubusercontent.com/61184798/143239408-99020a87-7ddb-44c7-989e-3a77e13bbda5.gif) |

<br />
<br />


### 2. 환율 계산

| 국가자동완성 및 환율계산 | 실시간 환율 |
|:------:|:------:|
| ![국가자동완성 및 환율계산](https://user-images.githubusercontent.com/61184798/143240551-8e3fa208-ca9a-4857-a782-69c0a0d66ffa.gif) | ![실시간 환율](https://user-images.githubusercontent.com/61184798/143240561-eb418960-1294-40f2-8615-3ac485614543.gif) | 



<br />
<br />

### 3. 여행 리스트

| 여행추가모달 | 유효성검사 | 여행추가 | 여행목록 |
|:------:|:------:|:------:|:------:|
| ![Nov-24-2021 21-15-58](https://user-images.githubusercontent.com/61184798/143238079-861e2167-7bc0-44e4-9f72-80831bb693f2.gif) | ![Nov-24-2021 21-07-56](https://user-images.githubusercontent.com/61184798/143238123-af26cd4e-7943-4b4e-9cb6-d0611a9f8999.gif) | ![Nov-24-2021 21-16-50](https://user-images.githubusercontent.com/61184798/143238161-f6139fbd-8ccd-44c1-8b17-322319823887.gif) | ![Nov-24-2021 22](https://user-images.githubusercontent.com/61184798/143238537-6d0d6560-43bd-45b6-96c1-f081593c15c7.gif) |

여행 기간에 따라 진행중인 여행, 다가올 여행, 지난 여행을 구분하여 화면을 개발했습니다.  
디바운스 처리를 통해 사용자의 입력이 끝나면 환율 api 요청을 보냅니다

<br />
<br />

### 4. 지출 목록

| 지출추가 | 카테고리필터링 | 지출목록 | 
|:------:|:------:|:------:|
| ![지출추가](https://user-images.githubusercontent.com/61184798/143240032-1c26d741-aef7-4f66-be25-aa197e982a95.gif) | ![지출필터링](https://user-images.githubusercontent.com/61184798/143240038-fb68736d-fa21-49ba-92f1-25e819d12e43.gif) | ![지출목록](https://user-images.githubusercontent.com/61184798/143240000-529839fa-e6ae-4d70-9bd0-66589fc114f0.gif) |




<br />
<br />

## 팀원



|                                 박바름                                 |                                   박태준                                   |                                 이정훈                                 |                                이효원                                 |
| :--------------------------------------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|                [@congaweb](https://github.com/congaweb)                |              [@joker77z](https://github.com/joker77z)              |                [@jhyj0521](https://github.com/jhyj0521)                |                [@hhhyyo](https://github.com/hhhyyo)                 |
| <img src="https://avatars.githubusercontent.com/congaweb" width="100"> | <img src="https://avatars.githubusercontent.com/joker77z" width="100"> | <img src="https://avatars.githubusercontent.com/jhyj0521" width="100"> | <img src="https://avatars.githubusercontent.com/hhhyyo" width="100"> |
