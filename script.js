// STEP1では空でOKです。
// STEP3(診断ロジック)から中身を追加していきます。
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("diagnosisForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = "";

    var singleFields = ["age", "status", "time", "budget", "goalIncome", "workStyle"];
    var answers = {};

    for (var i = 0; i < singleFields.length; i++) {
      var name = singleFields[i];
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      if (!checked) {
        errorMsg.textContent = "すべての質問に回答してください。";
        checked = null;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      answers[name] = checked.value;
    }

    var multiFields = ["skills", "interests"];
    for (var j = 0; j < multiFields.length; j++) {
      var mname = multiFields[j];
      var checkedBoxes = form.querySelectorAll('input[name="' + mname + '"]:checked');
      if (checkedBoxes.length === 0) {
        errorMsg.textContent = "すべての質問に回答してください。";
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      answers[mname] = Array.from(checkedBoxes).map(function (el) {
        return el.value;
      });
    }

    localStorage.setItem("moneyAiAnswers", JSON.stringify(answers));
    window.location.href = "result.html";
  });
});
