import Selector from './Selector/Selector';
import Table from '../Table/Table';
import IAmLoading from '../IAmLoading/IAmLoading';
import GoToTop from '../GoToTop/GoToTop';
import { StyledPageContainer } from '../SharedComponents';


const Index = ({ isFetched, currentFollowingClass, data, handleSelectChange, selectedOption, content, headers }) => {

    return (isFetched ?
        <>
            <GoToTop classFollowing={currentFollowingClass} />
            <StyledPageContainer>
                <Selector data={data} handleSelectChange={handleSelectChange} selectedOption={selectedOption} />
                <Table content={content} headers={headers} />
            </StyledPageContainer>
        </> :
        <IAmLoading />);
}


export default Index;