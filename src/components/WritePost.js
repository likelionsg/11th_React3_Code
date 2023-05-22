import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PostSection,
  PostSubmit,
  PostSubmitDiv,
  PostTitle,
  PostWriteDiv,
  PostTitleDiv,
  ContentsInput,
  TitleInput,
} from "../styledComponents";

import axios from "axios";
import { APIURL } from "../App";

const SubmitComponent = React.memo(({ onSubmit }) => (
  <PostSubmitDiv onClick={onSubmit}>
    <PostSubmit>작성완료</PostSubmit>
  </PostSubmitDiv>
));

const WriteTitle = React.memo(() => (
  <PostTitleDiv>
    <PostTitle>글쓰기</PostTitle>
  </PostTitleDiv>
));

const WritePost = () => {
  const [inputs, setInputs] = useState({
    title: "",
    contents: "",
  });
  const { title, contents } = inputs;

  const titleInput = useRef(null);
  const contentsInput = useRef(null);

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      contentsInput.current.focus();
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const onSubmit = async () => {
    const url = `${APIURL}/api/posts/`;

    try {
      // axios 사용하기
      // method 는 post
      // 웹서버에 전송할 데이터에는 title 과 contents 를 넣어야함
      const res = await axios.post(url, {
        title,
        contents,
      });
      console.log(res);
      // 요청 성공 후 navigate 를 사용하여 메인 페이지로 이동하기
      alert("글이 작성되었습니다!");
      navigate("/");
    } catch (err) {
      console.log("onSubmit error: ", err);
    }
  };

  useEffect(() => {
    titleInput.current.focus();
  }, []);

  return (
    <PostSection>
      <WriteTitle />

      <PostWriteDiv>
        <TitleInput
          name="title"
          type="text"
          placeholder="제목을 입력해주세요. (15자 이내)"
          onChange={onChange}
          value={title}
          ref={titleInput}
          onKeyUp={onKeyUp}
        />

        <ContentsInput name="contents" cols="30" rows="10" onChange={onChange} value={contents} ref={contentsInput} />
      </PostWriteDiv>

      <SubmitComponent onSubmit={onSubmit} />
    </PostSection>
  );
};

export default WritePost;
