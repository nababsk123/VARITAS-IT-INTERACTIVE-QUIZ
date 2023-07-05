import SetupForm from "./Form/SetupForm";
import Loading from "./Loading/LoadingScreen";
import Modal from "./Modal/Modal.jsx";
import { useGlobalContext } from "./Context/Context.jsx";
import Countdown from "react-countdown";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestions,
    checkAnswers,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { incorrect_answers, correct_answer, question } = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <Countdown date={Date.now() + 60000} className="timer" />
        {console.log(questions)}

        <p className="correct-answers ">
          correct answers: {correct}/{index}
        </p>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${index * 20}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 "
            ></div>
          </div>
        </div>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswers(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestions}>
          next questions
        </button>
      </section>
    </main>
  );
}
export default App;
