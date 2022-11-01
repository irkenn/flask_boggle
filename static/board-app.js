
const form = document.querySelector("#boggle-form");
const textInput = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");


async function postWord(keywordFunction, dictValue) {
    dictValue = dictValue.toUpperCase()
    const response = await axios.post('/', { keyword : keywordFunction, argument: dictValue});
    console.log("This is response1 :", response); //Take this out 
}

//this will eventually be implemented NOT YET
function countDown(time){
        let id = setInterval(function(){
            time --;
            if(time <= 0){
                clearInterval(id);
                console.log("DONE!"); //Que acción se va a implementar?
            }
            else{
                console.log(time);
            }
        }, 1000)
    }


form.addEventListener("submit", async function(e){
    e.preventDefault();
    
    if (e.submitter.id === "submit-button"){
        postWord("check-word", textInput.value);
        textInput.value = "";      
        } 
});

startButton.addEventListener("click", async function(e){
    if (e.target.id === "start-button"){
        postWord("start-game", "None");
        startButton.innerText = "Restart!"
        startButton.setAttribute("id", "restart-button");
        
        //add the clock in here
    }
    else if (e.target.id === "restart-button"){
        postWord("start-game", "None");
        location.reload();
        return false;
    }
});