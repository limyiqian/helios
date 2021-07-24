import React from "react";
import Zoom from "./Zoom";
import Option from "./Option";

function Selection(props) {
  let selected = props.selected;
  let option = props.option;
  console.log(props);

  if (option.includes(selected)) {
    return (
      <Option
        questionId={props.questionId}
        selected={selected}
        setIsNextQuestion={props.setIsNextQuestion}
        correctTotal={props.correctTotal}
        setCorrectTotal={props.setCorrectTotal}
        wrongTotal={props.wrongTotal}
        setWrongTotal={props.setWrongTotal}
        setOptionModalVisible={props.setOptionModalVisible}
        numOfOptionsAnswered={props.numOfOptionsAnswered}
        setNumOfOptionsAnswered={props.setNumOfOptionsAnswered}
      />
    );
  } else {
    return <Zoom imageName={props.imageName} />;
  }
}

export default Selection;
