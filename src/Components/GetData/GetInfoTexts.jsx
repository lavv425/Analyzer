const GetInfoTexts = async () => {
    try {
        const response = await fetch(`./info_texts/info_texts.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Errore ' + error);
    }
};

export default GetInfoTexts;