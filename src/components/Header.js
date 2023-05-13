import { HeaderDiv, SubHeaderDiv } from "../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import HeaderTitle from "./HeaderTitle";

const Header = () => {
  return (
    <>
      <HeaderDiv>
        <HeaderTitle />
        <SubHeaderDiv>
          <FontAwesomeIcon icon={faSun} />
        </SubHeaderDiv>
      </HeaderDiv>
    </>
  );
};

export default Header;
