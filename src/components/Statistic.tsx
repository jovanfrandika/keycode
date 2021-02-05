import React, { useState, useEffect } from "react";

interface Props {
  title: string;
  amount: number;
  previousAmount: number;
};

const Statistic: React.FC<Props> = ({ title, amount, previousAmount }) => {
  const [color, setColor] = useState<string>("normal");
  const gain = Math.trunc((amount || 0) - Number(previousAmount || 0));

  useEffect(() => {
    let gainColor: string = "normal";
    if (gain >= 0) { gainColor = "correct" }
    else { gainColor = "wrong" }
    setColor(gainColor);
  }, [gain]);

  return (
    <div className='flex justify-between items-center text-gray-700'>
      <div className='flex flex-col justify-between items-center font-bold'>
        <p className='font-4xl opacity-80'> {title}: </p>
        <p className=''> Gain: </p>
      </div>
      <div className='flex flex-col justify-between items-center font-bold'>
        <p className='font-4xl opacity-80'> {amount || 0} </p>
        <p className={`text-character-${color}`}> {gain > 0 && "+"}{gain} </p>
      </div>
    </div>
  );
};

export default Statistic;