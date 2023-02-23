//getting all elements:

const start_btn = document.querySelector(".start_button")
const info_box = document.querySelector(".container")
const continue_btn = document.querySelector(".btn_continue")
const exitquiz_btn = document.querySelector(".btn_exitquiz")
const quiz = document.querySelector(".quiz")
const opt_list = document.querySelector(".list") 
const time = quiz.querySelector(".time .time-left")
const timeLine = quiz.querySelector(".top .time_line")

//if the start quiz button is clicked:
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show the container
}

//if the exit quiz button is clicked:
exitquiz_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the container
}

//if the continue quiz button is clicked:
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the container
    quiz.classList.add("activeQuiz"); //add the quiz
    showQuestions(0)
    counterT(1)
    startTime(15)
    startTimeLine(0)
}

let que_count = 0
let timeCount; //counter
let timeValue = 15; //\
let widthValue = 0;
let userScore = 0;
let counterLine;

const next_btn = quiz.querySelector(".button")
const resultbox = document.querySelector(".results")
const restartbtn = resultbox.querySelector(".buttons .btn_restart")
const quitbtn = resultbox.querySelector(".buttons .btn_quit")
restartbtn.onclick = ()=>{
    window.location.reload();

    resultbox.classList.remove("activeResult")
    quiz.classList.add("activeQuiz")
    let que_count = 0
    let timeValue = 15; 
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count)
    counterT(que_count+1) 
    clearInterval(timeCount)
    startTime(timeValue)
    clearInterval(counterLine)
    startTimeLine(widthValue)
    next_btn.style.display = "none";
    

}
quitbtn.onclick = ()=>{
    window.location.reload();

}

//if next button is clicked
next_btn.onclick = ()=>{
    
    if(que_count < questions.length-1){
        que_count++
        showQuestions(que_count)
        counterT(que_count+1) 
        clearInterval(timeCount)
        startTime(timeValue)
        clearInterval(counterLine)
        startTimeLine(widthValue)
        next_btn.style.display = "none";

    }
    else{
        console.log("Test completed!")
        showResultBox();
    }
    
}
//getting questions and options from array

function showQuestions(i){
    const question_show= document.querySelector(".question")
    let que = '<span>'+ +questions[i].nr+"."+questions[i].question+'</span>'
    question_show.innerHTML = que

    let ans = '<div class = "answer">' + questions[i].options[0]+'<span></span></div>' + '<div class = "answer">'+questions[i].options[1]+'<span></span></div>'+
    '<div class = "answer">'+questions[i].options[2]+'<span></span></div>' + '<div class = "answer">'+questions[i].options[3]+'<span></span></div>'
    opt_list.innerHTML = ans
    
    const opt = document.querySelectorAll(".answer")
    for ( let i = 0; i < opt.length; i++){
        opt[i].setAttribute("onclick", "optionSel(this)")
    }

}

function optionSel(ansr){
    clearInterval(timeCount)
    clearInterval(counterLine);

    //startTime(timeValue)
    let userAns = ansr.textContent;
    let correctansr = questions[que_count].answer
    let allOpt = opt_list.children.length
    console.log(userAns)
    if(userAns == correctansr){
        userScore +=1;
        console.log(userScore);
        ansr.classList.add("correct")
        console.log("Correct")}
    else{
        ansr.classList.add("wrong")
        console.log("Wrong")
    }
    for ( let i = 0; i < allOpt; i++){
        opt_list.children[i].classList.add("disabled")
    }
    next_btn.style.display = "block";
}

function counterT(i){
    const bottom_counter = quiz.querySelector(".bottom")
    let totalQues = '<span><p>'+i+'</p><p>Of</p><p>'+questions.length+'</p><p>Questions</p></span>'
    bottom_counter.innerHTML = totalQues
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); 
    quiz.classList.remove("activeQuiz"); 
    resultbox.classList.add("activeResult"); //show the result box
    const scoreText = resultbox.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag ='<span><p>and congrats, You got  got </p>  <p>'+userScore+'</p>  <p> out of </p>  <p>5</p><p> points </p> </span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag ='<span><p>and nice, You got  got </p>  <p>'+userScore+'</p>  <p> out of </p>  <p>5</p><p> points </p> </span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag ='<span><p>and sorry, You got only got </p>  <p>'+userScore+'</p>  <p> out of </p>  <p>5</p><p> points </p> </span>'
        scoreText.innerHTML = scoreTag;
    }

}
function startTime(t){
    timeCount = setInterval(timer,1000);
    function timer(){
        time.textContent = t
        t--
        if(t < 9){
            let addZero = time.textContent;
            time.textContent = "0"+addZero;
        }
        if(t < 0){
            clearInterval(timeCount);
            time.textContent="00";
        }
    }
   
}
function startTimeLine(t){
    counterLine = setInterval(timer,29);
    function timer(){
        t+=1;
        timeLine.style.width =t+"px"
        if(t > 549){
            clearInterval(counterLine);

        }
    }
   
}



