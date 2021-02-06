import React, { useState, useEffect, useRef, ReactNode } from "react";
import clsx from "clsx";

import { CharacterState } from "../constants/enums";

interface Props {
  children: ReactNode;
  showCursor: boolean;
  character: string;
  characterState: CharacterState;
};

const BLINK_SPEED = 500;

const Cursor: React.FC<Props> = ({ children, showCursor, character, characterState }) => {

  const [bgColor, setBgColor] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(true);
  const displayRef: any = useRef();

  useEffect(() => {
    if (showCursor) {
      clearTimeout(displayRef.current);
      displayRef.current = setTimeout(() => {
        setDisplay(!display);
      }, BLINK_SPEED)
    }
    return () => {
      clearTimeout(displayRef.current);
    }
  }, [showCursor, display]);

  useEffect(() => {


    switch (characterState) {
      case CharacterState.CORRECT: setBgColor("bg-green-300"); break;
      case CharacterState.WRONG: setBgColor("bg-red-300"); break;
      default: setBgColor("bg-gray-300");
    }

  }, [characterState])



  return (
    <div className={clsx("h-7 w-4 text-center align-middle bg-opacity-50 ", { [`${bgColor}`]: display && showCursor })}>
      {character !== "\n" && children}
    </div>
  )
};

export default Cursor;