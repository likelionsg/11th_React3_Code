import React, { useEffect, useState } from "react";

import {
  CursorDiv,
  LoadingDiv,
  LoadingImg,
  PagenumberDiv,
  PagingSection,
  PostListDiv,
  PostSection,
  PostTitle,
  PostTitleDiv,
  PageEmptyDiv,
} from "../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowsRotate, faPenToSquare, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import loadingIcon from "../loading.svg";
import { useNavigate } from "react-router-dom";
import EachPost from "./EachPost";
import { APIURL } from "../App";
import axios from "axios";

axios.defaults.withCredentials = true;

// const postList = [
//   {
//     id: "1",
//     title: "제곧내",
//     contents: "오늘 휴강인가요?",
//     repls: [
//       {
//         id: "repl1",
//         contents: "ㅇㅇ",
//         post: "1",
//       },
//       {
//         id: "repl2",
//         contents: "yes",
//         post: "1",
//       },
//     ],
//   },
//   {
//     id: "2",
//     title: "솔직히 멋사 폼 미친거 아님?",
//     contents: "서강 멋사 폼 미쳤다",
//     repls: [
//       {
//         id: "repl3",
//         contents: "ㅆㅇㅈ",
//         post: "2",
//       },
//     ],
//   },
// ];

const ShowPostList = () => {
  // loading state
  const [loading, setLoading] = useState(true);
  // post list
  const [postList, setPostList] = useState([]);

  // 현재 페이지 번호 ex) 현재 1 페에지 --> page == 1
  const [page, setPage] = useState(1);
  // 전체 페이지 배열  ex) 2 페이지 까지 있다 --> pages == [1, 2]
  const [pages, setPages] = useState([]);

  const navigate = useNavigate();
  const goWrite = () => {
    navigate("/write");
  };

  const getPostList = () => {
    // url query string 에 현재 page 값 넘기기!
    const url = `${APIURL}/api/list/?page=${page}`;
    const data = { page };
    axios
      .get(url, { params: data })
      .then((res) => {
        console.log("getPostList response: ", res);

        // 게시글의 총 개수
        const count = res.data.count;
        // 한 페이지 당 10개의 게시글
        // lastPage 는 마지막 페이지 숫자!
        // ex) count = 12 -> lastPage = 2
        const lastPage = Math.ceil(count / 10);

        // 전체 페이지 배열을 담을 임시 참조타입(배열) 생성
        const tempPages = [];
        for (let i = 1; i <= lastPage; i++) {
          // 페이지 번호들 담기
          tempPages.push(i);
        }

        // 전체 페이지 배열 상태값 갱신
        setPages(tempPages);
        // 게시글 목록 상태값 갱신
        setPostList(res.data.results);
        // 로딩 상태값 갱신
        setLoading(false);
      })
      .catch((err) => {
        console.log("get post list err: ", err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [page]);

  return (
    <>
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

      {/* 페이지 버튼 */}
      <PagingSection>
        {/* 왼쪽 화살표 아이콘: 클릭 시 이전 페이지로 이동시킬 것임 */}
        {page > 1 ? (
          <PagenumberDiv
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </PagenumberDiv>
        ) : (
          <PageEmptyDiv></PageEmptyDiv>
        )}
        {/* 페이지 번호들 */}
        {pages.map((pageNum) => (
          <PagenumberDiv key={pageNum} onClick={() => setPage(pageNum)}>
            {pageNum}
          </PagenumberDiv>
        ))}
        {/* 오른쪽 화살표 아이콘: 클릭 시 다음 페이지로 이동시킬 것임 */}
        {page < pages.length ? (
          <PagenumberDiv
            onClick={() => {
              if (page < pages.length) {
                setPage(page + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </PagenumberDiv>
        ) : (
          <PageEmptyDiv></PageEmptyDiv>
        )}
      </PagingSection>
    </>
  );
};

export default ShowPostList;
