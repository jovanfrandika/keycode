import React, { useState } from "react";

import { Text } from "@chakra-ui/core";

import { CharacterState } from "../constants/enums";
import Cursor from "./Cursor";


interface Props {
  character: string;
  showCursor: boolean;
  typed: string | null;
  currentIndex: number;
  characterIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTyped: React.Dispatch<React.SetStateAction<string | null>>;
}

const Character: React.FC<Props> = React.memo((props) => {
  const [characterState] = useState(CharacterState.NORMAL)

  return (
    <Cursor
      showCursor={props.showCursor}
    >
      <Text
        color={characterState.toLowerCase()}
      >
        {props.character}
      </Text>
    </Cursor>
  );
},
  (prevProps, nextProps) => prevProps.typed === nextProps.typed && prevProps.showCursor === nextProps.showCursor
);

export default Character;