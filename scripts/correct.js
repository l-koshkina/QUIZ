(function () {
    const Correct = {
        correctAnswers: null,
        userAnswersArray: null,
        quiz: null,
        questionTitleElement: null,
        init() {
            checkUserData();
            const name = sessionStorage.getItem('name');
            const lastName = sessionStorage.getItem('lastName');
            const email = sessionStorage.getItem('email');
            const testId = sessionStorage.getItem('quizId');
            const quizName = sessionStorage.getItem('quizName');
            const userAnswers = sessionStorage.getItem('userAnswers');

            this.userAnswersArray = userAnswers ? userAnswers.split(',').map(str => parseInt(str, 10)) : [];

            const nameOfQuiz = document.createElement('span');
            nameOfQuiz.innerText = quizName;
            document.getElementById('pre-title').appendChild(nameOfQuiz);

            const student = document.createElement('span');
            student.innerText = name + ' ' + lastName + ', ' + email;
            document.getElementById('student-name').appendChild(student);

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.correctAnswers = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

            this.showQuestions();

            document.getElementById('to-result').onclick = function () {
                location.href = 'result.html';
            }
        },
        showQuestions() {

            const allQuestions = document.getElementById('all-questions');

            for (let i = 0; i < this.quiz.questions.length; i++) {
                const answerElements = document.createElement('div');
                answerElements.className = 'test-question-options';
                const question = document.createElement('div');
                question.className = 'test-question-title';
                question.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.questions[i].question;
                allQuestions.appendChild(question);

                let currentQuestion = this.quiz.questions[i];
                let userAnswer = this.userAnswersArray[i];
                let correctAnswer = this.correctAnswers[i];


                currentQuestion.answers.forEach(answer => {
                    const answerElement = document.createElement('div');
                    answerElement.className = 'test-question-option';

                    const inputId = 'answer-' + answer.id;
                    const inputElement = document.createElement('input');
                    inputElement.className = 'option-answer';
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('value', answer.id);

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;

                    if (answer.id === userAnswer) {
                        answerElement.classList.add('wrong')
                        if (userAnswer === correctAnswer) {
                            answerElement.classList.remove('wrong')
                            answerElement.classList.add('correct')
                        }
                    }

                    answerElement.appendChild(inputElement);
                    answerElement.appendChild(labelElement);

                    answerElements.appendChild(answerElement)

                    allQuestions.appendChild(answerElements);
                })

            }

        },
    }
    Correct.init();
})();