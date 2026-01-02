import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { AIAssistant } from './components/AIAssistant';

function App() {
  return (
    <Router>
      <BookingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <AIAssistant />
        </Layout>
      </BookingProvider>
    </Router>
  );
}

export default App;
