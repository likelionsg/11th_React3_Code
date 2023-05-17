import React, { useEffect, useState } from "react";

const Temp = () => {
  const [num, setNum] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("num 값이 변화할 때마다 출력");

    return () => {
      console.log("clean up");
    };
  }, []);

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>num 올려</button>
      <button onClick={() => setValue(value + 1)}>value +</button>
      <p>num: {num}</p>
      <p>value: {value}</p>
    </div>
  );
};

export default Temp;
