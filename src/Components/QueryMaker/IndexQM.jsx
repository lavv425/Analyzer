import { useState, useEffect } from "react";
import SelectTable from "./Selections/SelectTable";
import SelectFields from "./Selections/SelectFields";
import Table from "../Table/Table";
import IAmLoading from "../IAmLoading/IAmLoading";
import GoToTop from "../GoToTop/GoToTop";
import styled from "styled-components";
import { StyledPageContainerQuery, StyledPageContainer } from "../SharedComponents";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const StyledMuiAlert = styled(Alert)`
z-index: 9999999 !important;
position: absolute;
width: 100vw;
top:0;`;
const IndexQM = ({ isFetched, currentFollowingClass, data, handleSelectTableChange, selectedTable, tableIsSelected, selectedTableFields, selectedFields, handleSelectedFields, selectedFieldValues, selectedFieldsObj }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [severityCap, setSeverityCap] = useState()
    const [alertTitleText, setAlertTitleText] = useState()
    const [alertBodyText, setAlertBodyText] = useState()


    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 3500);
        }
    }, [showAlert])

    useEffect(() => {
        if (!tableIsSelected && tableIsSelected !== false) { //primo giro di m che è a false
            setSeverityCap('warning');
            setAlertTitleText('Attenzione!');
            setAlertBodyText('La tabella che hai selezionato non ha dati, e non è selezionabile!');
            setShowAlert(true);
        }
    }, [tableIsSelected])

    return (
        <>
            {isFetched ? (
                <>
                    <GoToTop classFollowing={currentFollowingClass} />
                    <StyledPageContainerQuery>
                        <SelectTable data={data} handleSelectTableChange={handleSelectTableChange} selectedTable={selectedTable} />
                        {tableIsSelected && <SelectFields selectedTableFields={selectedTableFields} selectedFields={selectedFields} handleSelectedFields={handleSelectedFields} />}
                        {/*<SelectFields*/}
                    </StyledPageContainerQuery>
                    <StyledPageContainer>
                        <Table style={{ marginLeft: '5vw' }} content={selectedFieldsObj} headers={selectedFieldValues} />
                    </StyledPageContainer>
                </>
            ) : (
                <IAmLoading />
            )}
            {showAlert && (
                <StyledMuiAlert className="mui-alert" severity={severityCap}>
                    <AlertTitle>{alertTitleText}</AlertTitle>
                    {alertBodyText}
                </StyledMuiAlert>
            )}
        </>
    );

};

export default IndexQM;