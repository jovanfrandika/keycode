# Keycodes

![logo](https://raw.githubusercontent.com/uriella/keycode/with-chakra-ui/src/assets/images/keycode_with_background.png)


**Keycodes** is an application that was made to help programmers **boost their typing speed** by actually **typing real codes** instead of random examples. By using real codes from **public code repositories** that you can search in Github, you can learn to touch type in coding better where there are tons of rarely typed symbols.

LINK: https://keycode.frandika.com/

### Technologies & Stacks
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [Github API](https://developer.github.com/v3/)

### Inspiration
Steven and Jovan tried to practice touch typing to improve their typing speed but it didn't end up well because in most programming languages have their own unique syntax with symbols in the keyboard that you probably won't ever use when typing normal sentences. That's why Steven and Jovan wanted a way for programmers & everyone to practice touch typing relative to the context of coding.

### What it does
Helping programmers to learn touch typing in the context of writing code, most touch-typing apps just provide random examples with no context. With Keycodes you can actually choose a real example also with the preferred programming language, and so on.

### How I built it
The web app was mostly built in the frontend-part for this hackathon, we built this with **React.js & TypeScript** because it's the most popular frontend framework that is ready for productiion, we also deployed it to **Netlify**. To fetch the repositories from Github we need to fetch the public **Github Api** using our auxiliary backend API with **Flask** that is deployed on Heroku.

### Challenges I ran into
- Complex react concepts such as React.memo to avoid unnecessary re-rendering
- Reading the API documentation for Github

### What's next for Keycodes
- Implementing users model in the backend
- Implementing typeracing with other people online
- Implementing statistics of learning progress
- Implementing bookmarks of favorite repositories

### Contributors
- [Jovan Frandika](https://github.com/uriella)
- [Steven Hansel](https://github.com/ShinteiMai)
