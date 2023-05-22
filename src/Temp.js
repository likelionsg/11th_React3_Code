import axios from "axios";
import React, { useEffect, useState } from "react";

const Temp = () => {
  const fetchData = (country) => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const options = {
      method: "get",
    };

    // fetch 는 디폴트 메소드가 get 이기 때문에 options 안 넣어도 됨
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // 우리가 원하는 데이터
        console.log(res);
      });
  };

  const axiosData = (country) => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const options = {
      url,
      method: "get",
    };

    // axios.get(url) 로 사용해도 동일
    axios(options).then((res) => {
      console.log(res);
      // 우리가 원하는 데이터는 res.data 에 있음!
      console.log(res.data);
    });
  };

  //   useEffect(() => {
  //     fetchData("south korea");
  //     axiosData("south korea");
  //   }, []);

  return <div></div>;
};

export default Temp;
