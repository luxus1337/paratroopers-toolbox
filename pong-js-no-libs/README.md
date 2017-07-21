# PONG-JS-NO-LIBS

You can see the game running in action if you open the index.html file in your browser of choice.

Get yourself formilliar with the code in game.js to see what the game code currently has. There are "@TODO's" marked in the code. These should be solved to get a fully functioning pong. However this project should stay clean of your changes, but you do want to save your changes in the repository!

That's why branches where invented (read more about them here: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell). To create your own branch (your own private space to work in) use the following command:
```
git checkout -b thinkOfACleverNameForYourPersonalPongProject
```
After doing some changes add these by issueing the following command:
```
# to add only the game.js file
git add game.js
# to add all files alternatively
git add .
```
You can check which files you added using:
```
git status
```
If you think all your changes are added write a commit message like so:
```
git commit -m "Player 2 movement is now working"
```
Now it's time to push your code to the server using:
```
git push
```
You'll probably receive the following warning:
```
fatal: The current branch luxiPong has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin thinkOfACleverNameForYourPersonalPongProject

```
Execute the suggestion:
```
git push --set-upstream origin thinkOfACleverNameForYourPersonalPongProject
```

Now you pushed your first change the server :). Try to finish the pong game, if you have any question pm luxus on the paratroopers slack.
