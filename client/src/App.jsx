import React, { useState, useEffect  } from 'react'
import './App.css'
import { AppShell } from '@mantine/core';
import { NavbarMinimal } from './navbar.jsx';
import Statistics from './statistics';
import ProductReviews from './ProductReviews';
import { Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderSimple } from './HeaderSimple.jsx';


function App() {
  //const [activeTab, setActiveTab] = useState(0); // Set the default tab to 'Dashboard'
  const [activeHeaderTab, setActiveHeaderTab] = useState('Statistics'); 
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



  return (
    <AppShell
      // THE ONE CONTROLLING HEADER HEIGHT
      header={{ height: 50}} 
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        {/* <Group h="100%" px="md"> */}
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
            <HeaderSimple setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} onExitClick={handleExit} />
        {/* </Group> */}
      </AppShell.Header>

      <AppShell.Main style={{ width: '100%', height: "100%"}}>
        {activeHeaderTab === 'Statistics' && <Statistics />}
        {activeHeaderTab === 'Product Reviews' && <ProductReviews/>}
      </AppShell.Main>
    </AppShell>
  );

    
}

export default App;
