import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
    {/* <div className="fullscreen"> */}
      <App />
    {/* </div> */}
    </MantineProvider>
)

