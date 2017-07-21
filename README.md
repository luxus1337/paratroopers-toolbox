# paratroopers-toolbox
Hello Paratrooper!

First you will need to install the following programs:
* A terminal (on windows I would recommend cmder, http://cmder.net/)
* VS Code (https://code.visualstudio.com/)
* A browser Firefox (https://www.mozilla.org/en-US/firefox/new/), Chrome (https://www.google.com/chrome/index.html)
* Node (https://nodejs.org/en/)

You will also need a working github key to propperly clone the repository, read more about it:
* Generating a key (https://help.github.com/enterprise/2.10/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
* Adding the key to github (https://github.com/settings/keys)

Now lets create our first game please check out this repostiory by running the following command in CMDer (or your terminal of choice) in a folder where you want your paratroopers' projects to be (in the example this is ~/_paratroopers/):

> __Protip__: "~" stands for your home directory


To create a folder u can use "mkdir"
```
mkdir _paratroopers
```
Then go to the directory and clone the repository, start vs code with the project open.

```
cd ~/_paratroopers/
git clone git@github.com:luxus1337/paratroopers-toolbox.git
cd paratroopers-toolbox
code .
```
If all is well you now should have the project open in VS Code. 

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



