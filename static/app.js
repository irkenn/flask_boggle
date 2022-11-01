
const form = document.querySelector("#boggle-form");
const textInput = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const board = document.querySelector("#table-board");
const scoreBoard = document.querySelector("#score-board");
const popMessage = document.querySelector("#pop-message");
const highestScoreBoard = document.querySelector("#highest-score");
let timesPlayed = document.querySelector("#times-played");


    function start(){
        highestScoreBoard.innerHTML = localStorage.getItem("highest-score") || 0;
        timesPlayed.innerHTML = localStorage.getItem("amount-of-games") || 0;
    }


    async function postWord(keywordFunction, dictValue) {
        dictValue = dictValue.toUpperCase()
        let response = await axios.post('/', { keyword : keywordFunction, argument: dictValue});
        responseHandler(response.data);
    };

    function responseHandler(responseData){
        if (responseData.result === "ok"){
            let previousScore = scoreBoard.innerHTML;
            scoreBoard.innerHTML = responseData.wordPoints + parseInt(previousScore);
            createPopMessage(`That's a valid word. You have scored ${responseData.wordPoints} points!`);   
        }
        else if (responseData.result === "not-word"){
            createPopMessage(`Sorry that is not valid word`);   
        }
        else if (responseData.result === "not-on-board"){
            createPopMessage(`We cannot find that word on the board`);   
        }
        else if (responseData.result === "already-guessed"){
            createPopMessage(`You already guessed this word`);
        }
    }

    //this will add a temporal message to the user to notify the result from the API 
    //it also sets a determined amount of time for the message
    function createPopMessage(message){
        const messageDiv = document.createElement("div");
        messageDiv.innerText = message;
        popMessage.append(messageDiv);
        let time = 1
        let timerId = setInterval(function(){
            time --;
            if (time <= 0){
                messageDiv.remove();
                clearInterval(timerId);
            }
            else{
                time --;
            }
        }, 1000)
    }

    //this will keep track of the time and block the submit button after the game is over
    async function timer(){
        let seconds = 60;
        let minutes = "00";
        let timerId = setInterval(function(){
            seconds --;
            if (seconds === -1){
                clearInterval(timerId);
                submitButton.setAttribute("disabled", true);
                startButton.innerText = "Clear board"
                checkHighestScore();
                createPopMessage("Time's up!");
            }
            else if (seconds < 10){
            document.getElementById("timer").innerHTML =  minutes + ":" + "0" + seconds;
            }
            else{
            document.getElementById("timer").innerHTML =  minutes + ":" + seconds;
            }
            
        }, 1000)
        }

    function checkHighestScore(){
        if (parseInt(scoreBoard.innerHTML) > parseInt(highestScoreBoard.innerHTML)){
            highestScoreBoard.innerHTML = scoreBoard.innerHTML;
            localStorage.setItem("highest-score", highestScoreBoard.innerHTML);
            createPopMessage("New high score saved!");
        } 
    }

    function updateTimesPlayed(){
        output = parseInt(localStorage.getItem("amount-of-games")) + 1;   
        localStorage.setItem("amount-of-games", output);
        timesPlayed.innerHTML = localStorage.getItem("amount-of-games");
    }

    form.addEventListener("submit", async function(e){
        e.preventDefault();
        
        if (e.submitter.id === "submit-button" && textInput.value != ""){
            postWord("check-word", textInput.value);
            textInput.value = "";      
            } 
    });



    startButton.addEventListener("click", async function(e){
        if (e.target.id === "start-button"){
            form.style.visibility = "visible";
            board.style.visibility = "visible";
            startButton.innerText = "Stop current game"
            startButton.setAttribute("id", "restart-button");
            timer();
            updateTimesPlayed(); 
        }
        else if (e.target.id === "restart-button"){
            await postWord("start-game", "None");
            location.reload();
            return false;
        }


    });

    start();





