import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { MoveOutCleaning } from './pages/services/MoveOutCleaning';
import { AirbnbTurnover } from './pages/services/AirbnbTurnover';
import { DeepCleaning } from './pages/services/DeepCleaning';
import { ApplianceCleaning } from './pages/services/ApplianceCleaning';
import { AIAssistant } from './components/AIAssistant';

function App() {
  return (
    <Router>
      <BookingProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/move-out" element={<MoveOutCleaning />} />
            <Route path="/services/airbnb" element={<AirbnbTurnover />} />
            <Route path="/services/deep-clean" element={<DeepCleaning />} />
            <Route path="/services/appliance" element={<ApplianceCleaning />} />
          </Routes>
          <AIAssistant />
        </Layout>
      </BookingProvider>
    </Router>
  );
}

export default App;
