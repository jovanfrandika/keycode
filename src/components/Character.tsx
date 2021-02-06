import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { CharacterState } from "../constants/enums";
import Cursor from "./Cursor";


interface Props {
  character: string;
  showCursor: boolean;
  typed: {
    keyCode: number;
    charCode: number;
    key: string;
  } | null;
  colIndex: number;
  rowIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  characterState: CharacterState;
}

const Character: React.FC<Props> = React.memo((props) => {

  const [color, setColor] = useState<string>("");
  useEffect(() => {

    switch (props.characterState) {
      case CharacterState.CORRECT: setColor("text-green-300"); break;
      case CharacterState.WRONG: setColor("text-red-300"); break;
      default: setColor("text-gray-300");
    }

  }, [props.characterState])


  return (
    <Cursor
      showCursor={props.showCursor}
      character={props.character}
      characterState={props.characterState}
    >
      <p className={clsx("text-xl", { [`${color}`]: true })}>
        {props.character}
      </p>
    </Cursor>
  );
},
  (prevProps, nextProps) =>
    prevProps.typed?.charCode === nextProps.typed?.charCode &&
    prevProps.showCursor === nextProps.showCursor &&
    prevProps.characterState === nextProps.characterState
);

export default Character;