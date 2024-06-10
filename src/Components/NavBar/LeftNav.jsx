import styled from "styled-components";
import './LeftNav.css';
import { faFileCode, faFileExcel, faFileCsv, faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect, useState } from "react";
import { json2csv } from 'json-2-csv';
import * as XLSX from 'xlsx';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import { useNavigate } from "react-router-dom";

const StyledLeftNav = styled.div`
position: fixed;
top: 0;
left: 0;
height: 100vh;
width: ${props => props.isOpen ? '15vw' : '4vw'};
transition: width 0.3s;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
background: rgba(255, 255, 255, 0);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(9.7px);
-webkit-backdrop-filter: blur(9.7px);
border: 1px solid rgba(255, 255, 255, 1);
z-index:99;

& span {
    cursor: pointer;
    width: 100%;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover{
        scale: ${props => props.isOpen ? '1.2' : '1.4'};
    }

    & div{
        width: 100%;
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: center;
    }
}`;
const StyledHandleOpeningClosing = styled.div`
cursor: pointer;
position: absolute;
top: 3vh;`;

const StyledReportABug = styled.div`
cursor: pointer;
position: absolute;
bottom: 3vh;`;
const StyledMuiAlert = styled(Alert)`
z-index: 9999999 !important;
position: absolute;
width: 100vw;
top:0;`;
const StyledNavigator = styled.div`
width:100%;
position: absolute;
top: 16%;
`;
const LeftNav = ({ isOpen, setIsOpen, selectedOption, content }) => {
    const navigate = useNavigate();
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

    const handleDownload = (selectedOption, content, format) => {
        if (content && content.length) {
            if (format === 'json') {
                const jsonData = JSON.stringify(content);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedOption.value}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else if (format === 'csv') {
                const csv = json2csv(content);
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedOption.value}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else if (format === 'xlsx') {
                const ws = XLSX.utils.json_to_sheet(content);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([wbout], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedOption.value}.xlsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
            setSeverityCap('success');
            setAlertTitleText('Fatto!');
            setAlertBodyText(`Il tuo file ${selectedOption.value}.${format} è stato scaricato!`);
            setShowAlert(true);
        } else {
            setSeverityCap('warning');
            setAlertTitleText('Attenzione!');
            setAlertBodyText('Non hai selezionato una tabella scaricabile!!');
            setShowAlert(true);
        }
    };

    return (
        <>
            <StyledLeftNav className="left-nav" isOpen={isOpen}>
                <StyledHandleOpeningClosing onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon size={"lg"} icon={!isOpen ? faArrowUpRightFromSquare : faXmark} />
                </StyledHandleOpeningClosing>
                <StyledNavigator>
                    <span title="Home" onClick={() => navigate('/')}>{isOpen ? <div className="navigator-open-div"><HomeRoundedIcon style={{color:"#0062e5"}} />Home</div> : <HomeRoundedIcon />}</span>
                    <span title="Ricerca personalizzata" onClick={() => navigate('/query-builder')}>{isOpen ? <div className="navigator-open-div"><TableRowsRoundedIcon style={{color:"#a77600"}} />Filtra colonne</div> : <TableRowsRoundedIcon />}</span>
                    <span title="Mostra le statistiche" onClick={() => navigate('/show-statistics-and-reports')}>{isOpen ? <div className="navigator-open-div"><QueryStatsRoundedIcon style={{color:"#32a700"}} />Statistiche e <br/>reportstica</div> : <QueryStatsRoundedIcon />}</span>
                </StyledNavigator>
                {content.length ?
                    <>
                        <span title="Scarica in Formato JSON" onClick={() => handleDownload(selectedOption, content, 'json')}>{isOpen ? <div><FontAwesomeIcon icon={faFileCode} size="xl" />Scarica Json</div> : <FontAwesomeIcon icon={faFileCode} size="xl" />}</span>
                        <span title="Scarica in Formato Excel" onClick={() => handleDownload(selectedOption, content, 'xlsx')}>{isOpen ? <div><FontAwesomeIcon icon={faFileExcel} size="xl" />Scarica Excel</div> : <FontAwesomeIcon icon={faFileExcel} size="xl" />}</span>
                        <span title="Scarica in Formato CSV" onClick={() => handleDownload(selectedOption, content, 'csv')}>{isOpen ? <div><FontAwesomeIcon icon={faFileCsv} size="xl" />Scarica CSV</div> : <FontAwesomeIcon icon={faFileCsv} size="xl" />}</span>
                    </>
                    : null
                }
                <StyledReportABug>
                    <span title="Visualizza le tue richieste" onClick={() => navigate('/see-requests')}>{isOpen ? <div className="navigator-open-div"><FileCopyRoundedIcon style={{color:'#00b4fb'}}/>Le mie richieste</div> : <FileCopyRoundedIcon />}</span>
                    <span title="Richiedi un report in aggiunta ai presenti" onClick={() => navigate('/request-a-new-report')}>{isOpen ? <div className="navigator-open-div"><PlaylistAddIcon style={{color:'#2d8500'}}/>Richiedi un report<br/>aggiuntivo</div> : <PlaylistAddIcon />}</span>
                    <span title="Segnala un problema" onClick={() => navigate('/report-a-problem')}>{isOpen ? <div className="navigator-open-div"><ReportRoundedIcon style={{color:'#850000'}}/>Segnala un problema</div> : <ReportRoundedIcon />}</span>
                </StyledReportABug>
            </StyledLeftNav>
            {showAlert &&
                <StyledMuiAlert className="mui-alert" severity={severityCap}>
                    <AlertTitle>{alertTitleText}</AlertTitle>
                    {alertBodyText}
                </StyledMuiAlert>
            }
        </>

    );
};

export default LeftNav;