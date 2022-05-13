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
   2. [Components & Hooks](#components--hooks)
   3. [CSS & SCSS](#css--scss)
6. [Commit Messages](#-commit-messages)
## 🙋‍♀️ Description
- **Project Name** C-log
- **URL** [https://icallitnewart.github.io/c-log/](https://icallitnewart.github.io/c-log/)
- **Concept** 코딩 블로그 컨셉의 개인 홈페이지
- **Aims** 
  <br/>📌 로컬 스토리지를 이용한 CRUD 구현
  <br/>📌 emailJS, flickr API, youtube API 등 다양한 외부 API 활용 
  <br/>📌 반응형 웹 지원

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
![Home_Prompt](https://user-images.githubusercontent.com/65598117/168319481-4a69e9fd-a62e-4340-9ea7-d0152f02621b.gif)
  - 폴더를 클릭하면 JSON 데이터 호출
  - setInterval 메소드를 활용하여 호출한 데이터를 한 글자씩 상태 업데이트함으로써 타이핑 이펙트 적용
  - 📄 **ᴍᴀɪɴ** [Prompt.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/Prompt.js) 
#### ✅ 최신글, 인기글 목록 보기
![Home_PostList](https://user-images.githubusercontent.com/65598117/168319498-311cca77-ce22-4200-8f10-52e108f4e6ad.png)
  - 로컬스토리지에 저장된 데이터 불러오기 (저장된 데이터가 없을 경우엔 새롭게 데이터 호출 후 로컬스토리지에 저장)
  - 가장 좋아요가 많은 순으로 글 목록 정렬
  - 최신순으로 글 목록 정렬
  - 📄 **ᴍᴀɪɴ** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/PostList.js) &nbsp;**sᴜʙ** [List.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/List.js)

### [About]
#### ✅ 탭메뉴 구현 및 말풍선 애니메이션 효과 
![About](https://user-images.githubusercontent.com/65598117/168319514-a802e9bd-27d2-45ce-bde6-ce15b73eb556.gif)
  - 탭메뉴 클릭시 각 섹션에 대한 소개말 보여주기 (JSON 데이터 호출)
  - 소개말을 대화창 형식으로 구성하여 말풍선 애니메이션 이펙트 적용
  - 📄 **ᴍᴀɪɴ** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/index.js) &nbsp;**sᴜʙ** [Category.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/Category.js) [Dialogue.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/Dialogue.js)

### [Blog]
#### ✅ 로컬스토리지를 이용하여 CRUD 구현
![Blog_CRUD1](https://user-images.githubusercontent.com/65598117/168377504-5a84598d-ff0f-4d7c-8b7d-bf1ef5d2f814.gif)
![Blog_CRUD2](https://user-images.githubusercontent.com/65598117/168377535-f5e7aabc-ffd1-4388-b55c-d935cb508aa3.gif)
  - 첫 로드시 저장된 포스트 데이터(JSON)를 호출하여 로컬스토리지에 저장 
  - 읽기, 쓰기, 삭제, 수정 지원
  - 웹에디터(CKEditor5) 적용
  - 글 작성시 카테고리 선택 기능
  - 📄 **ᴍᴀɪɴ** [Post.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Post.js) [PostEdit.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostEdit.js) [PostView.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostView.js) [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js)
#### ✅ 좋아요 버튼 기능
![Blog_Like](https://user-images.githubusercontent.com/65598117/168377566-3318046c-50c1-4e57-8708-15f31cbbc5bc.gif)
  - 하트 버튼 한번 클릭시 좋아요, 두번 클릭시 좋아요 취소
  - 📄 **ᴍᴀɪɴ** [PostView.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostView.js)
#### ✅ 페이지네이션 기능
![Blog_Pagination](https://user-images.githubusercontent.com/65598117/168377598-7b2b1bc7-f494-42e3-856c-2a182beca18b.gif)
  - **반응형 레이아웃** 지원: 모바일, 태블릿 사이즈인 경우 페이지 번호 5개까지, 그 외엔 10개까지 보여주기
  - 📄 **ᴍᴀɪɴ** [Pagination.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Pagination.js) &nbsp;**ʜᴏᴏᴋs** [useScreenSize.js](https://github.com/icallitnewart/c-log/blob/master/src/hooks/useScreenSize.js)
#### ✅ 카테고리 버튼 클릭시 카테고리별로 게시글 분류 기능
![Blog_Category](https://user-images.githubusercontent.com/65598117/168377636-f5915a17-ad43-4b95-8cdd-0e9b3cafd8ed.gif)
  - HTML, CSS, JS, React 총 4개의 카테고리 중 선택 가능
  - 📄 **ᴍᴀɪɴ** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js) [Btns.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Btns.js)
#### ✅ 글 목록 보기 유형 전환
![Blog_Viewtype](https://user-images.githubusercontent.com/65598117/168377671-579e55de-d0d9-4f08-8cdd-6696fbdb5ddf.gif)
  - 그리드뷰, 리스트뷰 둘 중 선택 가능  
  - (그리드뷰) 글 목록 **반응형 레이아웃** 적용: 스크린 사이즈에 따라 한 페이지에 보여지는 글 개수 변경 
  - 📄 **ᴍᴀɪɴ** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js) &nbsp;**sᴜʙ** [Pagination.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Pagination.js) &nbsp;**ʜᴏᴏᴋs** [useScreenSize.js](https://github.com/icallitnewart/c-log/blob/master/src/hooks/useScreenSize.js)

### [Gallery]
#### ✅ Flickr API를 활용한 갤러리
![Gallery](https://user-images.githubusercontent.com/65598117/168319528-b66a638f-218d-485a-afce-a1c8d499d5cf.gif)
  - 썸네일 클릭시 해당 이미지 Modal 팝업으로 띄우기
  - 카테고리 버튼 클릭시 해당 이미지 리스트 데이터 불러오기
  - Masonry 적용: 스크린 사이즈 변경시 역동적인 레이아웃 정렬 효과
  - 📄 **ᴍᴀɪɴ** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/index.js) &nbsp;**sᴜʙ** [Popup.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/Popup.js) [Category.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/Category.js)

### [Playlist]
#### ✅ Youtube API를 활용한 플레이리스트
![Playlist](https://user-images.githubusercontent.com/65598117/168319587-cbf35d59-4fad-42a6-8ce9-a514e3561eef.gif)
  - 썸네일 클릭시 해당 영상 Modal 팝업으로 띄우기
  - 팝업창에서 재생/중지 버튼으로 유튜브 영상 제어 가능
  - Masonry 적용: 스크린 사이즈 변경시 역동적인 레이아웃 정렬 효과
  - 📄 **ᴍᴀɪɴ** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Playlist/index.js) &nbsp;**sᴜʙ** [Popup.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Playlist/Popup.js)

### [Contact]
#### ✅ 폼유효성 검사
![Contact](https://user-images.githubusercontent.com/65598117/168319599-89e730f8-7a86-4d40-b191-e422167d00a9.gif)
  - 📄 **ᴍᴀɪɴ** [FormBox.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/FormBox.js) &nbsp;**sᴜʙ** [Success.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/Success.js)
#### ✅ emailJS를 활용하여 이메일 전송
  - 📄 **ᴍᴀɪɴ** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/index.js) [FormBox.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/FormBox.js)

## 📁 Structure
### [Overview]
```
src
├── public                  # HTML, DB, image files
│    ├── db                 # DB(JSON) files
│    ├── img               # Image files
│    ├── favicon.ico
│    └── index.html
├── src                      # Source files 
│    ├── components   # Component files per page
│    ├── hooks            # Custom hooks
│    ├── css                # CSS files
│    ├── scss               # SCSS files
│    ├── App.js
│    └── index.js
└── README.md
```
### [Components & Hooks]
```
src
├── hooks
│    └── useScreenSize.js
└── components       
     ├── common
     │    ├── Footer.js
     │    ├── Header.js
     │    ├── Loading.js
     │    └── Tab.js
     ├── main
     │    ├── Intro.js
     │    ├── List.js
     │    ├── PostList.js
     │    ├── Prompt.js
     │    └── Visual.js
     └── sub 
          ├── About
          │    ├── index.js
          │    ├── Category.js
          │    └──  Dialogue.js
          ├── Blog
          │    ├── index.js
          │    ├── Btns.js
          │    ├── Category.js
          │    ├── Editor.js
          │    ├── Pagination.js
          │    ├── Post.js
          │    ├── PostEdit.js
          │    ├── PostList.js
          │    └── PostView.js
          ├── Contact
          │    ├── FormBox.js
          │    ├── index.js
          │    └── Success.js
          ├── Gallery
          │    ├── index.js
          │    ├── Category.js
          │    └── Popup.js
          └──  Playlist
                ├── index.js
                └── Popup.js
```
### [CSS & SCSS]
```
src
├── css
│    ├── style.css
│    └── style.css.map
└── scss
     ├── common
     │    ├── _layout.scss
     │    ├── _mixin.scss
     │    └── _reset.scss
     ├── main
     │    └── _visual.scss
     ├── sub
     │    ├── _about.scss
     │    ├── _blog.scss
     │    ├── _contact.scss
     │    ├── _gallery.scss
     │    ├── _playlist.scss
     │    └── _post.scss
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