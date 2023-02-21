import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error))
      .catch(console.log(data.questions));
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return (
    <div className="pageContainer">
      <h1 className="Header">Full stack quiz</h1>
      <div className="page">
        {data && data.length > 0 ? (
          data.map((item) => {
            const answers = shuffle([
              item.correct,
              item.alphaincorrect,
              item.bravoincorrect,
              item.charlieincorrect,
            ]);
            return (
              <div key={item.id}>
                <h2 className="questionPrompt">{item.question}</h2>
                {answers.map((answer, index) => (
                  <div className="answers">
                    <button key={index}>{answer}</button>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <p>No data</p>
        )}
      </div>
      <div className="Footer">
        <p>
          Created by{" "}
          <a className="gitLink" href="https://github.com/in8e">
            Nate Boardman
          </a>
        </p>
        <p className="footerNote">
          This was created using React, Node, Express, and PostgreSQL.
        </p>
      </div>
    </div>
  );
}

export default App;
