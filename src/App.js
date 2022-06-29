import SignUp from './components/SignUp';
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import NotFound from './components/NotFound';
import { Container, Navbar } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComingSoon from './components/ComingSoon';
import useWindowDimensions from './WindowDimensions';

function App() {
  const { height, width } = useWindowDimensions();

  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: height }}
    >
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
    </Container>
);
}

export default App;