export default function MonthlyInsertions({ JsonObject, Highcharts, HighchartsReact }) {
    let data = {
        "new_tickets": JsonObject["new_tickets"],
        "tickets_pending": JsonObject["tickets_pending"],
        "tickets_closed": JsonObject["tickets_closed"],
    };
    // Crea un oggetto per memorizzare i conteggi mensili
    let conteggiMensili = {};

    // Itera su ogni categoria di ticket
    for (let category in data) {
        // Itera su ogni ticket nella categoria
        for (let ticket in data[category]) {
            // Ottieni il mese e l'anno dal timestamp del ticket
            let date = new Date(data[category][ticket]['date_time_insert']);
            let mese = date.toLocaleString('it-IT', { month: 'long' });
            mese = mese.charAt(0).toUpperCase() + mese.slice(1);
            let anno = date.getFullYear();
            // Crea una chiave unica per l'anno e il mese
            let chiave = `${anno}-${('0' + (date.getMonth() + 1)).slice(-2)} ${mese}`;
            if (!conteggiMensili[chiave]) {
                conteggiMensili[chiave] = 0;
            }
            // Incrementa il conteggio per il mese corrente
            conteggiMensili[chiave]++;
        }
    }
    // Ottieni un array delle chiavi dell'oggetto conteggiMensili e ordina l'array
    let mesiOrdinati = Object.keys(conteggiMensili).sort();
    // Stampa i conteggi mensili in ordine
    let mesi = [];
    for (let i = 0; i < mesiOrdinati.length; i++) {
        let chiave = mesiOrdinati[i];
        mesi[i] = {}; // Initialize mesi[i] as an object
        mesi[i]['mese'] = `${chiave.slice(8)} ${chiave.slice(0, 4)}`;
        mesi[i]['qta'] = conteggiMensili[chiave];
    }

    const options = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ticket inseriti per mese'
        },
        xAxis: {
            categories: mesi.map(mese => mese.mese),
            title: {
                text: 'Mese'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantità'
            }
        },
        series: [{
            name: 'Quantità',
            data: mesi.map(mese => mese.qta)
        }],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG',]
        }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}