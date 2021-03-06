## π Contents
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
## πββοΈ Description
- **Project Name** C-log
- **URL** [https://icallitnewart.github.io/c-log/](https://icallitnewart.github.io/c-log/)
- **Concept** μ½λ© λΈλ‘κ·Έ μ»¨μμ κ°μΈ ννμ΄μ§
- **Aims** 
  <br/>π λ‘μ»¬ μ€ν λ¦¬μ§λ₯Ό μ΄μ©ν CRUD κ΅¬ν
  <br/>π emailJS, flickr API, youtube API λ± λ€μν μΈλΆ API νμ© 
  <br/>π λ°μν μΉ μ§μ

## π» Tech Stacks
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

## π§ Getting Started
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

## β¨ Features
### [Home]
#### β νμ΄ν μ λλ©μ΄μ ν¨κ³Ό
![Home_Prompt](https://user-images.githubusercontent.com/65598117/168319481-4a69e9fd-a62e-4340-9ea7-d0152f02621b.gif)
  - ν΄λλ₯Ό ν΄λ¦­νλ©΄ JSON λ°μ΄ν° νΈμΆ
  - setInterval λ©μλλ₯Ό νμ©νμ¬ νΈμΆν λ°μ΄ν°λ₯Ό ν κΈμμ© μν μλ°μ΄νΈν¨μΌλ‘μ¨ νμ΄ν μ΄ννΈ μ μ©
  - π **α΄α΄ΙͺΙ΄** [Prompt.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/Prompt.js) 
#### β μ΅μ κΈ, μΈκΈ°κΈ λͺ©λ‘ λ³΄κΈ°
![Home_PostList](https://user-images.githubusercontent.com/65598117/168319498-311cca77-ce22-4200-8f10-52e108f4e6ad.png)
  - λ‘μ»¬μ€ν λ¦¬μ§μ μ μ₯λ λ°μ΄ν° λΆλ¬μ€κΈ° (μ μ₯λ λ°μ΄ν°κ° μμ κ²½μ°μ μλ‘­κ² λ°μ΄ν° νΈμΆ ν λ‘μ»¬μ€ν λ¦¬μ§μ μ μ₯)
  - κ°μ₯ μ’μμκ° λ§μ μμΌλ‘ κΈ λͺ©λ‘ μ λ ¬
  - μ΅μ μμΌλ‘ κΈ λͺ©λ‘ μ λ ¬
  - π **α΄α΄ΙͺΙ΄** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/PostList.js) &nbsp;**sα΄Κ** [List.js](https://github.com/icallitnewart/c-log/blob/master/src/components/main/List.js)

### [About]
#### β ν­λ©λ΄ κ΅¬ν λ° λ§νμ  μ λλ©μ΄μ ν¨κ³Ό 
![About](https://user-images.githubusercontent.com/65598117/168319514-a802e9bd-27d2-45ce-bde6-ce15b73eb556.gif)
  - ν­λ©λ΄ ν΄λ¦­μ κ° μΉμμ λν μκ°λ§ λ³΄μ¬μ£ΌκΈ° (JSON λ°μ΄ν° νΈμΆ)
  - μκ°λ§μ λνμ°½ νμμΌλ‘ κ΅¬μ±νμ¬ λ§νμ  μ λλ©μ΄μ μ΄ννΈ μ μ©
  - π **α΄α΄ΙͺΙ΄** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/index.js) &nbsp;**sα΄Κ** [Category.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/Category.js) [Dialogue.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/About/Dialogue.js)

### [Blog]
#### β λ‘μ»¬μ€ν λ¦¬μ§λ₯Ό μ΄μ©νμ¬ CRUD κ΅¬ν
![Blog_CRUD1](https://user-images.githubusercontent.com/65598117/168377504-5a84598d-ff0f-4d7c-8b7d-bf1ef5d2f814.gif)
![Blog_CRUD2](https://user-images.githubusercontent.com/65598117/168377535-f5e7aabc-ffd1-4388-b55c-d935cb508aa3.gif)
  - μ²« λ‘λμ μ μ₯λ ν¬μ€νΈ λ°μ΄ν°(JSON)λ₯Ό νΈμΆνμ¬ λ‘μ»¬μ€ν λ¦¬μ§μ μ μ₯ 
  - μ½κΈ°, μ°κΈ°, μ­μ , μμ  μ§μ
  - μΉμλν°(CKEditor5) μ μ©
  - κΈ μμ±μ μΉ΄νκ³ λ¦¬ μ ν κΈ°λ₯
  - π **α΄α΄ΙͺΙ΄** [Post.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Post.js) [PostEdit.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostEdit.js) [PostView.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostView.js) [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js)
#### β μ’μμ λ²νΌ κΈ°λ₯
![Blog_Like](https://user-images.githubusercontent.com/65598117/168377566-3318046c-50c1-4e57-8708-15f31cbbc5bc.gif)
  - ννΈ λ²νΌ νλ² ν΄λ¦­μ μ’μμ, λλ² ν΄λ¦­μ μ’μμ μ·¨μ
  - π **α΄α΄ΙͺΙ΄** [PostView.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostView.js)
#### β νμ΄μ§λ€μ΄μ κΈ°λ₯
![Blog_Pagination](https://user-images.githubusercontent.com/65598117/168377598-7b2b1bc7-f494-42e3-856c-2a182beca18b.gif)
  - **λ°μν λ μ΄μμ** μ§μ: λͺ¨λ°μΌ, νλΈλ¦Ώ μ¬μ΄μ¦μΈ κ²½μ° νμ΄μ§ λ²νΈ 5κ°κΉμ§, κ·Έ μΈμ 10κ°κΉμ§ λ³΄μ¬μ£ΌκΈ°
  - π **α΄α΄ΙͺΙ΄** [Pagination.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Pagination.js) &nbsp;**Κα΄α΄α΄s** [useScreenSize.js](https://github.com/icallitnewart/c-log/blob/master/src/hooks/useScreenSize.js)
#### β μΉ΄νκ³ λ¦¬ λ²νΌ ν΄λ¦­μ μΉ΄νκ³ λ¦¬λ³λ‘ κ²μκΈ λΆλ₯ κΈ°λ₯
![Blog_Category](https://user-images.githubusercontent.com/65598117/168377636-f5915a17-ad43-4b95-8cdd-0e9b3cafd8ed.gif)
  - HTML, CSS, JS, React μ΄ 4κ°μ μΉ΄νκ³ λ¦¬ μ€ μ ν κ°λ₯
  - π **α΄α΄ΙͺΙ΄** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js) [Btns.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Btns.js)
#### β κΈ λͺ©λ‘ λ³΄κΈ° μ ν μ ν
![Blog_Viewtype](https://user-images.githubusercontent.com/65598117/168377671-579e55de-d0d9-4f08-8cdd-6696fbdb5ddf.gif)
  - κ·Έλ¦¬λλ·°, λ¦¬μ€νΈλ·° λ μ€ μ ν κ°λ₯  
  - (κ·Έλ¦¬λλ·°) κΈ λͺ©λ‘ **λ°μν λ μ΄μμ** μ μ©: μ€ν¬λ¦° μ¬μ΄μ¦μ λ°λΌ ν νμ΄μ§μ λ³΄μ¬μ§λ κΈ κ°μ λ³κ²½ 
  - π **α΄α΄ΙͺΙ΄** [PostList.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/PostList.js) &nbsp;**sα΄Κ** [Pagination.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Blog/Pagination.js) &nbsp;**Κα΄α΄α΄s** [useScreenSize.js](https://github.com/icallitnewart/c-log/blob/master/src/hooks/useScreenSize.js)

### [Gallery]
#### β Flickr APIλ₯Ό νμ©ν κ°€λ¬λ¦¬
![Gallery](https://user-images.githubusercontent.com/65598117/168319528-b66a638f-218d-485a-afce-a1c8d499d5cf.gif)
  - μΈλ€μΌ ν΄λ¦­μ ν΄λΉ μ΄λ―Έμ§ Modal νμμΌλ‘ λμ°κΈ°
  - μΉ΄νκ³ λ¦¬ λ²νΌ ν΄λ¦­μ ν΄λΉ μ΄λ―Έμ§ λ¦¬μ€νΈ λ°μ΄ν° λΆλ¬μ€κΈ°
  - Masonry μ μ©: μ€ν¬λ¦° μ¬μ΄μ¦ λ³κ²½μ μ­λμ μΈ λ μ΄μμ μ λ ¬ ν¨κ³Ό
  - π **α΄α΄ΙͺΙ΄** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/index.js) &nbsp;**sα΄Κ** [Popup.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/Popup.js) [Category.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Gallery/Category.js)

### [Playlist]
#### β Youtube APIλ₯Ό νμ©ν νλ μ΄λ¦¬μ€νΈ
![Playlist](https://user-images.githubusercontent.com/65598117/168319587-cbf35d59-4fad-42a6-8ce9-a514e3561eef.gif)
  - μΈλ€μΌ ν΄λ¦­μ ν΄λΉ μμ Modal νμμΌλ‘ λμ°κΈ°
  - νμμ°½μμ μ¬μ/μ€μ§ λ²νΌμΌλ‘ μ νλΈ μμ μ μ΄ κ°λ₯
  - Masonry μ μ©: μ€ν¬λ¦° μ¬μ΄μ¦ λ³κ²½μ μ­λμ μΈ λ μ΄μμ μ λ ¬ ν¨κ³Ό
  - π **α΄α΄ΙͺΙ΄** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Playlist/index.js) &nbsp;**sα΄Κ** [Popup.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Playlist/Popup.js)

### [Contact]
#### β νΌμ ν¨μ± κ²μ¬
![Contact](https://user-images.githubusercontent.com/65598117/168319599-89e730f8-7a86-4d40-b191-e422167d00a9.gif)
  - π **α΄α΄ΙͺΙ΄** [FormBox.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/FormBox.js) &nbsp;**sα΄Κ** [Success.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/Success.js)
#### β emailJSλ₯Ό νμ©νμ¬ μ΄λ©μΌ μ μ‘
  - π **α΄α΄ΙͺΙ΄** [index.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/index.js) [FormBox.js](https://github.com/icallitnewart/c-log/blob/master/src/components/sub/Contact/FormBox.js)

## π Structure
### [Overview]
```
src
βββ public                  # HTML, DB, image files
β    βββ db                 # DB(JSON) files
β    βββ img               # Image files
β    βββ favicon.ico
β    βββ index.html
βββ src                      # Source files 
β    βββ components   # Component files per page
β    βββ hooks            # Custom hooks
β    βββ css                # CSS files
β    βββ scss               # SCSS files
β    βββ App.js
β    βββ index.js
βββ README.md
```
### [Components & Hooks]
```
src
βββ hooks
β    βββ useScreenSize.js
βββ components       
     βββ common
     β    βββ Footer.js
     β    βββ Header.js
     β    βββ Loading.js
     β    βββ Tab.js
     βββ main
     β    βββ Intro.js
     β    βββ List.js
     β    βββ PostList.js
     β    βββ Prompt.js
     β    βββ Visual.js
     βββ sub 
          βββ About
          β    βββ index.js
          β    βββ Category.js
          β    βββ  Dialogue.js
          βββ Blog
          β    βββ index.js
          β    βββ Btns.js
          β    βββ Category.js
          β    βββ Editor.js
          β    βββ Pagination.js
          β    βββ Post.js
          β    βββ PostEdit.js
          β    βββ PostList.js
          β    βββ PostView.js
          βββ Contact
          β    βββ FormBox.js
          β    βββ index.js
          β    βββ Success.js
          βββ Gallery
          β    βββ index.js
          β    βββ Category.js
          β    βββ Popup.js
          βββ  Playlist
                βββ index.js
                βββ Popup.js
```
### [CSS & SCSS]
```
src
βββ css
β    βββ style.css
β    βββ style.css.map
βββ scss
     βββ common
     β    βββ _layout.scss
     β    βββ _mixin.scss
     β    βββ _reset.scss
     βββ main
     β    βββ _visual.scss
     βββ sub
     β    βββ _about.scss
     β    βββ _blog.scss
     β    βββ _contact.scss
     β    βββ _gallery.scss
     β    βββ _playlist.scss
     β    βββ _post.scss
     βββ style.scss
```

## π’ Commit Messages
|TAG|DESCRIPTION|
|:---:|:---:|
|Feat|μλ‘μ΄ κΈ°λ₯ μΆκ°|
|Fix|λ²κ·Έ μμ |
|Design|μ¬μ©μ UI λμμΈ λ³κ²½|
|Style|μ½λ ν¬λ§· λ³κ²½ (μ½λ μμ  X)|
|Refactor|μ½λ λ¦¬ν©ν λ§|
|Comment|μ£Όμ μΆκ° λ° λ³κ²½|
|Docs|λ¬Έμ μμ |
|Chore|κΈ°ν λ³κ²½μ¬ν­ (ν¨ν€μ§ μλ°μ΄νΈ λ±)|
|Rename|νμΌ λ° ν΄λλͺ μμ  λλ μ΄λ|
|Remove|νμΌ μ­μ |