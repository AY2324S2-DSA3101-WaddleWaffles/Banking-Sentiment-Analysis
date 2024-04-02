import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MonthPickerInput } from '@mantine/dates';

export default function PickDateRange(){
    const [value, setValue] = useState<Date | null, Date | null]>([null,null]);

    // set minimum allowed date as August 2022
    const minDate = new Date(2022, 7) // months are zero-based

    return (
        <MonthPickerInput 
            type = "range"
            // label = "Select start date" // bolded text above
            placeholder = "Select date range" // grey text in box, temporary
            value = {value}
            minDate = {minDate}
            onChange = {setValue}
            />
    );
    
}
