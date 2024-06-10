import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNF404ContainerMaster = styled.div`
width:100vw;
height:100vh;
background:#eeeeee;

`;

const Styled404Container = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

& h4{
    font-size: 22px;
}
& button{
    padding:10px;
    border-radius:5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    border: none;
    background: white;
    font-size:16px;
    cursor:pointer;
    transition: all 0.2s;
    font-family: 'Figtree';
    &:hover{
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        background: #505050;
        color: white;
    }
}
`;


const Nf404 = () => {

    return (
        <StyledNF404ContainerMaster className="not-found">
            <Styled404Container className="404-container">
                <h1>404</h1>
                <h4>The page you're searching for doesn't exist</h4>
                <Link to="/"><button>Back to home</button></Link>
            </Styled404Container>
        </StyledNF404ContainerMaster>
    );
};

export default Nf404;