{/*Crosshair Documentation: inspect or target any data point on mouse move*/}
{/*A thin horizontal line and a vertical line indicate the data point with the information displaued in an interactive tooltip*/}

import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, DateTime, Tooltip, DataLabel, LineSeries, Crosshair} from '@syncfusion/ej2-react-charts';

// import data from file named ''
//import { data } from '';

function TimeSeries() {
    const [data, setData] = useState([]); //state to hold the fetched data from API
    const primaryxAxis = { valueType: 'DateTime', crosshairTooltip: { enable: true} };
    const primaryyAxis = { crosshairTooltip: { enable: true} };
    const crosshair = { enable: true };
    const marker = { visible: true };
    React.useEffect(() => {
        // fetch data from API
        fetch('http://127.0.0.1:5001/api/reviews')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // empty dependency array ensures useEffect runs only once when component mounts

    return <ChartComponent id='charts' primaryXAxis={primaryxAxis} crosshair={crosshair} title='Average Rating Across Banks'>
        <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Crosshair, DateTime]}/>
        <SeriesCollectionDirective>
            <SeriesDirective dataSource={data_variable} xName='xkey' yName='ykey' name='GXS' type='Line'></SeriesDirective> 
            <SeriesDirective dataSource={data_variable} xName='xkey_UOB' yName='ykey_UOB' name='UOB' type='Line'></SeriesDirective>
            <SeriesDirective dataSource={data_variable} xName='xkey_DBS' yName='ykey_DBS' name='DBS' type='Line'></SeriesDirective>
        </SeriesCollectionDirective>
    </ChartComponent>;

}
;
export default TimeSeries;
ReactDOM.render(<TimeSeries />, document.getElementById("root"))