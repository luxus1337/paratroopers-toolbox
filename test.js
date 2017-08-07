function hasUppercase(input){
	for (var i = 0; i < input.lenght; i++){
		if (input[i] === input[i].toUppercase()){
			return true;
			}
	}
}

function isPasswordValid(input){
  if (hasUppercase(input)) {
		console.log("This password is valid");
	}

}

isPasswordValid("LuigivanDerPal");