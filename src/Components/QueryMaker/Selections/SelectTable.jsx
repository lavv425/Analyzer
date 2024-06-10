import { useEffect, useState } from 'react';
import Select from 'react-select';
import { StyledHeaderDivQuery } from '../../SharedComponents';

const SelectTable = ({ data, handleSelectTableChange, selectedTable }) => {
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
        <StyledHeaderDivQuery className="selector-header">
            <p>Seleziona la tabella dal menù a tendina</p>
            <Select
                options={values}
                isMulti={false}
                value={selectedTable}
                placeholder="Seleziona la tabella che vorresti vedere..."
                onChange={handleSelectTableChange}
            />
        </StyledHeaderDivQuery>
    );
}

export default SelectTable;

