import axios from 'axios';

class GameService {
    /* API get request that fetches the word, then assigns word, hint and hidden word to hooks */
    async getEasyWord(setWord, setHiddenWord, setHint){
        var config = { 
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };

        return await axios
            .get("https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/word?number=1", config)
            .then((response) => {
                console.log(response);
                setHiddenWord("_".repeat(response.data[0].length));
                setWord(response.data[0].toUpperCase());
                setHint("C'mon, you picked easy and now you want a hint? really?");
            })
            .catch((error) => {console.log(error)});
    }
    
    async getHardWord(setWord, setHiddenWord, setHint){
        return await axios
            .get("https://random-words-api.vercel.app/word")
            .then((response) => {
                setHiddenWord("_".repeat(response.data[0].word.length));
                setWord(response.data[0].word.toUpperCase());
                setHint(response.data[0].definition);
            })
            .catch((error) => {console.log(error)});
    }
}

export default new GameService();