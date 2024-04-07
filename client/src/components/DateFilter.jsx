import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateFilter.css'

const DateFilter = ({onDateRangeChange}) => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -90),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

    // Handle date range change and pass to parent component
    const handleDateRangeChange = (item) => {
      setRange([item.selection]); // Update the range state with the selected date range
      onDateRangeChange(item.selection); // Pass the selected date range to the parent component
    ;

    };

    // // save updated date range into variable
    // const updatedDateRange = range[0]; // in day mon dd yyyy hh:mm:ss format
    // console.log(updatedDateRange);
    // const newStartDate = updatedDateRange.startDate;
    // const newEndDate = updatedDateRange.endDate;

    // // change format of start and end date
    // const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
    // const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});

    return (
      <div className="calendarWrap">
        
        <input
          value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
          readOnly
          className="inputBox"
          onClick={ () => setOpen(open => !open) }
        />

        <div ref={refOne}>
          {open && 
            <DateRangePicker
              onChange={handleDateRangeChange}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={2}
              direction="horizontal"
              className="calendarElement"
              staticRanges={[]}
              inputRanges={[]}
              showSelectionPreview={false} // Hide the sidebar
              
            />
          }
        </div>

      </div>
    )
  }

export default DateFilter;
