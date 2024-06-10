const DataFetch = async () => {
    const endpoint = 'http://localhost:3001/api/retrieveRequests';
    try {
        const response = await fetch(endpoint,{method:'GET'});
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default DataFetch;
