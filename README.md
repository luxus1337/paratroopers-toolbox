# paratroopers-toolbox
Hello Paratrooper!

If you are just starting out with no javascript, html or css experience. I would recommend to follow the Javascript, HTML and CSS courses on "The code Academy" (https://www.codecademy.com/). After these courses you can continue from here.

First you will need to install the following programs:
* A terminal (on windows I would recommend cmder, http://cmder.net/)
* VS Code (https://code.visualstudio.com/)
* A browser:
  * Firefox (https://www.mozilla.org/en-US/firefox/new/)
  * Chrome (https://www.google.com/chrome/index.html)
* Node (https://nodejs.org/en/)

You will also need a working github key to propperly clone the repository, read more about it:
* Generating a key (https://help.github.com/enterprise/2.10/user/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
* Adding the key to github (https://github.com/settings/keys)

Now lets create our first projetct please check out this repostiory by running the following command in CMDer (or your terminal of choice) in a folder where you want your paratroopers' projects to be (in the example I used ~/_paratroopers/):

> __Protip__: "~" stands for your home directory (i.e. "C:\Users\Luxus")


To create a folder in the terminal you can use "mkdir"
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
If all is well you now should have the entire project open in VS Code.

You can start of with a cool pong assignment:
* https://github.com/luxus1337/paratroopers-toolbox/tree/master/pong-js-no-libs
