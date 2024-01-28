import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css'
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient, QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />      
      </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
