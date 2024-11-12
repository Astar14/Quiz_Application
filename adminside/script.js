// Admin panel

let hamburger = document.querySelector(".hamburger");
let sidebar = document.querySelector(".sidebar");
let mainContent = document.querySelector(".main-content");
let bool = 0;
function sidebarToggle() {
  if (bool == 0) {
    sidebar.style.left = "-300px";
    sidebar.style.width = "0px";
    mainContent.style.width = "100%";
    bool = 1;
  } else {
    sidebar.style.left = "0px";
    sidebar.style.width = "18%";
    mainContent.style.width = "100%";
    bool = 0;
  }
}

let logoutContainer = document.getElementById("logout-container");
let flag = 0;
function popUpLogout() {
  if (flag == 0) {
    logoutContainer.style.display = "block";
    flag = 1;
  } else {
    logoutContainer.style.display = "none";
    flag = 0;
  }
}

let addQuestionButton = document.getElementById("add-new-question");
let flags = 0;
function popUp() {
  if (flag == 0) {
    addQuestionButton.style.display = "block";
    flag = 1;
  } else {
    addQuestionButton.style.display = "none";
    flag = 0;
  }
}

function popUpQuestion() {
  let flagValue = 0;
  let questionDetails = document.querySelector(".question-details");
  const overlay = document.getElementById("overlay");
  if (flagValue == 0) {
    questionDetails.style.display = "block";
    overlay.style.display = "block";
    flagValue = 1;
  } else {
    questionDetails.style.display = "none";
    flagValue = 0;
  }
}
function closePopUp() {
  let questionDetails = document.querySelector(".question-details");
  const overlay = document.getElementById("overlay");
  questionDetails.style.display = "none";
  overlay.style.display = "none";
}
let quizData = JSON.parse(localStorage.getItem("quizDatas")) || [];

// Function to display quiz data
function displayQuizData() {
  quizData = JSON.parse(localStorage.getItem("quizDatas")) || [];
  let table = document.getElementById("question-table");
  table.innerHTML = "";

  quizData.forEach((quiz, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = index + 1;
    row.insertCell(1).innerText = quiz.question;
    const actionsCell = row.insertCell(2);
    actionsCell.append(
      createIcon("pen fa-solid fa-pencil", () => editQuestion(index)), //quiz.question
      createIcon("trashs fa-solid fa-trash-can", () => deleteQuestion(index)),
      createIcon("open-eye fa-regular fa-eye", () => viewQuestion(quiz))
    );
  });
}

// Function to create action icons
function createIcon(className, onClick) {
  const icon = document.createElement("i");
  icon.className = className;
  icon.onclick = onClick;
  return icon;
}


let currentEditIndex = null; 

// Function to handle both adding and editing questions
function handleQuestionAnswers(event) {
  event.preventDefault();

  let question = document.getElementById("question-input").value.trim();
  let optionA = document.getElementById("option-a").value.trim();
  let optionB = document.getElementById("option-b").value.trim();
  let optionC = document.getElementById("option-c").value.trim();
  let optionD = document.getElementById("option-d").value.trim();
  let correctAnswer = document.getElementById("correct-answer-input").value.trim();

    // Validate input fields to ensure none are empty
    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      alert("Please fill in all fields");
      return;
  }

  const questionData = {
    question: question,
    answers: [optionA, optionB, optionC, optionD],
    correct: parseInt(correctAnswer),
    choosedAnswer: null,
  };

  if (currentEditIndex === null) {
    // Add new question
    quizData.push(questionData);
  } else {
    // Update existing question
    quizData[currentEditIndex] = questionData;
    currentEditIndex = null; 
  }

  localStorage.setItem("quizDatas", JSON.stringify(quizData));
  displayQuizData();

  document.getElementById("question-input").value = "";
  document.getElementById("option-a").value = "";
  document.getElementById("option-b").value = "";
  document.getElementById("option-c").value = "";
  document.getElementById("option-d").value = "";
  document.getElementById("correct-answer-input").value = "";
  closePopUp();
}

function editQuestion(index) {
  // Set the question and options in input fields
  document.getElementById("question-input").value = quizData[index].question;
  document.getElementById("option-a").value = quizData[index].answers[0];
  document.getElementById("option-b").value = quizData[index].answers[1];
  document.getElementById("option-c").value = quizData[index].answers[2];
  document.getElementById("option-d").value = quizData[index].answers[3];
  document.getElementById("correct-answer-input").value = quizData[index].correct;
  currentEditIndex = index;
  popUp();
}


// Delete a question

function deleteQuestion(index) {
  let message = "Are you sure you want to delete.";
  confirm(message);
  quizData.splice(index, 1); // Remove from the array
  localStorage.setItem("quizDatas", JSON.stringify(quizData)); // Update localStorage
  displayQuizData(); // Update the UI
  alert("Question deleted");
}

function viewQuestion(question) {
  console.log(question);
  let optionsList = document.getElementById("optionsList");
  console.log((document.getElementById("view-question").innerText = question));
  document.getElementById("view-question").innerText = question.question;
  optionsList.innerHTML = "";
  question.answers.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsList.appendChild(li);
  });
  document.getElementById(
    "view-correct-answer"
  ).innerHTML = `Correct Answer: <strong>${question.correct}</strong>`;
  popUpQuestion();
}



// Users information code from here

function displayUsersData() {
  let userData = JSON.parse(localStorage.getItem("userData")) || []
console.log(userData)
  let usersInformation = document.querySelector(".table-two tbody")
  usersInformation.innerHTML = "";
  userData.forEach((userInfo,index) => {
    const row = usersInformation.insertRow();
    row.insertCell(0).innerText = index + 1;
     row.insertCell(1).innerText = userInfo.fullName;
     row.insertCell(2).innerText = userInfo.email;
     let latestScore = Array.isArray(userInfo.score) && userInfo.score.length > 0
     ? userInfo.score[userInfo.score.length - 1]
     : 0;
     row.insertCell(3).innerText = latestScore;
    row.insertCell(4).innerText = userInfo.playCount;
    row.insertCell(5).innerHTML = '<a href="#">View more</a>'; 
  })
}
displayUsersData()