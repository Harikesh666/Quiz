document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");
    const startBtn = document.getElementById("start-btn");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain",
            ],
            answer: "William Shakespeare",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selected = false;

    startBtn.addEventListener("click", startQuiz);

    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
    });

    function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");

        showQuestion();
    }

    function showQuestion() {
        selected = false; // Reset selection for new question
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = ""; // clear previous choices

        questions[currentQuestionIndex].choices.forEach((choice) => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.classList.add("choice");

            li.addEventListener("click", () => {
                if (!selected) {
                    // Ensure only one selection
                    selected = true;
                    checkAnswer(li, choice);
                }
            });
            choicesList.appendChild(li);
        });
    }

    function checkAnswer(selectedLi, choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            selectedLi.classList.add("correct");
            score++;
        } else {
            selectedLi.classList.add("incorrect");
        }
        disableChoices();
        nextBtn.classList.remove("hidden");
    }

    function disableChoices() {
        document.querySelectorAll(".choice").forEach((choice) => {
            choice.classList.add("disabled");
            choice.style.pointerEvents = "none";
        });
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
});
