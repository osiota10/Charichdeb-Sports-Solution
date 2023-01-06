import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import './main.css'
import HomePage from './components/pages/Home';
import ContactPage from './components/pages/Contact';
import EventPage from './components/pages/Events';
import ServicesPage from './components/pages/Services';
import AboutPage from './components/pages/About';
import AthletesPage from './components/pages/Athletes';
import Layout from './components/pages/layout';
import NoPage from './components/pages/NoPage';
import EventDetail from './components/detailedPages/EventDetail';
import AthleteDetailModal from './components/detailedPages/athleteDetail';
import PrivacyPolicy from './components/pages/privacyPolicy';
import TermsAndConditions from './components/pages/termsAndConditions';


export const ServiceContext = createContext(null)
export const EventContext = createContext(null)
export const AthleteContext = createContext(null)
export const TestimoninailContext = createContext(null)
export const WorkProcessContext = createContext(null)
export const CompanyInformationContext = createContext(null)

function App() {
  const [service, setService] = useState([]);
  const [event, setEvent] = useState([]);
  const [athlete, setAthlete] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [workprocess, setWorkProcess] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);

  useEffect(() => {
    //Service
    axios.get(`http://127.0.0.1:8000/services`)
      .then(res => {
        setService(res.data)
      })

    // Events
    axios.get(`http://127.0.0.1:8000/events`)
      .then(res => {
        setEvent(res.data)
      })

    // Athletes
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        setAthlete(res.data)
      })

    // Testimonials
    axios.get(`http://127.0.0.1:8000/testimonials`)
      .then(res => {
        setTestimonial(res.data)
      })

    // Work Process
    axios.get(`http://127.0.0.1:8000/work-process`)
      .then(res => {
        setWorkProcess(res.data)
      })

    // Company Information
    axios.get(`http://127.0.0.1:8000/company-information/1`)
      .then(res => {
        setCompanyInfo(res.data)
      })
  }, []);

  return (
    <div>
      <ServiceContext.Provider value={service}>
        <EventContext.Provider value={event}>
          <AthleteContext.Provider value={athlete}>
            <TestimoninailContext.Provider value={testimonial}>
              <WorkProcessContext.Provider value={workprocess}>
                <CompanyInformationContext.Provider value={companyInfo}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="services" element={<ServicesPage />} />
                        <Route path="events" element={<EventPage />} />
                        <Route path="events/:slug" element={<EventDetail />} />
                        <Route path="athletes" element={<AthletesPage />} />
                        <Route path="athletes/:id" element={<AthleteDetailModal />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="*" element={<NoPage />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </CompanyInformationContext.Provider>
              </WorkProcessContext.Provider>
            </TestimoninailContext.Provider>
          </AthleteContext.Provider>
        </EventContext.Provider>
      </ServiceContext.Provider>
    </div>
  );
}

export default App;