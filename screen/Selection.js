import React from "react";
import Zoom from "./Zoom";
import Option from "./Option";

function Selection(props) {
  let selected = props.selected;
  let option = props.option;
  // console.log(props);

  if (selected == option) {
    return (
      <Option
        questionId={props.questionId}
        setIsNextQuestion={props.setIsNextQuestion}
        correctTotal={props.correctTotal}
        setCorrectTotal={props.setCorrectTotal}
        wrongTotal={props.wrongTotal}
        setWrongTotal={props.setWrongTotal}
      />
    );
  } else {
    return <Zoom />;
  }
}

export default Selection;
