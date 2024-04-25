import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
)

