import React from "react";
import { TitleBig, TitleSmall, TitleLogoDiv } from "../styledComponents";

const HeaderTitle = () => {
  return (
    <>
      <TitleLogoDiv>
        <TitleBig>멋사</TitleBig>
        <TitleSmall>익명게시판</TitleSmall>
      </TitleLogoDiv>
    </>
  );
};

export default React.memo(HeaderTitle);
