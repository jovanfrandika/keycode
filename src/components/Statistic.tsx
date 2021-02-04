import React, { useState, useEffect } from "react";

interface Props {
  title: string;
  amount: number;
  previousAmount: number;
};

const Statistic: React.FC<Props> = (props) => {
  const [color, setColor] = useState<string>("normal");
  const gain = Math.trunc((props.amount || 0) - Number(props.previousAmount || 0));

  useEffect(() => {
    let gainColor: string = "normal";
    if (gain >= 0) {
      gainColor = "correct"
    }
    else {
      gainColor = "wrong"
    }
    setColor(gainColor);
  }, [gain]);

  return (
    <div className='flex justify-between items-center w-8'>
      <div className='flex flex-col justify-between'>
        <p className='font-xl opacity-80'>
          {props.title}:
        </p>
        <p className='mt-1'>
          Gain:
        </p>

      </div>
      <div className='flex flex-col justify-between items-center mb-1'>
        <p className='mb-1 font-4xl font-bold opacity-80'>
          {props.amount || 0}
        </p>
        <p className={`text-character-{color}`}>
          {gain > 0 && "+"}{gain}
        </p>

      </div>
    </div>
  );
};

export default Statistic;