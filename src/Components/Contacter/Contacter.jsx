import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IAmLoading from "../IAmLoading/IAmLoading";
const StyledContacterContainer = styled.div`
margin: 7%;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(3, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
gap: 20px;
`;

const StyledButtonContainer = styled.div`
display: flex;
justify-content: center;`;
const StyledButtonSend = styled(Button)`
width:80% !important;
border:1px solid black !important;
background:gainsboro !important;
`;

const StyledMuiAlert = styled(Alert)`
z-index: 9999999 !important;
position: absolute;
width: 100vw;
top:0;`;

const generateAlphaNumericId = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alphanumericId = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        alphanumericId += characters.charAt(randomIndex);
    }

    return alphanumericId;
}


const Contacter = ({ type }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [severityCap, setSeverityCap] = useState()
    const [alertTitleText, setAlertTitleText] = useState()
    const [alertBodyText, setAlertBodyText] = useState()
    const [formValues, setFormValues] = useState({
        whoIsHe: '',
        email: '',
        subject: '',
        description: '',
        date: null,
        dateToSave: null,
    });

    const [fieldErrors, setFieldErrors] = useState({
        whoIsHe: false,
        email: false,
        subject: false,
        description: false,
        date: false
    });

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 3500);
        }
    }, [showAlert])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const isValid = value.trim() !== ''; // Verifica se il campo non è vuoto
        setFormValues({ ...formValues, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: !isValid });
    };

    const handleDateChange = (date) => {
        const mydate = dayjs(date).format('DD/MM/YYYY HH:mm')
        setFormValues({ ...formValues, date: date, dateToSave: mydate });
        const isValid = date !== null;
        setFieldErrors({ ...fieldErrors, date: !isValid });
    };

    const handleFormSubmit = () => {
        setIsUploading(true);
        let countErrors = 0;
        Object.keys(fieldErrors).forEach(key => {
            if (fieldErrors[key] === true) {
                countErrors++;
            }
        });

        Object.keys(formValues).forEach(key => {
            if (formValues[key] === '' || formValues[key] === null) {
                countErrors++;
            }
        });

        if (countErrors) {
            setIsUploading(false);
            setSeverityCap('error');
            setAlertTitleText('Attenzione!');
            setAlertBodyText('Tutti i campi sono obbligatori!');
            setShowAlert(true);
            return false;
        }
        saveOnDB(formValues, type);
    };

    const saveOnDB = async (v, type) => {
        const nv = { ...v };
        delete nv.date;
        const uniqueId = await generateAlphaNumericId();

        const endpoint = "http://localhost:3001/api/saveContactForm";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            accept: "application/json",
            body: JSON.stringify({ uniqueId: uniqueId, type: type, nv: nv }),
        };
        fetch(endpoint, options)
            .then(r => r.json())
            .then(({ status: s, message: m }) => {
                if (!s) {
                    setIsUploading(false);
                    setSeverityCap('error');
                    setAlertTitleText('Errore');
                    setAlertBodyText(`Non siamo riusciti a inserire la richiesta, ecco un messaggio di errore dettagliato:\n ${m}`);
                    setShowAlert(true);
                } else {
                    setFormValues({
                        whoIsHe: '',
                        email: '',
                        subject: '',
                        description: '',
                        date: null,
                        dateToSave: null,
                    });
                    setFieldErrors({
                        whoIsHe: false,
                        email: false,
                        subject: false,
                        description: false,
                        date: false
                    });
                    setSeverityCap('success');
                    setAlertTitleText('Perfetto');
                    setAlertBodyText(m);
                    setIsUploading(false);
                    setShowAlert(true);
                }
            })
            .catch(err => {
                setSeverityCap('error');
                setAlertTitleText('Errore');
                setAlertBodyText(`Si è verificato un errore nella richiesta:\n ${err}`);
                setIsUploading(false);
                setShowAlert(true);
                console.error('Error:', err);
            });
    };

    return (
        <>
            {isUploading && <IAmLoading />}
            <h3 style={{ textAlign: 'center' }}>Form {type ? 'per effettuare la segnalazione' : 'per eventuali richieste di aggiunte'}</h3>
            <StyledContacterContainer>
                <TextField fullWidth label="Nome e cognome" variant="outlined" error={fieldErrors.whoIsHe} helperText={fieldErrors.whoIsHe ? "Questo campo è obbligatorio" : ""} className="form-field" name="whoIsHe" value={formValues.whoIsHe} onChange={handleInputChange} />
                <TextField fullWidth label="Mail" variant="outlined" error={fieldErrors.email} helperText={fieldErrors.email ? "Questo campo è obbligatorio" : ""} className="form-field" name="email" value={formValues.email} onChange={handleInputChange} />
                <TextField fullWidth label="Oggetto" variant="outlined" error={fieldErrors.subject} helperText={fieldErrors.subject ? "Questo campo è obbligatorio" : ""} className="form-field" name="subject" value={formValues.subject} onChange={handleInputChange} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Data necessità (se entro una scadenza)" variant="outlined" error={fieldErrors.date} helperText={fieldErrors.date ? "Questo campo è obbligatorio" : ""} className="form-field" ampm={false} value={formValues.date} onChange={handleDateChange} />
                </LocalizationProvider>
                <TextField multiline fullWidth rows={4} style={{ gridArea: "3 / 1 / 4 / 3", width: '100%' }} label="Descrizione" variant="outlined" error={fieldErrors.description} helperText={fieldErrors.description ? "Questo campo è obbligatorio" : ""} className="form-field" name="description" value={formValues.description} onChange={handleInputChange} />
            </StyledContacterContainer>
            <StyledButtonContainer>
                <StyledButtonSend variant="filled" onClick={handleFormSubmit}>Invia {type ? 'la segnalazione' : 'la richiesta'}</StyledButtonSend>
            </StyledButtonContainer>
            {showAlert &&
                <StyledMuiAlert className="mui-alert" severity={severityCap}>
                    <AlertTitle>{alertTitleText}</AlertTitle>
                    {alertBodyText}
                </StyledMuiAlert>
            }
        </>
    );
}

export default Contacter