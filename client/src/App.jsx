
import React, { useState, useEffect  } from 'react'
import './App.css'
import { AppShell } from '@mantine/core';
import Overview from './Overview';
import NewProductReviews from './NewProductReviews';
import Comparison from './Comparison.jsx';
import { Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderSimple } from './HeaderSimple.jsx';
import NavbarTooltip from './NavbarTooltip.jsx'
import { addDays } from 'date-fns'

function App() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('Overview'); 
  const [opened, { toggle }] = useDisclosure();
  const [refreshFlag, setRefreshFlag] = useState(false);  // Handle database refresh

  // Refresh to current tab
  // Load the active tab from local storage on component mount
  useEffect(() => {
    const savedActiveHeaderTab = localStorage.getItem('activeHeaderTab');
    if (savedActiveHeaderTab) {
      setActiveHeaderTab(savedActiveHeaderTab);
    } 
  }, []);

  // Update local storage when the active tab changes
  useEffect(() => {
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

  const handleRefresh = async() => {
    try {
        setRefreshFlag(!refreshFlag);
      } catch (error){
        console.error('Error refreshing data:', error);
      } 
    };

  return (
    <AppShell
      header={{ height: 60}} 
      navbar={{ width: 70, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{display: "flex", backgroundColor: '#37384a', borderColor:'#37384a'}}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <HeaderSimple onDateRangeChange={handleDateRangeChange} onRefresh={handleRefresh}  />
      </AppShell.Header>
      
      <AppShell.Navbar style={{ backgroundColor: '#2b3141', borderColor:'#2b3141' }} >
        <NavbarTooltip setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab}/>
      </AppShell.Navbar>

      <AppShell.Main className="fullscreen-main">
        {activeHeaderTab === 'Overview' && <Overview selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>}
        {activeHeaderTab === 'Product Reviews' && <NewProductReviews selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>}
        {activeHeaderTab === 'Comparison' && <Comparison selectedDateRange={selectedDateRange} refreshFlag={refreshFlag} />}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
