const params = new URLSearchParams(window.location.search);
const chapterId = params.get('chapter') || '1';

const chapters = {
    1: {
        subject: 'Histoire',
        title: 'Première Guerre mondiale',
        questions: [
            {
                question: 'En quelle année a commencé la Première Guerre mondiale ?',
                answers: ['1914', '1918', '1939', '1945'],
                correct: 0,
                explanation: 'La Première Guerre mondiale a commencé en 1914.'
            },
            {
                question: 'Quels pays formaient principalement la Triple-Entente ?',
                answers: [
                    'France, Royaume-Uni et Russie',
                    'Allemagne, Italie et Japon',
                    'France, Allemagne et Russie',
                    'Royaume-Uni, Allemagne et Italie'
                ],
                correct: 0,
                explanation: 'La Triple-Entente regroupait principalement la France, le Royaume-Uni et la Russie.'
            }
        ]
    },
    2: {
        subject: 'Histoire',
        title: 'Deuxième Guerre mondiale',
        questions: [
            {
                question: 'En quelle année a commencé la Deuxième Guerre mondiale ?',
                answers: ['1914', '1918', '1939', '1945'],
                correct: 2,
                explanation: 'La Deuxième Guerre mondiale a commencé en 1939.'
            }
        ]
    },
    3: {
        subject: 'Histoire',
        title: 'La Guerre froide',
        questions: [
            {
                question: 'Quelles étaient les deux principales puissances de la Guerre froide ?',
                answers: [
                    'France et Royaume-Uni',
                    'États-Unis et URSS',
                    'Allemagne et Japon',
                    'Chine et France'
                ],
                correct: 1,
                explanation: 'La Guerre froide opposait principalement les États-Unis et l’URSS.'
            }
        ]
    },
    4: {
        subject: 'Histoire',
        title: 'La décolonisation',
        questions: [
            {
                question: 'Que signifie le terme décolonisation ?',
                answers: [
                    'La création de nouvelles colonies',
                    'La fin de la colonisation et l’accès à l’indépendance',
                    'La création d’une guerre mondiale',
                    'La séparation de l’Europe'
                ],
                correct: 1,
                explanation: 'La décolonisation correspond au processus par lequel les colonies accèdent à leur indépendance.'
            }
        ]
    }
};

const chapter = chapters[chapterId];

const quizResult = document.getElementById('quiz-result');
const scoreText = document.getElementById('score-text');
const scorePercentage = document.getElementById('score-percentage');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const restartButton = document.getElementById('restart-button');

if (quizResult) {
    quizResult.style.display = 'none';
}

if (chapter) {
    document.getElementById('quiz-subject').textContent = chapter.subject;
    document.getElementById('quiz-title').textContent = chapter.title;
}

let currentQuestion = 0;
let score = 0;
let quizFinished = false;

function displayQuestion() {
    const question = chapter.questions[currentQuestion];
    const progress =
    ((currentQuestion + 1) / chapter.questions.length) * 100;

document.getElementById('quiz-progress-fill').style.width =
    `${progress}%`;

    document.getElementById('quiz-counter').textContent =
        `Question ${currentQuestion + 1} sur ${chapter.questions.length}`;

    document.getElementById('question-number').textContent =
        `Question ${currentQuestion + 1}`;

    document.getElementById('question-text').textContent =
        question.question;

    const answersContainer = document.getElementById('answers-container');

    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
    const label = document.createElement('label');

    label.className = 'answer-option';

    label.innerHTML = `
        <input type="radio" name="answer" value="${index}">
        <span>${answer}</span>
    `;

    answersContainer.appendChild(label);
});
}

if (chapter) {
    displayQuestion();
}

const validateButton = document.getElementById('validate-button');
const quizFeedback = document.getElementById('quiz-feedback');

validateButton.addEventListener('click', () => {
    if (validateButton.textContent === 'Question suivante') {
        currentQuestion++;

        if (currentQuestion < chapter.questions.length) {
            displayQuestion();
            quizFeedback.textContent = '';
            validateButton.textContent = 'Valider ma réponse';
      } else {
    quizFinished = true;

    document.querySelector('.quiz-card').style.display = 'none';

    const totalQuestions = chapter.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const incorrect = totalQuestions - score;

    scoreText.textContent =
        `${score} / ${totalQuestions}`;

    scorePercentage.textContent =
        `${percentage}%`;

    correctCount.textContent = score;
    incorrectCount.textContent = incorrect;

    quizResult.style.display = 'block';
}
        return;
    }

    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selectedAnswer) {
        quizFeedback.textContent = 'Veuillez sélectionner une réponse.';
        return;
    }

    const question = chapter.questions[currentQuestion];
    const selectedIndex = Number(selectedAnswer.value);

 const answerOptions = document.querySelectorAll('.answer-option');

answerOptions.forEach((option, index) => {
    if (index === question.correct) {
        option.classList.add('correct');
    }

    if (index === selectedIndex && selectedIndex !== question.correct) {
        option.classList.add('incorrect');
    }
});

if (selectedIndex === question.correct) {
    score++;

    quizFeedback.textContent =
        `Bonne réponse ! ${question.explanation}`;
} else {
    quizFeedback.textContent =
        `Mauvaise réponse. La bonne réponse est : ${question.answers[question.correct]}. ${question.explanation}`;
}

    document.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.disabled = true;
    });

    validateButton.textContent = 'Question suivante';
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizFinished = false;

    quizResult.style.display = 'none';
    document.querySelector('.quiz-card').style.display = 'block';

    quizFeedback.textContent = '';
    validateButton.textContent = 'Valider ma réponse';

    displayQuestion();
});