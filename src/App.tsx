import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react"
import { BookingProvider } from './context/BookingContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StandardCleaning } from './pages/services/StandardCleaning';
import { AirbnbTurnover } from './pages/services/AirbnbTurnover';
import { DeepCleaning } from './pages/services/DeepCleaning';
import { ApplianceCleaning } from './pages/services/ApplianceCleaning';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CustomerPortal } from './pages/CustomerPortal';
import { AIAssistant } from './components/AIAssistant';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <BookingProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services/standard" element={<StandardCleaning />} />
              <Route path="/services/airbnb" element={<AirbnbTurnover />} />
              <Route path="/services/deep-clean" element={<DeepCleaning />} />
              <Route path="/services/appliance" element={<ApplianceCleaning />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/portal" element={<CustomerPortal />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <AIAssistant />
            <Analytics />
          </Layout>
        </BookingProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
