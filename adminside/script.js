function adminLoginForm(event) {
  event.preventDefault();
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("All fields are mandatory");
    return;
  } else if (email === "admin14@gmail.com" && password === "Admin@1234") {
    alert("Successfully login");
    window.location.href = "adminDashboard.html";
  } else {
    alert("Invalid email or password");
  }
}

function eyeButtonToggle() {
  let eyeButton = document.getElementById("eye-icon");
  if (password.type == "password") {
    password.type = "text";
    eyeButton.classList.remove("fa-eye-slash");
    eyeButton.classList.add("fa-eye");
  } else {
    password.type = "password";
    eyeButton.classList.remove("fa-eye");
    eyeButton.classList.add("fa-eye-slash");
  }
}

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

let logoutFlag = 0;
function popUpLogout() {
  let logoutContainer = document.getElementById("logout-container");
  if (flag == 0) {
    logoutContainer.style.display = "block";
    flag = 1;
  } else {
    logoutContainer.style.display = "none";
    flag = 0;
  }
}
function logout() {
  let message = "Are you sure you want to logout";
  if (confirm(message) == true) {
    window.location.href = "adminLogin.html";
  }
}

let addQuestionFlag = 0;
function popUp() {
  let addQuestionButton = document.getElementById("add-new-question");
  const overlay = document.getElementById("overlay");
  if (addQuestionFlag == 0) {
    addQuestionButton.style.display = "block";
    overlay.style.display = "block";
    addQuestionFlag = 1;
  } else {
    addQuestionButton.style.display = "none";
    overlay.style.display = "none"; //added extra line
    addQuestionFlag = 0;
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
  let addQuestionButton = document.getElementById("add-new-question");
  let questionDetails = document.querySelector(".question-details");
  const overlay = document.getElementById("overlay");
  questionDetails.style.display = "none";
  addQuestionButton.style.display = "none";
  overlay.style.display = "none";
  document.getElementById("question-input").value = "";
  document.getElementById("option-a").value = "";
  document.getElementById("option-b").value = "";
  document.getElementById("option-c").value = "";
  document.getElementById("option-d").value = "";
  document.getElementById("correct-answer-input").value = "";
}

function closePopUp2() {
  let addQuestionButton = document.getElementById("add-new-question");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  addQuestionButton.style.display = "none";
  document.getElementById("question-input").value = "";
  document.getElementById("option-a").value = "";
  document.getElementById("option-b").value = "";
  document.getElementById("option-c").value = "";
  document.getElementById("option-d").value = "";
  document.getElementById("correct-answer-input").value = "";
}

let quizData = JSON.parse(localStorage.getItem("quizDatas")) || [];

// Function to display quiz data
function displayQuizData() {
  quizData = JSON.parse(localStorage.getItem("quizDatas")) || [];
  console.log(quizData);
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
  let correctAnswer = document
    .getElementById("correct-answer-input")
    .value.trim();

  // Validate input fields to ensure none are empty
  if (
    !question ||
    !optionA ||
    !optionB ||
    !optionC ||
    !optionD ||
    !correctAnswer
  ) {
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

  // document.getElementById("question-input").value = "";
  // document.getElementById("option-a").value = "";
  // document.getElementById("option-b").value = "";
  // document.getElementById("option-c").value = "";
  // document.getElementById("option-d").value = "";
  // document.getElementById("correct-answer-input").value = "";
  closePopUp();
}

function editQuestion(index) {
  // Set the question and options in input fields
  document.getElementById("question-input").value = quizData[index].question;
  document.getElementById("option-a").value = quizData[index].answers[0];
  document.getElementById("option-b").value = quizData[index].answers[1];
  document.getElementById("option-c").value = quizData[index].answers[2];
  document.getElementById("option-d").value = quizData[index].answers[3];
  document.getElementById("correct-answer-input").value =
    quizData[index].correct;
  currentEditIndex = index;
  popUp();
}

// Delete a question

function deleteQuestion(index) {
  let message = "Are you sure you want to delete.";
  if (confirm(message)) {
    quizData.splice(index, 1); // Remove from the array
    localStorage.setItem("quizDatas", JSON.stringify(quizData)); // Update localStorage
    displayQuizData(); // Update the UI
    alert("Question deleted");
  } else {
    console.log("Deletion canceled");
  }
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

document.addEventListener("DOMContentLoaded", () => {
  displayUsersData();
});

function displayUsersData() {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  console.log(userData);
  let usersInformation = document.querySelector(".table-two tbody");
  if (!usersInformation) {
    console.error("Table Two element not found");
    return;
  }
  usersInformation.innerHTML = "";
  userData.forEach((userInfo, index) => {
    const row = usersInformation.insertRow();
    row.insertCell(0).innerText = index + 1;
    row.insertCell(1).innerText = userInfo.fullName;
    row.insertCell(2).innerText = userInfo.email;
    let latestScore =
      Array.isArray(userInfo.score) && userInfo.score.length > 0
        ? userInfo.score[userInfo.score.length - 1]
        : 0;
    row.insertCell(3).innerText = latestScore;
    row.insertCell(4).innerText = userInfo.playCount;
    row.insertCell(
      5
    ).innerHTML = `<a href="testDetails.html?userIndex=${index}">View more</a>`;
  });
}

function userTestAttempts() {
  let urlParams = new URLSearchParams(window.location.search);
  let userIndex = urlParams.get("userIndex");
  if (userIndex === null) {
    console.error("User index not found");
    return;
  }
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let selectedUser = userData[userIndex];
  console.log(selectedUser)
  document.getElementById('user-name').innerHTML = selectedUser.fullName
  document.getElementById('user-email').innerHTML = selectedUser.email
  if (!selectedUser || !selectedUser.testInformation) {
    console.error("Selected user data not found");
    return;
  }

  let userTestAttemptInformation = document.querySelector(".table-three tbody");
  if (!userTestAttemptInformation) {
    console.error("Table Three element not found");
    return;
  }

  userTestAttemptInformation.innerHTML = "";
  selectedUser.testInformation.forEach((attempt, index) => {
    const row = userTestAttemptInformation.insertRow();
    row.insertCell(0).innerText = `Attempt ${index + 1}`;
    let attemptScore = attempt.score || 0;
    row.insertCell(1).innerText = attemptScore;
    row.insertCell(2).innerText = attempt.testDate;
    row.insertCell(3).innerText = attempt.timeTaken || "N/A";
    row.insertCell(
      4
    ).innerHTML = `<a href="fullTestDetails.html?userIndex=${userIndex}&attemptIndex=${index}" style="color:blue; font-weight:bold, a:hover:{text-decoration:underline}">View more</a>`;
  });
}
if (document.querySelector(".table-three")) {
  userTestAttempts();
}

function testAttemptDetails() {
  let urlParams = new URLSearchParams(window.location.search);
  let userIndex = urlParams.get("userIndex");
  const attemptIndex = urlParams.get("attemptIndex");

  if (userIndex === null || attemptIndex === null) {
    console.error("User or attempt index not found");
    return;
  }

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  let selectedUser = userData[userIndex];
  let attempt = selectedUser?.testInformation[attemptIndex];
  console.log(attempt);

  if (!attempt) {
    console.error("Attempt data not found");
    return;
  }

  // Populate attempt details
  document.querySelector(
    ".test-attempt-details h1"
  ).innerText = `Test Attempt ${parseInt(attemptIndex) + 1} Details`;
  document.querySelector(".test-attempt-details .score").innerText = `Score: ${
    attempt.score || "N/A"
  }`;
  document.querySelector(
    ".test-attempt-details .timestamp"
  ).innerText = `Date: ${attempt.testDate || "N/A"}`;
  document.querySelector(
    ".test-attempt-details .time-spent"
  ).innerText = `Time Spent: ${attempt.timeTaken || "N/A"} minute`;

  // Display question and answers
  const container = document.querySelector(".questions-container");
  container.innerHTML = "";

  attempt.testDetails.forEach((detail) => {
    const questionWrapper = document.createElement("div");
    questionWrapper.className = "question-wrapper";

    const questionElement = document.createElement("p");
    questionElement.className = "question";
    questionElement.innerText = detail.question;

    const optionsList = document.createElement("ul");
    detail.allOptions.forEach((option) => {
      const optionItem = document.createElement("li");
      optionItem.innerText = option;
      optionsList.appendChild(optionItem);
    });

    const userAnswer = document.createElement("p");
    userAnswer.className = "your-answer";
    userAnswer.innerText = `Your Answer: ${
      detail.allOptions[detail.choosedAnswer] || "N/A"
    }`;

    const correctAnswer = document.createElement("p");
    correctAnswer.className = "correct-answer";
    correctAnswer.innerText = `Correct Answer: ${
      detail.allOptions[detail.correctAnswer] || "N/A"
    }`;

    container.appendChild(questionElement);
    container.appendChild(optionsList);
    container.appendChild(userAnswer);
    container.appendChild(correctAnswer);
    container.appendChild(questionWrapper);
  });
}


// window.addEventListener('DOMContentLoaded', () => {
//   let links = document.querySelectorAll(".menu a");
//   const currentPage = window.location.pathname.split('/').pop();
//   links.forEach((link) => {
//     const linkHref = link.getAttribute('href');
//     if (linkHref === currentPage) {
//       link.classList.add('active')
//     }
//   })
// })
window.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running...");
  let links = document.querySelectorAll(".menu a");
  const currentPage = window.location.pathname.split("/").pop().toLowerCase(); 
  links.forEach((link) => {
    const linkHref = link.getAttribute("href").toLowerCase();
    if (linkHref === currentPage) {
      link.classList.add("active");
      console.log("Active class added to:", linkHref);
    }
  });
});
