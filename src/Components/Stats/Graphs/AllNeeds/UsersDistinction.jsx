import variablePie from 'highcharts/modules/variable-pie';
export default function UsersDistinction({ JsonObject, Highcharts, HighchartsReact }) {
    variablePie(Highcharts);
    const jsonData = JsonObject['users'];
    const activeUsers = jsonData.filter(user => user.active === 1);
    const inactiveUsers = jsonData.filter(user => user.active === 0);
    const options = {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: 'Distinzione utenti (tra attivi e non) considerati i ' + (activeUsers.length + inactiveUsers.length) + ' presenti'
        },
        series: [{
            minPointSize: 40,
            innerSize: '30%',
            zMin: 0,
            data: [{
                name: 'Utenti attivi',
                y: activeUsers.length
            }, {
                name: 'Utenti inattivi',
                y: inactiveUsers.length
            }]
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