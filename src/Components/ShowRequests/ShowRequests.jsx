import { useEffect, useState } from "react";
import DataFetch from "./DataFetch";
import IAmLoading from "../IAmLoading/IAmLoading";
import Table from "../Table/Table";
import styled from "styled-components";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from "@mui/material";

const StyledSRContainer = styled.div`
margin:5vw 0vw 0vw 5vw;`;

const StyledMuiAlert = styled(Alert)`
z-index: 9999999 !important;
position: absolute;
width: 100vw;
top:0;`;
const StyledButton = styled(Button)`
width: 30%;
border:1px solid #a72020 !important;
background:#e4e4e4 !important;
`;
const StyledInnerAlertDiv = styled.div`
margin-top:30px;
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap:20px;
`;
const StyledModalContainer = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #d0d0d0ad;
backdrop-filter: blur(6px);
z-index: 13;`;
const ShowRequests = () => {
    const [headers, setHeaders] = useState(null);
    const [body, setBody] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [addReqs, setAddReqs] = useState(null);
    const [reports, setReports] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [severityCap, setSeverityCap] = useState();
    const [alertTitleText, setAlertTitleText] = useState();
    const [alertBodyText, setAlertBodyText] = useState();
    const [timerId, setTimerId] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const [paramsToSave, setParamsToSave] = useState(null);

    const [existsModal, setExistsModal] = useState(false);
    const [modalHtml, setModalHtml] = useState(null);

    useEffect(() => {
        if (showAlert) {
            const id = setTimeout(() => {
                setShowAlert(false);
                setConfirmation(false);
            }, 6000);
            setTimerId(id);
        }
    }, [showAlert]);

    useEffect(() => {
        const handleCloseModal = () => {
            setExistsModal(false);
            setModalHtml(null);
        };
        const handleOutsideClickModal = (event) => {
            if (!event.target.closest('.modal')) {
                handleCloseModal();
            }
        }

        const handleModsSave = async () => {
            setIsLoading(true);
            let newValues = {
                type: null,
                uniqueId: null,
                newEmail: null,
                newSubject: null,
                newDescription: null,
            };
            const fields = document.querySelectorAll('.mod-field');
            for (const field of fields) {
                const name = field.getAttribute("name");
                const value = field.value;
                newValues[name] = value;
            }

            console.log(newValues);
            const endpoint = 'http://localhost:3001/api/updateRequest';
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                accept: "application/json",
                body: JSON.stringify(newValues),
            };
            try {
                const call = await fetch(endpoint, options)
                const res = await call.json();
                const { status, message } = res;

                if (!status) {
                    setSeverityCap('error');
                    setAlertTitleText('Attenzione!');
                    setAlertBodyText(`${message}\n\rContattare il reparto development, possibilmente condividendo l'errore e il "casus belli"`);
                    handleCloseModal();
                    setShowAlert(true);
                } else {
                    const updatedRequests = await DataFetch();
                    setAddReqs(updatedRequests[0].addReq);
                    setReports(updatedRequests[1].reports);
                    handleCloseModal();
                    setSeverityCap('success');
                    setAlertTitleText('Perfetto!');
                    setAlertBodyText(message);
                    setShowAlert(true);
                }
            } catch (e) {
                setSeverityCap('error');
                setAlertTitleText('Attenzione!');
                setAlertBodyText(`${e}\n\rContattare il reparto development, possibilmente condividendo l'errore e il "casus belli"`);
                setShowAlert(true);
                console.error(e);
            }
            setIsLoading(false);
        };

        if (existsModal) {
            document.addEventListener("click", handleOutsideClickModal);
            const closeButtons = document.querySelectorAll('.close');
            closeButtons.forEach(button => {
                button.addEventListener('click', handleCloseModal);
            });
            const saveModsButton = document.querySelector(".save-mods");

            if (saveModsButton) {
                saveModsButton.addEventListener('click', handleModsSave);
            }
            return () => {
                document.removeEventListener("click", handleOutsideClickModal);
                closeButtons.forEach(button => {
                    button.removeEventListener('click', handleCloseModal);
                });
                if (saveModsButton) {
                    saveModsButton.removeEventListener('click', handleModsSave);
                }
            };
        }
    }, [existsModal]);

    const handleMouseEnter = () => {
        clearTimeout(timerId);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setShowAlert(false);
            setConfirmation(false);
        }, 6000);
        setTimerId(id);
    };

    useEffect(() => {
        const asyncSetReq = async () => {
            const requests = await DataFetch();
            setAddReqs(requests[0].addReq);
            setReports(requests[1].reports);
            setIsLoading(false);
        };
        asyncSetReq();
    }, []);

    useEffect(() => {
        if (addReqs && reports) {
            const firstHeader = 'action';
            const uniqueIdKeys = Object.keys(addReqs[0]);
            const nvKeys = Object.keys(addReqs[0].nv);

            const allKeys = [firstHeader, ...uniqueIdKeys, ...nvKeys];
            const filteredKeys = allKeys.filter(key => !key.includes("nv"));

            setHeaders(filteredKeys);

            const newBodyReqs = addReqs.map(req => {
                const { nv, ...resto } = req;
                resto.type = resto.type === 0 ? 'Richiesta di aggiunta' : 'Segnalazione problematica';
                return { ...resto, ...nv, action: <><VisibilityRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleViewClick(req)} /> <EditRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleEditClick(req)} /> <DeleteForeverRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(req)} /></> };
            });

            const newBodyReports = reports.map(rep => {
                const { nv, ...resto } = rep;
                resto.type = resto.type === 0 ? 'Richiesta di aggiunta' : 'Segnalazione problematica';
                return { ...resto, ...nv, action: <><VisibilityRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleViewClick(rep)} /> <EditRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleEditClick(rep)} /> <DeleteForeverRoundedIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(rep)} /></> };
            });

            // Combina gli array di oggetti
            const combinedBody = [...newBodyReqs, ...newBodyReports];
            setBody(combinedBody);
        }
    }, [addReqs, reports]);

    const handleViewClick = async (param) => {
        const endpoint = 'http://localhost:3001/api/body/ShowReqModal';
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            accept: "application/json",
            body: JSON.stringify(param),
        };
        try {
            const call = await fetch(endpoint, options)
            const res = await call.json();

            setModalHtml(res.data);
            setExistsModal(true);
        } catch (e) {
            setSeverityCap('error');
            setAlertTitleText('Attenzione!');
            setAlertBodyText(`${e}\n\rContattare il reparto development, possibilmente condividendo l'errore e il "casus belli"`);
            setShowAlert(true);
            console.error(e);
        }

    };

    const handleEditClick = async (param) => {
        const endpoint = 'http://localhost:3001/api/body/ShowReqModal/edit';
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            accept: "application/json",
            body: JSON.stringify(param),
        };
        try {
            const call = await fetch(endpoint, options)
            const res = await call.json();

            setModalHtml(res.data);
            setExistsModal(true);
        } catch (e) {
            setSeverityCap('error');
            setAlertTitleText('Attenzione!');
            setAlertBodyText(`${e}\n\rContattare il reparto development, possibilmente condividendo l'errore e il "casus belli"`);
            setShowAlert(true);
            console.error(e);
        }
    };
    const handleDeleteClick = async (param) => {
        setConfirmation(true);
        setParamsToSave(param);
        setSeverityCap('warning');
        setAlertTitleText('Sei sicuro?');
        setAlertBodyText(`Stai eliminando ${param.type ? 'la segnalazione' : 'la richiesta'} in maniera definitiva.`);
        setShowAlert(true);
    };

    const handleConfirmation = async () => {
        setIsLoading(true);
        setConfirmation(false);
        const endpoint = 'http://localhost:3001/api/deleteRequest';
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            accept: "application/json",
            body: JSON.stringify(paramsToSave),
        };

        try {
            const call = await fetch(endpoint, options)
            const res = await call.json();
            const { status, message } = res;

            if (!status) {
                setSeverityCap('error');
                setAlertTitleText('Attenzione!');
                setAlertBodyText(`${message}\n\rContattare il reparto development, possibilmente condividendo l'errore e il "casus belli"`);
                setShowAlert(true);
            } else {
                const updatedRequests = await DataFetch();
                setAddReqs(updatedRequests[0].addReq);
                setReports(updatedRequests[1].reports);
                setSeverityCap('success');
                setAlertTitleText('Perfetto!');
                setAlertBodyText(message);
                setShowAlert(true);
            }
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    };
    const closeAlert = () => {
        setConfirmation(false);
        setShowAlert(false);
        setParamsToSave(null);
    };
    return (
        <>
            {existsModal && <StyledModalContainer dangerouslySetInnerHTML={{ __html: modalHtml }}></StyledModalContainer>}
            {isLoading ? <IAmLoading /> :
                <>
                    <StyledSRContainer>
                        {body && <Table content={body} headers={headers} />}
                    </StyledSRContainer>
                </>}
            {showAlert &&
                <StyledMuiAlert className="mui-alert" severity={severityCap} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <AlertTitle>{alertTitleText}</AlertTitle>
                    {alertBodyText}
                    {confirmation &&
                        <StyledInnerAlertDiv>
                            <StyledButton variant="filled" onClick={handleConfirmation}>Conferma</StyledButton>
                            <StyledButton variant="filled" onClick={closeAlert}>Annulla</StyledButton>
                        </StyledInnerAlertDiv>
                    }

                </StyledMuiAlert>
            }
        </>
    );
};

export default ShowRequests;
