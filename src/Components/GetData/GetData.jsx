const GetData = async () => {
    try {
        const response = await fetch(`./analyzer_backups/bk_data.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Errore ' + error);
    }
};

export default GetData;