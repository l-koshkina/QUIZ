import {UrlManager} from "../utils/url-manager.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Correct {

    constructor() {
        this.quiz = [];
        this.userInfo = null;
        this.routeParams = UrlManager.getQueryParams();
        this.init();

    }

    async init() {

        this.userInfo = Auth.getUserInfo();
        const student = document.createElement('span');
        student.innerText = this.userInfo.fullName + ', ' + localStorage.getItem('email');
        document.getElementById('student-name').appendChild(student);
        if (!this.userInfo) {
            location.href = '#/';
        }
        try {
            const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + this.userInfo.userId);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.quiz = result;
                const nameOfQuiz = document.createElement('span');
                nameOfQuiz.innerText = this.quiz.test.name;
                document.getElementById('pre-title').appendChild(nameOfQuiz);
                this.showQuestions();
            }
        } catch (error) {
            console.log(error);
        }

        document.getElementById('to-result').onclick = () => {
            location.href = '#/result?id=' + this.routeParams.id;
        }

    }

    showQuestions() {

        const allQuestions = document.getElementById('all-questions');

        for (let i = 0; i < this.quiz.test.questions.length; i++) {
            const answerElements = document.createElement('div');
            answerElements.className = 'test-question-options';
            const question = document.createElement('div');
            question.className = 'test-question-title';
            question.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.test.questions[i].question;
            allQuestions.appendChild(question);

            let currentQuestion = this.quiz.test.questions[i];


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

                if (answer.correct === false) {
                    answerElement.classList.add('wrong');
                } else if (answer.correct === true) {
                    answerElement.classList.add('correct');
                }

                answerElement.appendChild(inputElement);
                answerElement.appendChild(labelElement);

                answerElements.appendChild(answerElement)

                allQuestions.appendChild(answerElements);
            })
        }
    }
}

