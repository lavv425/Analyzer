import Select from 'react-select';
import { StyledHeaderDivQuery } from '../../SharedComponents';

const SelectFields = ({ selectedTableFields, selectedFields, handleSelectedFields }) => {
    return (
        <StyledHeaderDivQuery className="selector-header">
            <p>Seleziona i campi necessari</p>
            <Select
                options={selectedTableFields.map(field => ({ value: field, label: field }))}
                isMulti={true}
                closeMenuOnSelect={false}
                value={selectedFields}
                placeholder="Seleziona i campi necessari"
                onChange={handleSelectedFields}
            />
        </StyledHeaderDivQuery>
    );
}

export default SelectFields;