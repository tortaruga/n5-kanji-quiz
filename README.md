- [overview](#overview)
- [a few notes](#a-few-notes)
- [on design](#on-design)
- [auto evaluation](#auto-evaluation)
- [things i learned](#things-i-learned)

# overview 👋

This is a very simple quiz built with vanilla js.
I did it as an exercise and the main goal was to update a [previous exercise made on codepen](https://codepen.io/tortaruga/pen/jORmLdm) and make the code cleaner and more DRY.

Sorry if all the comments are annoying, they're mainly there for me, as I know I will forget everything and need someone to explain it all over again step by step. 😅

# a few notes

The point of the exercise wasn't really the kanji, i just needed a topic for the quiz and it ended up being this because i was studying kanji at the time this project was first conceived.

As a result it's a very casual quiz, and I wouldn't rely on it too heavily if you're really preparing for an exam lol.

Also, as there is no official list of kanji of level n5, different lists online include different kanji and in variable number. My list was taken from [here](https://jlptstudy.net/N5/?kanji-list).

The option to get tested on 10 random kanji instead of all of them was mainly for me, because I needed a quick way of testing if the scoring worked, and there was no way I would sit there through 103 questions everytime 😂

Anyway, it's very basic kanji (n5 is the lowest, most beginner level of Japanese) and even if you've never studied them you probably can learn a few just by playing with the 10 random option and guessing and trying to remember what you got wrong. So if you for some reason end up here on my silly little coding exercise, feel free to play around, and enjoy! 💖

(The rest of the readme is mainly for me, you can ignore it 💕)

# on design 🌸

Design is not my strongest suit (what is your strongest suit exactly because it clearly ain't coding either) 😫

I tried to make it as simple as possible and to make it inspired in cherry blossoms because I am oh so original.

It ended up looking ugly (no surprise) but still a little less ugly than the first version.

I tried to get the buttons to have the same width for all the questions, but it resizes based on the length of the longest option. I struggled with it a bit, and then finally gave up. Future me, when you get back here, if you got any better (but I doubt it) please fix it.

# auto evaluation 📖

I think the html is good enough: it uses semantic tags when possible, it is readable, and uses classes to avoid highly specific selectors in css.

The styling uses basic CSS. I thought about using sass, but it's a very small project and regular CSS works fine. I think I could do a better job maybe reusing classes, because the amount of elements I gave flex column center aligned is honestly no joke.

It looks decent on all screen sizes (as decent as that ugly design can look) and it doesn't require media queries for it, so I think I did a good job.

It's accessible and can be played using a keyboard alone.

Compared to the original version, the JS is much more DRY. I did end up with a thousand different functions, but at least each function takes care of a small part of the code, and can be reused. In the first version everything happened in ONE single function 😅. Oops.

This version uses modules to keep all the constants separate according to a criterion, which I think is good, but I think I should separate the functions in different modules as well, because it still looks a little messy.

I also want to try and see if these function are reusable for a different quiz, maybe adding different kanji levels or different kind of quizzes altogether (like trivia about Japan or the language). If that can be achieved it means the code was truly DRY, and my functions were effective. I'm probably dreaming though. Next thing you know I'll be working for NASA 🚀

# things I learned 🥳

🌸 So, was nobody going to tell me justify-self does NOT work for flexbox? All this time I've lived a lie. It's only for grids. On flex containers you can only use align-self.

So what if you want to center the element on the horizontal axis? You can use margin: auto.
Good ✔️
So what if you want to center it on the vertical axis and you're inside a flex container with a direction of column?
You change your mind.
The score container looks just fine on top of the page anyway.

🌸 To use modules you need to add "type": "module" to package.json.
What the hell is package.json and where do I get it? Type into terminal npm init -y

Magic. ✨

You also need to add type="module" to your script tag in the html file. Oh to have known this before wasting 2 hours.

🌸 How to initialize, commit and push a repo from terminal:

Since my scatter-head keeps forgetting how to do this I'll write the steps one by one maybe one day i'll stop being an idiot 💜
- first of all dont just open loose files in vscode open a folder first. i don't remember why but it's important just trust me
- type git init in terminal to initialize an empty local repository
- empty means that you have to add the files to it with git add --all
- type git commit when you want to commit changes
- local means it's not on github yet but only on your pc so go create a new repo on github
- to push the commit you need to configure the destination first so type git remote add origin link-of-your-github-repo
- type git branch -M main
- type git push -u origin main
- yey! now when you want to push commits you'll just have to type git push
- we're done 🎉

  this readme almost took as long to write as the whole project. i'm disgusted with myself.
