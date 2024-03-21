import React, { useState, useEffect  } from 'react'
import './App.css'
import { AppShell } from '@mantine/core';
import { NavbarMinimal } from './navbar';
import Statistics from './statistics';
import ProductReviews from './ProductReviews';

function App() {
  const [activeTab, setActiveTab] = useState(0); // Set the default tab to 'Dashboard'
  const [activeHeaderTab, setActiveHeaderTab] = useState('Dashboard'); 
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit?')) {
      window.close(); // Close the current window/tab if the user confirms
    }
  };

  // Refresh to current tab
  // Load the active tab from local storage on component mount
  useEffect(() => {
    const savedActiveTab = localStorage.getItem('activeTab');
    const savedActiveHeaderTab = localStorage.getItem('activeHeaderTab');
    if (savedActiveTab && savedActiveHeaderTab) {
      setActiveTab(Number(savedActiveTab));
      setActiveHeaderTab(savedActiveHeaderTab);
    } 
  }, []);

  // Update local storage when the active tab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('activeHeaderTab', activeHeaderTab);
  }, [activeTab, activeHeaderTab]);



  return (
    <AppShell navbar={{ width: 200, breakpoint: 'lg' }} padding="lg">
      <AppShell.Main>
        <Statistics />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
