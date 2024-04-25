import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateFilter.css'

const DateFilter = ({onDateRangeChange}) => {
  const [open, setOpen] = useState(false)
  const refOne = useRef(null)
  // Date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -90),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  useEffect(() => {
    // Event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // Hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  // Handle date range change and pass to parent component
  const handleDateRangeChange = (item) => {
    setRange([item.selection]); // Update the range state with the selected date range
    onDateRangeChange(item.selection); // Pass the selected date range to the parent component
  };

  return (
    <div className="calendarWrap">
      <input
        style = {{backgroundColor: '#444557', color: "white", borderColor: '#444557', fontSize: '19px'}}
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
            months={1}
            direction="horizontal"
            className="calendarElement"
            staticRanges={[]}
            inputRanges={[]}
            showSelectionPreview={false} // Hide the sidebar
            minDate = {dayjs('2022-01-01').toDate()} // GXS only has data from 2022 onwards
            maxDate = {dayjs(new Date()).endOf('month').toDate()}
          />
        }
      </div>
    </div>
  )
}

export default DateFilter;
