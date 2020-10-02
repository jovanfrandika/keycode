import React, { useState } from "react";

import { Text } from "@chakra-ui/core";

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
  currentIndex: number;
  characterIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  characterState: CharacterState;
  // setCurrentTyped: React.Dispatch<React.SetStateAction<number | null>>;
}

const Character: React.FC<Props> = React.memo((props) => {
  // const [characterState] = useState(CharacterState.NORMAL)

  return (
    <Cursor showCursor={props.showCursor} character={props.character} characterState={props.characterState}>
      <Text color={props.characterState.toLowerCase()}>
        {props.character}
      </Text>
    </Cursor>
  );
},
  (prevProps, nextProps) => prevProps.typed?.charCode === nextProps.typed?.charCode && prevProps.showCursor === nextProps.showCursor
);

export default Character;