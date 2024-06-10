import React, { useEffect, useState } from 'react';
import IAmLoading from '../IAmLoading/IAmLoading';
import styled from 'styled-components';

const StyledTableDataContainer = styled.div`
width: 98%;
border-radius: 8px;
margin: auto;
box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1)`;


const StyledTableShow = styled.div`
border-radius: 8px;
overflow: auto;
max-height: calc(100vh - 150px);
`;

const StyledDataTable = styled.table`
    width: 100%;
    margin: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 8px;

    
    th {
        // background-color: #ffffff;
        background-color: #c1c1c1a6;
        backdrop-filter: blur(5px);    
        position: sticky;
        top: 0; 
        padding: 12px 8px;
        text-align: left; 
        font-weight: bold;
    }

    td {
        padding: 12px 8px;
        text-align: left;
    }

    tr {
        background-color: #fff;
        // background-color: #f0f0f05c;
    }

    tr:hover {
        background-color: #f7f7f7;
    }
`;

const StyledH2 = styled.h2`
text-align: center;`;

const StyledRowsCounter = styled.small`
float: right;
`;

const Table = ({ content, headers }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tBody, setTBody] = useState(null);
    const [rowsNum, setRowsNum] = useState(0);
    useEffect(() => {

        const activateLoader = async () => {
            setIsLoading(true);
        };

        const makeBody = async (content) => {
            if (content && content.length) {
                return content.map((rowData, index) => (
                    <tr key={index}>
                        {headers.map((header, headerIndex) => (
                            <td key={headerIndex}>{rowData[header]}</td>
                        ))}
                    </tr>
                ));
            } else {
                return <StyledH2 key={0}>No selection</StyledH2>;
            }
        };



        const fetchTableBody = async () => {
            await activateLoader();
            setRowsNum(content.length);
            const bodyMade = await makeBody(content);
            setTBody(bodyMade);
            setIsLoading(false);
        };


        fetchTableBody();
    }, [content, headers]);

    return (
        <StyledTableDataContainer className='table-container'>
            <StyledTableShow className='table-show'>
                {isLoading ? (
                    <IAmLoading />
                ) : (
                    content && (
                        <StyledDataTable className='data-table'>
                            <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{tBody}</tbody>
                        </StyledDataTable>
                    )
                )}
            </StyledTableShow>
            {rowsNum ? <StyledRowsCounter className='rows-counter'>{rowsNum} righe</StyledRowsCounter> : null}
        </StyledTableDataContainer>
    );
};

export default Table;
