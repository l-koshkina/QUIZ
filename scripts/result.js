(function () {
    const Result = {
        init() {
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const name = url.searchParams.get('name');
            const lastName = url.searchParams.get('lastName');
            const email = url.searchParams.get('email');
            const userAnswers = url.searchParams.get('userAnswers');
            const quizName = url.searchParams.get('quizName');

            const score = url.searchParams.get('score');
            const total = url.searchParams.get('total');


            console.log(userAnswers);
            document.getElementById('result-score').innerText = score + '/' + total;
            document.getElementById('correct-answers').onclick = function() {
                location.href = 'correct.html?name=' + name + '&lastName=' + lastName + '&email=' + email + '&id=' + id + '&quizName=' + quizName + '&userAnswers=' + userAnswers +
                '&score=' + score + '&total=' + total;
            }
        }
    }
    Result.init();
})();