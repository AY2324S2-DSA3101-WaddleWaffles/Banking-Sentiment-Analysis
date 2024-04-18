
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
  const [activeHeaderTab, setActiveHeaderTab] = useState('Overview'); 
  const [opened, { toggle }] = useDisclosure();

  //TODO decide if needed later
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
    const savedDateRange = JSON.parse(localStorage.getItem('selectedDateRange'));
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




  // handle database refresh
  const [refreshFlag, setRefreshFlag] = useState(false);

  
  const handleRefresh = async() => {
    try {
        // make API request to refresh database
        //await axios.get(apiEndpoint); //change to link
        
        console.log("Refreshed")

        setRefreshFlag(!refreshFlag);
      } catch (error){
          // handle error
          console.error('Error refreshing data:', error);
      } 
      };


  return (
    <AppShell
      // controls the actual height of them
      header={{ height: 60}} 
      navbar={{ width: 70, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{display: "flex", backgroundColor: '#37384a', borderColor:'#37384a'}}>
        {/* <Group h="100%" px="md"> */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* HeaderSimple will have a component inside which will change date range. handleDateRangeChange will update to the new DateRange */}
          <HeaderSimple onDateRangeChange={handleDateRangeChange} onRefresh={handleRefresh}  />
        {/* </Group> */}
      </AppShell.Header>
      
      <AppShell.Navbar style={{ backgroundColor: '#2b3141', borderColor:'#2b3141' }} >
        <NavbarTooltip setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} onExitClick={handleExit} />
      </AppShell.Navbar>

      <AppShell.Main className="fullscreen-main">
        {/* style={{ width: '100%', height: '100%', overflow: 'auto' }} */}
        {activeHeaderTab === 'Overview' && <Overview selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>}
        {activeHeaderTab === 'Product Reviews' && <NewProductReviews selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>}
        {activeHeaderTab === 'Comparison' && <Comparison selectedDateRange={selectedDateRange} refreshFlag={refreshFlag} />}
        
      </AppShell.Main>
    </AppShell>
  );

    
}

export default App;
