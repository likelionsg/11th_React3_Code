import React, { useEffect, useState } from "react";

import {
  CursorDiv,
  LoadingDiv,
  LoadingImg,
  PostListDiv,
  PostSection,
  PostTitle,
  PostTitleDiv,
} from "../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowsRotate, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import loadingIcon from "../loading.svg";
import { useNavigate } from "react-router-dom";
import EachPost from "./EachPost";

const postList = [
  {
    id: "1",
    title: "제곧내",
    contents: "오늘 휴강인가요?",
    repls: [
      {
        id: "repl1",
        contents: "ㅇㅇ",
        post: "1",
      },
      {
        id: "repl2",
        contents: "yes",
        post: "1",
      },
    ],
  },
  {
    id: "2",
    title: "솔직히 멋사 폼 미친거 아님?",
    contents: "서강 멋사 폼 미쳤다",
    repls: [
      {
        id: "repl3",
        contents: "ㅆㅇㅈ",
        post: "2",
      },
    ],
  },
];

const ShowPostList = () => {
  // loading state
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const goWrite = () => {
    navigate("/write");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <PostSection>
      <PostTitleDiv>
        <FontAwesomeIcon icon={faArrowsRotate} />

        <PostTitle>익명게시판</PostTitle>

        <CursorDiv>
          <FontAwesomeIcon onClick={goWrite} icon={faPenToSquare} />
        </CursorDiv>
      </PostTitleDiv>

      <PostListDiv>
        {loading ? (
          <LoadingDiv>
            <LoadingImg src={loadingIcon} />
          </LoadingDiv>
        ) : (
          <ul>
            {postList.map((post) => (
              <EachPost key={post.id} title={post.title} postID={post.id} />
            ))}
          </ul>
        )}
      </PostListDiv>
    </PostSection>
  );
};

export default ShowPostList;
