import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Flex, Box, Text } from "@chakra-ui/core";
import { useSelector } from "react-redux";

import { CharacterState } from "../constants/enums";

import Character from "./Character";
import { addSession, selectUser, selectFileContent } from "../features/userSlice";

const BLOCKED_KEYS = ["Shift"];
const LIMIT = 3;

interface Props {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
};

const Editor: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector(selectUser);
  const { fileContent } = useSelector(selectFileContent);

  const [content, setContent] = useState<string>("")
  const [value, setValue] = useState<string[][]>([]);
  const [currentTyped, setCurrentTyped] = useState<{
    charCode: number;
    keyCode: number;
    key: string;
  } | null>(null);
  const [currentCharacterState, setCurrentCharacterState] = useState<CharacterState>(CharacterState.NORMAL);

  const [start, setStart] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);

  const [col, setCol] = useState<number>(0);
  const [row, setRow] = useState<number>(0);

  const [rowInformation, setRowInformation] = useState<{
    location: number;
    col: number;
    row: number;
  }[]>([]);
  const [screenCursor, setScreenCursor] = useState<number>(0);

  useEffect(() => {
    if (fileContent) {
      setContent(fileContent);
      resetEditor();

      const info = parseRowInformation(fileContent);
      setRowInformation(info);
      setValue(transformValue(info.length < LIMIT ? fileContent : fileContent.slice(0, info[LIMIT].location)));
    }
  }, [fileContent])

  /* 
   * Handle next screen 
   */
  useEffect(() => {
    console.log(`screenCursor: ${screenCursor}`);
    // chizuru best waiuf
    if (screenCursor !== undefined && rowInformation[screenCursor] !== undefined) {
      let newValue: string[][];
      setCurrentTyped(null);
      resetEditor();

      if (screenCursor === 0) {
        console.log('masuk 1')
        newValue = transformValue(content.length < LIMIT ? fileContent : fileContent.slice(0, rowInformation[LIMIT].location));
      }
      else {
        console.log(
          'masuk 2'
        )
        newValue = transformValue(content.slice(
          rowInformation[screenCursor]?.location - 1,
          rowInformation[
            screenCursor + LIMIT > rowInformation.length ?
              rowInformation.length :
              screenCursor + LIMIT
          ]?.location
        ).split(""));
      }
      console.log(newValue);
      setValue(newValue);
    }
  }, [screenCursor]);


  useEffect(() => {
    /**
     * If screen is the last screen in the file.
     */

    if (
      screenCursor === rowInformation.length + 1 - LIMIT
    ) {
      /**
       * If in the last screen, row and col is the last row and col in the screen.
       */
      if (row === LIMIT - 1) {
        // End of the file and the screen, resets back to the beginning.
        calculateStatistics();
        setScreenCursor(0);
      }
    }
    /**
     * If screen just initialized and user just started typing
     */
    if (row === 0 && col === 0 && props.isListening) {
      setStart(Date.now());
    }



    if (currentTyped?.keyCode === 13) {
      if (value[row][col] === "\n") {
        setCol(0);
        setCurrentTyped(null);
        setRow(row + 1);

        /*
            End of screen
         */
        if (row === LIMIT - 1) {
          calculateStatistics();
          setScreenCursor(screenCursor + LIMIT);

        };

        setCurrentCharacterState(CharacterState.NORMAL);
      }
    }
    else {
      if (currentTyped !== null && currentTyped !== undefined) {
        let correct = Number(value[row][col]?.charCodeAt(0) === Number(currentTyped?.charCode));

        if (correct) {
          setCol(col + 1);
          setCurrentTyped(null);
          setCurrentCharacterState(CharacterState.NORMAL);
        }
        else if (!correct) {
          setCurrentCharacterState(CharacterState.WRONG);
          setErrors((error) => error + 1);
        };
      }
    }
  }, [row, col, currentTyped, value])

  useEffect(() => {
    resetEditor();
    if (props.isListening) {
      window.addEventListener("keypress", handleKeypress);
    }
    else {
      window.removeEventListener("keypress", handleKeypress, false);
      window.removeEventListener("keypress", handleKeypress, true);
    }
  }, [props.isListening])

  const handleKeypress = useCallback((event: KeyboardEvent) => {

    BLOCKED_KEYS.forEach((key) => {
      if (event.charCode === 32 || event.key === "Enter" || event.key === "'" || event.key === "/" || event.key === "Tab") {
        event.preventDefault();
      };
      setCurrentTyped({
        charCode: event.charCode,
        keyCode: event.keyCode,
        key: event.key
      })
    })
  }, []);

  const transformValue = (content: string[]) => {
    const transformedValue = [];

    let line: string[] = [];
    for (let character of content) {
      line.push(character);
      if (character === "\n") {
        transformedValue.push(line);
        line = [];
      }
    };
    return transformedValue;
  };

  const parseRowInformation = (file: string) => {
    const slices: {
      location: number,
      col: number,
      row: number
    }[] = [];
    let row = 0;
    let col = 0;

    for (let i = 0; i < file.length; i++) {
      if (file[i] === "\n") {
        slices.push({
          location: i,
          col,
          row
        });
        row += 1;
        col = 0;
      }
      else {
        col += 1;
      };
    };
    return slices;
  };

  const resetEditor = () => {
    setCurrentTyped(null);
    setStart(0);
    setErrors(0);
    setCol(0);
    setRow(0);
    setCurrentCharacterState(CharacterState.NORMAL);
  };

  const calculateStatistics = () => {
    let totalCharacters = 0;

    for (
      let i = screenCursor;
      i < (screenCursor + LIMIT > rowInformation.length ?
        rowInformation.length :
        screenCursor + LIMIT);
      i++
    ) {
      totalCharacters += rowInformation[i].col;
    }

    let duration = (Date.now() - start) / 60000;
    let wpm, cpm;
    cpm = Math.round(totalCharacters / duration);
    wpm = cpm / 5;

    const payload = {
      "cpm": cpm,
      "wpm": wpm,
      "errors": errors,
    }
    dispatch(addSession(payload));
  };

  return (
    <Box onClick={() => props.setIsListening((isListening) => !isListening)} opacity={props.isListening ? 1 : 0.5}>
      {value.map(((array, rowIndex) => {
        return (
          <Flex
            key={`#currentSession:${currentSession}-line-${rowIndex}-`}
            flexDirection="row"
            alignItems="center"
          >
            {array.map((val, colIndex) => (
              <React.Fragment
                key={`#currentSession:${currentSession}-line-${rowIndex}-value-${val}-${colIndex}`}
              >
                {colIndex === 0 && <Text color="yellow.300" display="inline-block" fontSize="xl" w={12}> {screenCursor + rowIndex} </Text>}
                <Character
                  character={val || ""}
                  typed={col === row ? currentTyped : null}
                  colIndex={colIndex}
                  rowIndex={rowIndex}
                  setCurrentIndex={setCol}
                  showCursor={col === colIndex && rowIndex === row}
                  characterState={
                    row === rowIndex && col === colIndex ? currentCharacterState : // cursor
                      row > rowIndex ? CharacterState.CORRECT : // up  of  cursor
                        row >= rowIndex && col >= colIndex ? CharacterState.CORRECT : CharacterState.NORMAL} // correct at left of cursor, normal on right of cursor
                />
              </React.Fragment>
            )
            )}
          </Flex>
        );
      }))}
    </Box>
  );
};



export default Editor;
