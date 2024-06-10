import { faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-25vh);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-25vh);
  }
`;

const StyledInfoButton = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 9999;
  background: #0000ff3d;
  width: 25px;
  height: 25px;
  border: 3px solid #c8c8c8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledTextContainer = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  transform: translateX(-20%);
  z-index: 999;
  background: #d3d3d352;
  backdrop-filter: blur(8px);
  padding: 1%;
  height: 20vh;
  width: 99%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.16);
  animation: ${props => props.isShown ? slideIn : slideOut} 0.2s forwards;
  visibility: ${props => props.isShown ? 'visible' : 'hidden'};
  transition: 0.21s;
`;

const InfoButton = ({ text, isShown, setIsShown }) => {
    const handleMouseClick = () => {
        setIsShown(prevIsShown => !prevIsShown);
    };

    return (
        <div className="info-container">
            <StyledInfoButton onClick={handleMouseClick}>
                <FontAwesomeIcon icon={isShown ? faXmark : faQuestion} />
            </StyledInfoButton>
            <StyledTextContainer isShown={isShown}>
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
            </StyledTextContainer>
        </div>
    );
};

export default InfoButton;
