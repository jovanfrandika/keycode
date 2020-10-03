import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";
import { CharacterState } from "../constants/enums";


interface Props {
  showCursor: boolean;
  character: string;
  characterState: CharacterState;
};

const BLINK_SPEED = 500;

const Cursor: React.FC<Props> = (props) => {

  const [display, setDisplay] = useState(true);
  const displayRef: any = useRef();

  useEffect(() => {
    if (props.showCursor) {
      clearTimeout(displayRef.current);
      displayRef.current = setTimeout(() => {
        setDisplay(!display);
      }, BLINK_SPEED)
    }
    return () => {
      clearTimeout(displayRef.current);
    }
  }, [props.showCursor, display]);

  return (
    <>
      <Box
        display="inline-block"
        background={display && props.showCursor ? props.characterState.toLowerCase() : "none"}
        h="26px"
        w="12.5px"
        textAlign="center"
        verticalAlign="center"
      >
        {props.character !== "\n" && props.children}
      </Box>
      {props.character === "\n" && <Box />}
    </>
  )
};

export default Cursor;