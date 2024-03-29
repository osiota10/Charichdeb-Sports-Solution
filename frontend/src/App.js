import React, { useState, createContext, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import './main.css'
import HomePage from './components/pages/Home';
import ContactPage from './components/pages/Contact';
// import EventPage from './components/pages/Events';
import ServicesPage from './components/pages/Services';
import AboutPage from './components/pages/About';
import AthletesPage from './components/pages/Athletes';
import Layout from './components/pages/layout';
import NoPage from './components/pages/NoPage';
// import EventDetail from './components/detailedPages/EventDetail';
import AthleteDetailModal from './components/detailedPages/athleteDetail';
import PrivacyPolicy from './components/pages/privacyPolicy';
import TermsAndConditions from './components/pages/termsAndConditions';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import { Provider } from 'react-redux';
import store from './store';
import ResetPasswordConfirm from './components/auth/passwordResetConfirm';
import ResetPassword from './components/auth/resetPassword';
import DashboardLayout from './components/dashboard/layout';
import DashboardHome from './components/dashboard';
import EditProfile from './components/dashboard/editProfile';
import Activate from './components/auth/activate';
import Testimonials from './components/pages/testimonials';
import TestimonialDashboard from './components/dashboard/testimonials';
import ScrollToTop from './components/dashboard/components/scrollUp';

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


  useLayoutEffect(() => {
    //Service
    axios.get(`${process.env.REACT_APP_API_URL}/services`)
      .then(res => {
        setService(res.data)
      })

    // Events
    axios.get(`${process.env.REACT_APP_API_URL}/events`)
      .then(res => {
        setEvent(res.data)
      })

    // Athletes
    axios.get(`${process.env.REACT_APP_API_URL}/featured-athletes`)
      .then(res => {
        setAthlete(res.data)
      })

    // Testimonials
    axios.get(`${process.env.REACT_APP_API_URL}/testimonials`)
      .then(res => {
        setTestimonial(res.data)
      })

    // Work Process
    axios.get(`${process.env.REACT_APP_API_URL}/work-process`)
      .then(res => {
        setWorkProcess(res.data)
      })

    // Company Information
    axios.get(`${process.env.REACT_APP_API_URL}/company-information/1`)
      .then(res => {
        setCompanyInfo(res.data)
      })

  }, []);

  return (
    <div>
      <Provider store={store}>
        <ServiceContext.Provider value={service}>
          <EventContext.Provider value={event}>
            <AthleteContext.Provider value={athlete}>
              <TestimoninailContext.Provider value={testimonial}>
                <WorkProcessContext.Provider value={workprocess}>
                  <CompanyInformationContext.Provider value={companyInfo}>
                    <BrowserRouter>
                      <ScrollToTop />
                      <Routes>
                        <Route path="/" element={<Layout />}>
                          <Route index element={<HomePage />} />
                          <Route path="about" element={<AboutPage />} />
                          <Route path="services" element={<ServicesPage />} />
                          <Route path="testimonials" element={<Testimonials />} />
                          {/* <Route path="events" element={<EventPage />} /> */}
                          {/* <Route path="events/:slug" element={<EventDetail />} /> */}
                          <Route path="athletes" element={<AthletesPage />} />
                          <Route path="athletes/:id" element={<AthleteDetailModal />} />
                          <Route path="contact" element={<ContactPage />} />
                          <Route path="privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                          <Route path="*" element={<NoPage />} />
                        </Route>

                        <Route>
                          <Route path='/login' element={<Login />} />
                          <Route path='/signup' element={<SignUp />} />
                          <Route path='/reset-password' element={<ResetPassword />} />
                          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
                          <Route path='/activate/:uid/:token' element={<Activate />} />
                        </Route>

                        <Route path="/dashboard" element={<DashboardLayout />}>
                          <Route index element={<DashboardHome />} />
                          <Route path="/dashboard/edit-profile" element={<EditProfile />} />
                          <Route path="/dashboard/testimonials" element={<TestimonialDashboard />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </CompanyInformationContext.Provider>
                </WorkProcessContext.Provider>
              </TestimoninailContext.Provider>
            </AthleteContext.Provider>
          </EventContext.Provider>
        </ServiceContext.Provider>
      </Provider>
    </div>
  );
}

export default App;


