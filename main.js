const starBtn = document.getElementById('start_btn');
const resetBtn = document.getElementById(`restart_btn`);
const showAnswerBtn = document.getElementById(`show_answer_btn`);
const guessInput = document.getElementById(`guess_input`);
const guessBtn = document.getElementById(`guess_btn`);
let guessList = document.getElementById(`list`);
const endModel = new bootstrap.Modal(document.getElementById('exampleModal'));
const endGameBtn = document.getElementById('endGame');
const toastHead = document.getElementById('myToast');
const toastMsg = document.getElementById('toastBody')
const toast = new bootstrap.Toast(toastHead, {
    delay: 3000
    })

let answer = [];

function startGame() {
    starBtn.disabled = true;
    resetBtn.disabled = false;
    showAnswerBtn.disabled = false;
    guessInput.disabled = false;
    guessBtn.disabled = false;
};

function resetGame() {
    starBtn.disabled = false;
    resetBtn.disabled = true;
    showAnswerBtn.disabled = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    guessList.innerHTML = ''
};

function getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 最大值和最小值都包含
};

function getRandomAnswer() {
    while(answer.length < 4)
    {      
        let num = getRandomNumber(0,9);  
        if(!answer.includes(num)){
            answer.push(num);}
    };

};

function guessResult() {
    const valueArr = guessInput.value.trim().toString().split('');
    const value = valueArr.map(Number);
    let a = 0;
    let b = 0;

    if(value == '' || isNaN(guessInput.value)){
        guessInput.value = '';
        showToast("請輸入正確數字");
        return //加上return後執行到這一行會中斷函式，就不會執行到historyList()
    }

    if(value.length > 4){
        guessInput.value = '';
        showToast("請輸入正確數字");
        return
    }

    for(let i = 0; i < value.length; i++){
        if(value[i] === answer[i]){
            a++;
        }else if(answer.includes(value[i])){
            b++;
        };
    };

    historyList(a,b,value);

    if(a === 4){
        resetGame();
        endModel.show();
    }
    guessInput.value = "";
}
function historyList(a,b,value) {
    const li = `<li class="list-group-item"><span class="badge text-bg-warning rounded-pill" > ${a}A${b}B</span> ${guessInput.value}</li>`
    guessList.innerHTML += li
}

function showToast(msg){
    toastMsg.textContent = msg;
    toast.show();
}

starBtn.addEventListener('click',function(){
    startGame();
    getRandomAnswer();
})

guessBtn.addEventListener('click',function(){
    guessResult();
})

showAnswerBtn.addEventListener('click',()=>{
    showToast(answer.join(""));
})

resetBtn.addEventListener('click',function(){
    showToast("你真的要放棄嗎，你這個爛貨！");
    answer = [];
    getRandomAnswer();
    resetGame();
})

endGameBtn.addEventListener('click',function(){
    answer = [];
    getRandomAnswer();
})
