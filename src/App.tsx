import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { AuthProvider, useAuth } from './contexts/AuthContext';
    import Navbar from './components/Navbar';
    import Login from './pages/Login';
    import Dashboard from './pages/Dashboard';

    function PrivateRoute({ children }: { children: React.ReactNode }) {
      const { user } = useAuth();
      return user ? <>{children}</> : <Navigate to="/login" />;
    }

    function App() {
      return (
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      );
    }

    export default App;
