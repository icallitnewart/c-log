**수정 중입니다.**
# C-log
## 📖 Contents
1. [Description](#%EF%B8%8F-description)
2. [Tech Stacks](#-tech-stacks)
3. [Getting Started](#-getting-started)
4. [Features](#-features)
   1. [Home](#home)
   2. [About](#about)
   3. [Blog](#blog)
   4. [Gallery](#gallery)
   5. [Playlist](#playlist)
   6. [Contact](#contact)
5. [Structure](#-structure)
   1. [Overview](#overview)
   2. [Components](#components)
   3. [CSS & SCSS](#css--scss)
6. [Commit Messages](#-commit-messages)
## 🙋‍♀️ Description
- **Project Name** C-log
- **URL** [https://icallitnewart.github.io/c-log/](https://icallitnewart.github.io/c-log/)
- **Concept** 코딩 블로그 컨셉의 개인 홈페이지
- **Aims** 
  <br/>📌 로컬 스토리지를 이용한 CRUD 구현
  <br/>📌 emailJS, flickr API, youtube API 등 다양한 외부 API 활용 

## 💻 Tech Stacks
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## 🔧 Getting Started
1. clone repository
```
$ git clone "https://github.com/icallitnewart/c-log.git"
```
2. install dependencies 
```
$ npm install
```
3. start project
```
$  npm start
```

## ✨ Features
### [Home]
#### ✅ 타이핑 애니메이션 효과
  - 폴더를 클릭하면 JSON 데이터 호출
  - setInterval 메소드를 활용하여 호출한 데이터를 한 글자씩 상태 업데이트함으로써 타이핑 이펙트 적용
  - 📄 **ᴍᴀɪɴ** Prompt.js
#### ✅ 최신글, 인기글 목록 보기
  - 로컬스토리지에 저장된 데이터 불러오기 (저장된 데이터가 없을 경우엔 새롭게 데이터 호출 후 로컬스토리지에 저장)
  - 가장 좋아요가 많은 순으로 글 목록 정렬
  - 최신순으로 글 목록 정렬
  - 📄 **ᴍᴀɪɴ** PostList.js &nbsp;**sᴜʙ** List.js

### [About]
#### ✅ 탭메뉴 구현 및 말풍선 애니메이션 효과 
  - 탭메뉴 클릭시 각 섹션에 대한 소개말 보여주기
  - 소개말을 대화창 형식으로 구성하여 말풍선 애니메이션 이펙트 적용
  - 📄 **ᴍᴀɪɴ** index.js

### [Blog]
#### ✅ 로컬스토리지를 이용하여 CRUD 구현
  - 첫 로드시 원본 글 데이터(JSON)를 호출하여 로컬스토리지에 저장 
  - 읽기, 쓰기, 삭제, 수정 지원
  - 📄 **ᴍᴀɪɴ** Post.js PostEdit.js PostView.js PostList.js
#### ✅ 글 작성시 카테고리 선택 기능
  - 📄 **ᴍᴀɪɴ** PostEdit.js
#### ✅ 좋아요 버튼 기능
  - 하트 버튼 한번 클릭시 좋아요, 두번 클릭시 좋아요 취소
  - 📄 **ᴍᴀɪɴ** PostView.js
#### ✅ 페이지네이션 기능
  - 반응형 지원: 모바일 사이즈일 시 페이지 번호가 5개까지만 보이고 그 외 사이즈에선 10개
  - 📄 **ᴍᴀɪɴ** Pagination.js
#### ✅ 웹에디터(CKEditor5) 적용
  - 📄 **ᴍᴀɪɴ** PostEdit.js
#### ✅ 카테고리 버튼 클릭시 게시글 카테고리별로 분류 기능
  - 📄 **ᴍᴀɪɴ** PostList.js
  #### ✅ 글 목록 보기 그리드뷰, 리스트뷰 전환 
  - 📄 **ᴍᴀɪɴ** PostList.js

### [Gallery]
#### ✅ Flickr API를 활용한 갤러리
  - Modal 팝업
  - 📄 **ᴍᴀɪɴ** index.js &nbsp;**sᴜʙ** Popup.js

### [Playlist]
#### ✅ Youtube API를 활용한 플레이리스트
  - Modal 팝업
  - 팝업창에서 재생/중지 버튼으로 유튜브 영상 제어 가능
  - 📄 **ᴍᴀɪɴ** index.js &nbsp;**sᴜʙ** Popup.js

### [Contact]
#### ✅ 폼유효성 검사
  - 📄 **ᴍᴀɪɴ** FormBox.js &nbsp;**sᴜʙ** Success.js
#### ✅ emailJS를 활용하여 이메일 전송
  - 📄 **ᴍᴀɪɴ** FormBox.js

## 📁 Structure
### [Overview]
```
src
├── public            # HTML, DB, image files
│    ├── db           # DB(JSON) files
│    ├── img          # Image files
│    ├── favicon.ico
│    └── index.html
├── src               # Source files 
│    ├── components   # Component files per page
│    ├── css          # CSS files
│    ├── scss         # SCSS files
│    ├── App.js
│    └── index.js
└── README.md
```
### [Components]
```
components       
├── common
│     ├── Footer.js
│     ├── Header.js
│     ├── Loading.js
│     └── Tab.js
├── main
└── Intro.js
│     ├── List.js
│     ├── PostList.js
│     ├── Prompt.js
│     └── Visual.js
└── sub 
       ├── About
        │     └── index.js
       ├── Blog
       │     ├── index.js
       │     ├── Pagination.js
       │     ├── Post.js
       │     ├── PostEdit.js
       │     ├── PostList.js
       │     └── PostView.js
       ├── Contact
       │     ├── FormBox.js
       │     ├── index.js
       │     └── Success.js
       ├── Gallery
       │     ├── index.js
       │     └── Popup.js
       └──  Playlist
              ├── index.js
              └── Popup.js
```
### [CSS & SCSS]
```
src
├── css
│     ├── style.css
│     └── style.css.map
└── scss
      ├── common
      │     ├── _layout.scss
      │     ├── _mixin.scss
      │     └── _reset.scss
      ├── main
      │     └── _visual.scss
      ├── sub
      │     ├── _about.scss
      │     ├── _blog.scss
      │     ├── _contact.scss
      │     ├── _gallery.scss
      │     ├── _playlist.scss
      │     └── _post.scss
      └── style.scss
```

## 📢 Commit Messages
|TAG|DESCRIPTION|
|:---:|:---:|
|Feat|새로운 기능 추가|
|Fix|버그 수정|
|Design|사용자 UI 디자인 변경|
|Style|코드 포맷 변경 (코드 수정 X)|
|Refactor|코드 리팩토링|
|Comment|주석 추가 및 변경|
|Docs|문서 수정|
|Chore|기타 변경사항 (패키지 업데이트 등)|
|Rename|파일 및 폴더명 수정 또는 이동|
|Remove|파일 삭제|