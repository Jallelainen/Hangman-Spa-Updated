/* Function to insert a corectly guessed letter in the correct place of the hidden word */ 
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr.toUpperCase() + str.substring(index+1);
}

export default setCharAt;