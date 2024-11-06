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
function popUp() {
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

let questionDetails = document.querySelector(".question-details");
let flagValue = 0;
function popUpQuestion() {
  if (flagValue == 0) {
    questionDetails.style.display = "block";
    flagValue = 1;
  } else {
    questionDetails.style.display = "none";
    flagValue = 0;
  }
}


let questionCount = 1;
function handleQuestionAnswers(event) {
    event.preventDefault()
    let question = document.getElementById("question-input").value;
    let optionA = document.getElementById("option-a").value;
    let optionB = document.getElementById("option-b").value;
    let optionC = document.getElementById("option-c").value;
    let optionD = document.getElementById("option-d").value;
    let correctAnswer = document.getElementById("correct-answer-input").value

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
        alert("Please fill in all fields");
        return;
    }
    
  let table = document.getElementById("question-table");
  const row = table.insertRow();

  // Insert cells in the row
  const srNoCell = row.insertCell(0);
  const questionCell = row.insertCell(1);
  const actionsCell = row.insertCell(2);

  srNoCell.innerText = questionCount++;
  questionCell.innerText = question;
    // Create action icons
    const editIcon = document.createElement("i");
  editIcon.className = "pen fa-solid fa-pencil";
    editIcon.onclick = () => editQuestion(question);

    const deleteIcon = document.createElement("i");
  deleteIcon.className = "trashs fa-solid fa-trash-can";
    deleteIcon.onclick = () => deleteQuestion(row);

    const viewIcon = document.createElement("i");
    viewIcon.className = "open-eye fa-regular fa-eye";
  //viewIcon.onclick = () => viewQuestion(question, correctAnswer, [optionA, optionB, optionC, optionD]);
  viewIcon.onclick = () => popUpQuestion(question, correctAnswer, [optionA, optionB, optionC, optionD]);


    // Append icons to actions cell
    actionsCell.append(editIcon, deleteIcon, viewIcon);

   // Clear the form fields
   document.getElementById("question-input").value = "";
   document.getElementById("option-a").value = "";
   document.getElementById("option-b").value = "";
   document.getElementById("option-c").value = "";
   document.getElementById("option-d").value = "";
   document.getElementById("correct-answer-input").value = "";
}

function editQuestion(question) {
  alert("Edit question: " + question);
}

function deleteQuestion(row) {
  row.remove();
  alert("Question deleted");
}

function viewQuestion(question, correctAnswer, options) {
  // alert(`Question: ${question}\nOptions: ${options.join(", ")}\nCorrect Answer: ${correctAnswer}`);
  let  optionsList = document.getElementById("optionsList")
  document.getElementById("view-question").innerText = question
  options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsList.appendChild(li);
  });
  document.getElementById("view-correct-answer").innerText = correctAnswer
}
 
