let quizData = [
  {
    question: "What does HTML stands for?",
    answers: [
      "Hypertext machine language",
      "Hyper tranfer markup language",
      "Hypertext markup language",
      "Hyperlink and text markup language",
    ],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question:
      "Which of the following is a valid way to declare a function in JavaScript?",
    answers: [
      "function myFunction() {}",
      "let myFunction = function() {}",
      "const myFunction = () => {}",
      "All of the above",
    ],
    correct: 3,
    choosedAnswer: null,
  },
  {
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    answers: ["String", "Array", "Number", "Boolean"],
    correct: 1,
    choosedAnswer: null,
  },
  {
    question: "What does the typeof operator return when applied to an object?",
    answers: ["Array", "Object", "Function", "Undefined"],
    correct: 1,
    choosedAnswer: null,
  },
  {
    question: "What is the purpose of the map() method in JavaScript?",
    answers: [
      "To modify an array in-place",
      "To filter elements from an array",
      "To iterate over an array and return a new array",
      "To find the index of an element in an array",
    ],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question: "Which of the following is true about const in JavaScript?",
    answers: [
      "You cannot reassign a const variable",
      "A const variable cannot hold objects",
      "const variables are block-scoped",
      "Both A and C",
    ],
    correct: 3,
    choosedAnswer: null,
  },
  {
    question: "Which method converts a JSON object to a string?",
    answers: ["stringify()", "toString()", "JSON.stringify()", "JSON.parse()"],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question: "Which method is used to remove the last element from an array?",
    answers: ["delete()", "shift()", "pop()", "slice()"],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question:
      "How do you add a new element to the end of an array in JavaScript?",
    answers: [
      "array.push()",
      "array.add()",
      "array.append()",
      "array.insert()",
    ],
    correct: 0,
    choosedAnswer: null,
  },
  {
    question: "What does NaN represent in JavaScript?",
    answers: [
      "Not a Node",
      "Not a Number",
      "No available number",
      "None of the above",
    ],
    correct: 1,
    choosedAnswer: null,
  },

  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question: "What is the capital of Japan?",
    answers: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correct: 0,
    choosedAnswer: null,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
    choosedAnswer: null,
  },
  {
    question: "What is the largest mammal in the world?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correct: 1,
    choosedAnswer: null,
  },
  {
    question: "What is the square root of 64?",
    answers: ["6", "7", "8", "9"],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correct: 2,
    choosedAnswer: null,
  },
  {
    question:
      "Which function is used to parse a string to an integer in JavaScript?",
    answers: ["parseInt()", "parseFloat()", "Number()", "int()"],
    correct: 0,
    choosedAnswer: null,
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    answers: ["//", "/* */", "#", "!-- --"],
    correct: 0,
    choosedAnswer: null,
  },
  {
    question: "What does SQL stand for?",
    answers: [
      "Structured Query Language",
      "Simple Query Language",
      "Statement Query Language",
      "Standard Query Language",
    ],
    correct: 0,
    choosedAnswer: null,
  },
];

const userBasicInformation = JSON.parse(localStorage.getItem("userBasicData")) || [];
const userInformation = JSON.parse(localStorage.getItem("userData")) || [];
let storeData = JSON.parse(localStorage.getItem("allQuizData")) || [];
localStorage.setItem("quizDatas",JSON.stringify(quizData))

function handleSignUpForm() {
  let fullName = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let checkBox = document.getElementById("checkbox").checked;

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailExists = userInformation.some((user) => user.email === email);
  const passwordExists = userInformation.some(
    (user) => user.password === password
  );
  if (!fullName || fullName.length < 4) {
    alert("Fullname is mandatory and minimum four letter please enter");
    return;
  }
  if (!namePattern.test(fullName)) {
    alert("Full name should only contain letters and spaces.");
    return;
  }
  if (!email) {
    alert("Email is mandatory please enter");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Enter a proper email");
    return;
  }
  if (!password || password.length < 8) {
    alert("Password is mandatory upto 8 length please enter");
    return;
  } else if (!passwordPattern.test(password)) {
    alert(
      "Password should contain one capital letter one number and special character"
    );
    return;
  }
  if (emailExists) {
    alert("This email is already registered. Please use a different email.");
    return;
  } else if (passwordExists) {
    alert("This password is already exist. Please use a different password.");
    return;
  }
  if (!checkBox) {
    alert("Accept the terms and conditions");
    return;
  } else {
    alert("successfully registered...");
  }
  let userData = { fullName, email,timeTaken:null, score: [], playCount: 0, testInformation:[] };
  userInformation.push(userData);
  localStorage.setItem("userData", JSON.stringify(userInformation));

  const userBasicData = { fullName, email, password };
  userBasicInformation.push(userBasicData);
  localStorage.setItem("userBasicData", JSON.stringify(userBasicInformation));
  window.location.href = "index.html";

}

function handleLoginSubmit(event) {
  event.preventDefault();
  const loginEmail = document.getElementById("emailInput").value;
  const loginPassword = document.querySelector(".passwordInput").value;
  // Validate form inputs
  if (!loginEmail || !loginPassword) {
    alert("Please fill in both fields.");
    return;
  }
  loginUser(loginEmail, loginPassword);
}

function loginUser(loginEmail, loginPassword) {
  const users = JSON.parse(localStorage.getItem("userBasicData")) || [];

  const userFound = users.find(
    (user) => user.email === loginEmail && user.password === loginPassword
  );

  if (userFound) {
    localStorage.setItem("loggedInEmail", loginEmail);
     window.location.href = "startquiz.html";
  } else {
    alert("Invalid email or password");
  }
}

// let passWord = document.getElementById("password");

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

function navigate() {
  window.location.href = "question.html";
}

let questionText = document.getElementById("question-text");
let optionsList = document.getElementById("options-list");
let questionNumber = document.getElementById("question-number");
let progressBar = document.getElementById("progress-bar");
let nextButton = document.getElementById("next");
let previousButton = document.getElementById("prev");

let currentQuestionIndex = 0;
let score = 0;
let currentQuestion;
let questionSequence = []; // To store the fixed sequence of questions

// Shuffle questions once when the quiz starts
function shuffleQuestions() {
  let shuffledData = Array.from(quizData);
  shuffledData.sort(() => Math.random() - 0.5);
  return shuffledData.slice(0, 10);
}
let quizStartTime;
 storeData = JSON.parse(localStorage.getItem("allQuizData")) || [];

function startQuiz() {
    if (!localStorage.getItem("quizStarted")) {
      updatePlayCount();
      localStorage.setItem("quizStarted", true); // Set flag
    }
  currentQuestionIndex = 0;
  score = 0;
  questionSequence = shuffleQuestions(); // Shuffle once and store the sequence
  localStorage.setItem("allQuizData", JSON.stringify(questionSequence)); // Store shuffled data
  storeData = questionSequence;
  storeData = JSON.parse(localStorage.getItem("allQuizData"));
  // Store the quiz start time
  quizStartTime = new Date();
  showQuestion();
}

function showQuestion() {
 
  if (currentQuestionIndex === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "block";
  }
  currentQuestion = storeData[currentQuestionIndex]; // No random here, use the fixed sequence
  let questionNo = currentQuestionIndex + 1;
  if (questionNo === storeData.length - 1) {
    questionNumber.innerHTML = "Last 2 Questions Left";
  } else if (questionNo === storeData.length) {
    questionNumber.innerHTML = "Hey this is the Last Question";
  } else {
    questionNumber.innerHTML = `Question ${questionNo} of 10`;
  }
  questionText.innerHTML = questionNo + ". " + currentQuestion.question;

  optionsList.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.innerHTML = answer;
    li.classList.add("option");
    optionsList.appendChild(li);
    // Retain the selected answer when revisiting the question
    if (currentQuestion.choosedAnswer === index) {
      li.classList.add("selected"); // Apply 'selected' class to previously chosen answer
    }

    li.addEventListener("click", function () {
      selectAnswer(li, index);
    });
  });

  updateProgressBar();
}

function selectAnswer(li, index) {
  let allOptions = document.querySelectorAll(".option");
  allOptions.forEach((option) => {
    option.classList.remove("selected");
  });
  li.classList.add("selected");
  storeData[currentQuestionIndex].choosedAnswer = index;

  localStorage.setItem("allQuizData", JSON.stringify(storeData));
}

function resetQuizData() {
  localStorage.removeItem("allQuizData");
  localStorage.removeItem("currentQuestionIndex");
  localStorage.removeItem("quizStarted"); 
}

function nextQuestion() {
  let selectedOption = document.querySelector(".option.selected");

  if (!selectedOption) {
    alert("Please select an answer before moving to the next question.");
    return;
  }
  currentQuestionIndex++;
  let storeData = JSON.parse(localStorage.getItem("allQuizData"));
  if (currentQuestionIndex < storeData.length - 1) {
    showQuestion();
  } else if (currentQuestionIndex === storeData.length - 1) {
    showQuestion();
    nextButton.innerHTML = "Submit";
  } else {
    let finalScore = calculateScore(); // Call score calculation
    // Calculate and display the total time taken
    const quizEndTime = new Date();
    const timeTaken = calculateTimeTaken(quizStartTime, quizEndTime);
    let text = "Are you sure you want to submit";
    if (confirm(text) == true) {
      alert(
        `Quiz finished! Your score is ${finalScore} out of 100. Time taken: ${timeTaken}`
      );
      updateUserScore(finalScore, timeTaken);
      saveTestInformation(storeData, finalScore,timeTaken); // Save test info here
      resetQuizData();
      nextButton.disabled = true;
      window.location.href = "leaderBoard.html";
    }
  }
}

function calculateTimeTaken(startTime, endTime) {
  const timeDiff = Math.floor((endTime - startTime) / 1000); // Time difference in seconds
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;
  return `${minutes} : ${seconds} `;
}

function calculateScore() {
  let finalScore = 0;
  storeData.forEach((question) => {
    if (question.choosedAnswer === question.correct) {
      finalScore += 10;
    }
  });
  return finalScore;
}

//finalscore bracket me
function updateUserScore(finalScore) {
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  const loginEmail = localStorage.getItem("loggedInEmail");
  const userIndex = users.findIndex((user) => user.email === loginEmail);
  if (userIndex !== -1) {
    if (!Array.isArray(users[userIndex].score)) {
      users[userIndex].score = []; // Ensure score is an array
    }
     users[userIndex].score.push(finalScore);
    localStorage.setItem("userData", JSON.stringify(users)); // Save updated data
  }
}

function getFlattenedLeaderboard() {
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  let leaderboard = [];
  users.forEach(user => {
    if (Array.isArray(user.score)) { 
      user.score.forEach(score => {
        leaderboard.push({ fullName: user.fullName, score: score ,email: user.email,timeTaken: score.timeTaken});
      });
    }
  });
  // Sort leaderboard by score in descending order
  leaderboard.sort((a, b) => b.score - a.score);
  return leaderboard;
}


function updatePlayCount() {
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const userIndex = users.findIndex((user) => user.email === loggedInEmail);
  if (userIndex !== -1) {
    users[userIndex].playCount = (users[userIndex].playCount || 0) + 1;
    localStorage.setItem("userData", JSON.stringify(users));
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
    nextButton.innerHTML = `Next<i class="fa-solid fa-arrow-right">`;
    nextButton.disabled = false;
  }
}

function updateProgressBar() {
  const progressPercentage = ((currentQuestionIndex + 1) / 10) * 100;
  progressBar.style.width = progressPercentage + "%";
}

let logoutContainer = document.getElementById("logout-container");
let flag = 0;
function popUp() {
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
    localStorage.removeItem("loggedInEmail");
    window.location.href = "index.html";
  }
}

// LEADERBOARD START FROM HERE
var users = JSON.parse(localStorage.getItem("userData")) || [];

users.sort((a, b) => b.score - a.score);
let loggedInEmail = localStorage.getItem("loggedInEmail");
let loggedInUser = users.find((user) => user.email === loggedInEmail);
if (loggedInUser) {
  document.querySelector(".right-side-info li:nth-child(3)").innerText =
    loggedInUser.fullName;
  document.getElementById(
    "my-name"
  ).innerText = `Hii, ${loggedInUser.fullName}`;
  document.getElementById("my-email").innerText = loggedInEmail;
}


function updateLeaderboard() {

  const leaderboard = getFlattenedLeaderboard(); // Get sorted leaderboard
  console.log(leaderboard)
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  console.log(loggedInEmail)
  const loggedInUser = leaderboard.find((entry) => entry.email === loggedInEmail);

  let userRank = leaderboard.findIndex(entry => entry.email === loggedInEmail) + 1;
  //let userRank = users.indexOf(loggedInUser) + 1;
  document.getElementById(
    "user-rank-title"
  ).innerText = `Wow You Rank ${userRank}`;
  document.getElementById(
    "supporting-text"
  ).innerText = `Your Score: ${loggedInUser.score}`;

  // First rank update
  if (leaderboard[0]) {
    document.querySelector("#first-rank-container .actual-score p").innerText =
      leaderboard[0].score;
    document.querySelector("#first-rank-container .username").innerText =
      leaderboard[0].fullName;
  }
  // Second rank update
  if (leaderboard[1]) {
    document.querySelector(
      "#second-rank-container .actual-score2 p"
    ).innerText = leaderboard[1].score;
    document.querySelector("#second-rank-container .username").innerText =
      leaderboard[1].fullName;
  }
  // Third rank update
  if (leaderboard[2]) {
    document.querySelector("#third-rank-container .actual-score3 p").innerText =
      leaderboard[2].score;
    document.querySelector("#third-rank-container .username").innerText =
      leaderboard[2].fullName;
  }

  // Update rankings 4-6
  const rankingBoard = document.querySelectorAll(".ranking-board .ranking");
  rankingBoard.forEach((rank, index) => {
    //const user = users[index + 3];
    const user = leaderboard[index + 3];  // Adjust index to start from the 4th user
    if (user) {
      rank.querySelector(".user-name span").innerText = `#${index + 4}`;
      rank.querySelector(".user-name").innerHTML = `<span>#${
        index + 4
      }</span> ${user.fullName}`;
      rank.querySelector(".user-name + .user-name").innerText = user.score;
    }
  });
  if (userRank >= 6) {
    const sixthRank = rankingBoard[2];
    sixthRank.querySelector(".user-name span").innerText = `#${userRank}`;
    sixthRank.querySelector(
      ".user-name"
    ).innerHTML = `<span>#${userRank}</span> ${loggedInUser.fullName}`;
    sixthRank.querySelector(".user-name + .user-name").innerText =
      loggedInUser.score;
  }
}

// Function to check if user data exists
function checkUserData() {
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  if (users.length > 0) {
    console.log("User data found:", users);
  } else {
    console.log("No user data found.");
  }
}

function saveTestInformation(questions, score,timeTaken) {
  let userInformation = JSON.parse(localStorage.getItem("userData")) || [];
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const userIndex = userInformation.findIndex(user => user.email === loggedInEmail);

  if (userIndex !== -1) {
    const testResult = {
      testDate: new Date().toLocaleDateString(), // Add a timestamp for when the test was taken
      score: score,
      timeTaken:timeTaken,
      testDetails: questions.map(question => ({
        question: question.question,
        allOptions: question.answers, // Save all answer options
        choosedAnswer: question.choosedAnswer,
        correctAnswer: question.correct,
        selectedAnswer: question.choosedAnswer !== null ? question.answers[question.choosedAnswer] : null, // The selected answer text
        wrongAnswer: question.choosedAnswer !== question.correct ? question.answers[question.correct] : null, // The correct answer text if wrong
        rightAnswer: question.choosedAnswer === question.correct ? question.answers[question.correct] : null, // The correct answer text if right
      
      }))
    };

    // Check if testInformation exists and push new test results, otherwise create a new array
    if (!userInformation[userIndex].testInformation) {
      userInformation[userIndex].testInformation = [];
    }
    
    userInformation[userIndex].testInformation.push(testResult); // Append the new test result
    localStorage.setItem("userData", JSON.stringify(userInformation)); // Save the updated user data
  }
}





