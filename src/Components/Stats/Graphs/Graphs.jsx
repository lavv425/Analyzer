import jsonQ from 'js-jsonq';
import UsersDistinction from './AllNeeds/UsersDistinction';
import MonthlyInsertions from './AllNeeds/MonthlyInsertions';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';

import styled from 'styled-components';
const StyledGraphContainer = styled.div`
margin-left:5vw;
display: grid;
grid-template-columns: repeat(1, 1fr);
grid-template-rows: ;
grid-column-gap: 0px;
grid-row-gap: 0px;
`;
const Graphs = ({ JsonObject }) => {
    HighchartsExporting(Highcharts);
    accessibility(Highcharts);

    const defaultObjToPass = { JsonObject, Highcharts, HighchartsReact };
    return (
        <>
            <StyledGraphContainer>
                <UsersDistinction {...defaultObjToPass} />
                <MonthlyInsertions {...defaultObjToPass} />
            </StyledGraphContainer>
        </>
    );

}
export default Graphs;