import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";


interface Props {
  showCursor: boolean;
  character: string;
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
  }, [props.showCursor, display]);

  return (
    <>
      <Box
        display="inline-block"
        background={display && props.showCursor ? "white" : "none"}
        h="18px"
        w="12px"
        textAlign="center"
      >
        {props.character !== "\n" && props.children}
      </Box>

      {props.character === "\n" && <Box />}
    </>
  )
};

export default Cursor;