# PONG-JS-NO-LIBS

You can see the game running in action if you open the index.html file in your browser of choice.

Get yourself familiar with the code in game.js to see what the game code currently has. There are "@TODO's" marked in the code. These should be solved to get a fully functioning pong. However this project should stay clean of your changes until your work is completed, but you do want to save your changes in the repository!

That's why branches where invented (read more about them here: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell). To create your own branch use the following command:
```
git checkout -b feature/ResolvingToDosBy{PersonalTagHere}
```
After doing some changes and saving those files. You want to commit this changes to the git history (in your current branch). To see the currenst status use the following command:
```
git status
```
Here you see files marked as modified if you want to add these do so by issueing the following command:
```
# to add only the game.js file
git add game.js
# to add all changes files
git add .
```
If you wanted to reset the changes you made in files:
```
# to reset a tracked file (in this case game.js)
git checkout game.js
# to reset tracked all files alternatively
git reset --hard HEAD
# to also clean up newly created files
git clean -fd
```
You can check which files you added using:
```
git status
```
If you think all your changes are added write a commit message like so:
```
git commit -m "implement player 2 movement"
```
Now it's time to push your code to the server using:
```
git push
```
You'll probably receive the following warning:
```
fatal: The current branch feature/ResolvingToDosBy{PersonalTagHere} has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature/ResolvingToDosBy{PersonalTagHere}

```
Execute the suggestion:
```
git push --set-upstream origin feature/ResolvingToDosBy{PersonalTagHere}
```

Now you pushed your first change the server :). Try to finish the pong game, if you have any questions pm luxus on the paratroopers slack or face to face.
