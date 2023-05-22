import React, { useEffect, useState } from "react";

import {
  PostTitleDiv,
  PostTitle,
  LoadingDiv,
  LoadingImg,
  PostReadDiv,
  ReplTitleDiv,
  PostReplDiv,
  Replwriter,
  Repl,
  PostSection,
  WritereplDiv,
  ReplInput,
  ReplSubmitDiv,
} from "../styledComponents";
import loadingIcon from "../loading.svg";
import { useParams } from "react-router-dom";
import { APIURL } from "../App";
import axios from "axios";

// const post = {
//   id: "1",
//   title: "제곧내",
//   contents: "오늘 휴강인가요?",
//   repls: [
//     {
//       id: "repl1",
//       contents: "ㅇㅇ",
//       post: "1",
//     },
//     {
//       id: "repl2",
//       contents: "yes",
//       post: "1",
//     },
//   ],
// };

const PostAndRepl = React.memo(({ post, postLoading, replLoading, repls, replCount }) => {
  return (
    <>
      <PostTitleDiv>
        <PostTitle>{post && post.title}</PostTitle>
      </PostTitleDiv>

      {postLoading ? (
        <LoadingDiv>
          <LoadingImg src={loadingIcon} />
        </LoadingDiv>
      ) : (
        <PostReadDiv>{post && post.contents}</PostReadDiv>
      )}

      <ReplTitleDiv>댓글 {replCount}</ReplTitleDiv>
      {replLoading ? (
        <LoadingDiv>
          <LoadingImg src={loadingIcon} />
        </LoadingDiv>
      ) : (
        repls &&
        repls.map((repl) => (
          <PostReplDiv key={repl.id}>
            <Replwriter>익명</Replwriter>
            <Repl>{repl.contents}</Repl>
          </PostReplDiv>
        ))
      )}
    </>
  );
});

const ShowPost = () => {
  const params = useParams();
  //   console.log(params);
  const [postLoading, setPostLoading] = useState(true);
  const [replLoading, setReplLoading] = useState(true);

  const [input, setInput] = useState("");

  // 게시글
  const [post, setPost] = useState(null);
  // 해당 게시글의 댓글 목록
  const [repls, setRepls] = useState([]);
  // 댓글 개수
  const replCount = repls.length;

  const onChange = (e) => {
    const { value } = e.target;

    console.log(value);

    setInput(value);
  };

  const getPost = async () => {
    const url = `${APIURL}/api/posts/${params.postID}`;

    try {
      // axios 이용하기!
      const res = await axios.get(url);
      // post 와 repls 상태 값 갱신
      setPost(res.data);
      setRepls(res.data.repls);
      // postLoading 와 replLoading 값 갱신
      setPostLoading(false);
      setReplLoading(false);
    } catch (err) {
      console.log("getPost error: ", err);
    }
  };

  const onSubmitRepl = async () => {
    try {
      // 웹 서버 url
      const url = `${APIURL}/api/repl/`;
      // 웹 서버에 전송할 데이터
      const body = {
        contents: input, // 입력받은 댓글 input
        post: params.postID, // 댓글을 입력할 post 의 ID
      };

      const res = await axios.post(url, body);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log("onSubmitRepl Error: ", err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <PostSection>
      <PostAndRepl
        post={post}
        postLoading={postLoading}
        replLoading={replLoading}
        replCount={replCount}
        repls={repls}
      />

      <WritereplDiv>
        <ReplInput value={input} onChange={onChange} />

        <ReplSubmitDiv onClick={onSubmitRepl}>
          <span>입력</span>
        </ReplSubmitDiv>
      </WritereplDiv>
    </PostSection>
  );
};

export default ShowPost;
