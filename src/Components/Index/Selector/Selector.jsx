import { useEffect, useState } from "react";
import Select from 'react-select';
import { StyledHeaderDiv } from "../../SharedComponents";

const Selector = ({ data, handleSelectChange, selectedOption }) => {
    const [values, setValues] = useState([]);

    const notToTake = [
        "psw_reset_codes",
        "it_chat_ids",
        "access_logs",
        "event_logger",
        "salts",
        "secrets"
    ]
    useEffect(() => {
        const filteredKeys = Object.keys(data).filter(key => !notToTake.includes(key));
        setValues(filteredKeys.map(key => ({ value: key, label: key })));
    }, [])


    return (
        <>
            <StyledHeaderDiv className="selector-header">
                <p>Seleziona la tabella dal menù a tendina</p>
                <Select
                    options={values}
                    isMulti={false}
                    value={selectedOption}
                    placeholder="Seleziona la tabella che vorresti vedere..."
                    onChange={handleSelectChange}
                />
            </StyledHeaderDiv>
        </>
    );
}

export default Selector;