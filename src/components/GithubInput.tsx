import React from "react";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const GithubInput: React.FC<Props> = (props) => {
  return (
    <div className='mx-auto align-center'>
      <p className="mb-6 text-2xl">Search Public Repositories <p className='font-bold'>@Github</p></p>
      <input
        className='bg-white'
        value={props.value}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          props.setValue(String(event.currentTarget.value));
        }}
      />
    </div>
  );
};

export default GithubInput;