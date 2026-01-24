import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { AppThemeProvider } from './theme/AppThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import './index.css';

// Placeholder components
const Dashboard = () => <h1>Dashboard Home</h1>;
const UsersPage = () => <h1>Users Management</h1>;
const ActiveTests = () => <h1>Active Tests</h1>;
const ArchivedTests = () => <h1>Archived Tests</h1>;
const Login = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><h1>Login Page</h1></div>;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="users" element={<UsersPage />} />
                            <Route path="tests/active" element={<ActiveTests />} />
                            <Route path="tests/archived" element={<ArchivedTests />} />
                            {/* Fallback */}
                            <Route path="*" element={<h1>404 Not Found</h1>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppThemeProvider>
        </Provider>
    </React.StrictMode>,
);
