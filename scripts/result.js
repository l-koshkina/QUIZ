(function () {
    const Result = {
        init() {
            // const url = new URL(location.href);
            // const id = sessionStorage.getItem('quizId');
            // const name = sessionStorage.getItem('name');
            // const lastName = sessionStorage.getItem('lastName');
            // const email = sessionStorage.getItem('email');
            // const userAnswers = sessionStorage.getItem('userAnswers');
            // const quizName = sessionStorage.getItem('quizName');
            //
            // const score = sessionStorage.getItem('score');
            // const total = sessionStorage.getItem('total');


            document.getElementById('result-score').innerText = sessionStorage.getItem('score') + '/' + sessionStorage.getItem('total');
            document.getElementById('correct-answers').onclick = function() {
                location.href = 'correct.html';
            }
        }
    }
    Result.init();
})();