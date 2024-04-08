
import React, { useState, useEffect  } from 'react'
import './App.css'
import { AppShell } from '@mantine/core';
import Overview from './Overview';
import NewProductReviews from './NewProductReviews';
import Comparison from './Comparison.jsx';
import { Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderSimple } from './HeaderSimple.jsx';
import NavbarTooltip from './components/NavbarTooltip.jsx'
import { addDays } from 'date-fns'

function App() {
  //const [activeTab, setActiveTab] = useState(0); // Set the default tab to 'Overview'
  const [activeHeaderTab, setActiveHeaderTab] = useState('Overview'); //change this to 'Overview' when Overview is done! 
  const [opened, { toggle }] = useDisclosure();
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit?')) {
      window.close(); // Close the current window/tab if the user confirms
    }
  };

  // Refresh to current tab
  // Load the active tab from local storage on component mount
  useEffect(() => {
    //const savedActiveTab = localStorage.getItem('activeTab');
    const savedActiveHeaderTab = localStorage.getItem('activeHeaderTab');
    if (savedActiveHeaderTab) {
      //setActiveTab(Number(savedActiveTab));
      setActiveHeaderTab(savedActiveHeaderTab);
    } 
  }, []);

  // Update local storage when the active tab changes
  useEffect(() => {
    //localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('activeHeaderTab', activeHeaderTab);
  }, [activeHeaderTab]);

  //Set state for Date Filter across all pages
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: addDays(new Date(), -90),
    endDate: new Date(),
    key: 'selection'
  });

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <AppShell
      // controls the actual height of them
      header={{ height: 60}} 
      navbar={{ width: 70, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {/* HeaderSimple will have a component inside which will change date range. handleDateRangeChange will update to the new DateRange */}
            <HeaderSimple onDateRangeChange={handleDateRangeChange}  />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar style={{ backgroundColor: '#F8F8FF'}} >
        <NavbarTooltip setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} onExitClick={handleExit} />
      </AppShell.Navbar>

      <AppShell.Main className="fullscreen-main">
        {/* style={{ width: '100%', height: '100%', overflow: 'auto' }} */}
        {activeHeaderTab === 'Overview' && <Overview selectedDateRange={selectedDateRange}/>}
        {activeHeaderTab === 'Product Reviews' && <NewProductReviews/>}
        {activeHeaderTab === 'Comparison' && <Comparison selectedDateRange={selectedDateRange}/>}
      </AppShell.Main>
    </AppShell>
  );

    
}

export default App;
