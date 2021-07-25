import React from "react";
import Zoom from "./Zoom";
import Option from "./Option";

function Selection(props) {
  let selected = props.selected;
  let optionType = props.optionType;
  console.log(props);

  if (optionType.includes(selected)) {
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
        numOfOptionsToBeAnswered={props.numOfOptionsToBeAnswered}
        setNumOfOptionsToBeAnswered={props.setNumOfOptionsToBeAnswered}
        setCountDownId={props.setCountDownId}
      />
    );
  } else {
    return <Zoom imageName={props.imageName} />;
  }
}

export default Selection;
