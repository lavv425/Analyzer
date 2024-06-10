import IAmLoading from "../IAmLoading/IAmLoading";
import Graphs from "./Graphs/Graphs";
import Reports from "./Reports/Reports";
import styled from "styled-components";

const StyledContainer = styled.div`
margin-top: 5vh;
// margin-left: 5vw;
transition: all 0.3s ease;
`;

const IndexStats = ({ isFetched, data }) => {

    return (
        <>
            {isFetched ? (
                <StyledContainer>
                    <Graphs JsonObject={data} />
                </StyledContainer>) : (<IAmLoading />)}
        </>
    )
};

export default IndexStats;