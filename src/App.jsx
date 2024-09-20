import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgetPassword from './components/pages/ForgetPassword';
import ResetPassword from './components/pages/ResetPassword';
import AuthPage from './components/pages/AuthPage';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import ProtectedRoute from './components/pages/ProtectedRoute';
import EventList from './components/events/EventList';
import TicketList from './components/tickets/TicketList';
import UserList from './components/users/UserList';
import EventForm from './components/events/EventForm';
import EventDetails from './components/events/EventDetails';
import EventSchedule from './components/events/EventSchedule';
import EventAnalytics from './components/events/EventAnalytics';
import AttendeesList from './components/events/AttendeesList';
import CreateTicket from './components/tickets/CreateTicket';
import PurchasedTickets from './components/tickets/PurchasedTickets';
import PurchaseTicket from './components/tickets/PurchaseTicket';
import UserProfile from './components/users/UserProfile';
import ProfileForm from './components/users/ProfileForm';
import PaymentSuccess from './components/tickets/PaymentSuccess';
import PaymentFailure from './components/tickets/PaymentFailure';
import TransferTicket from './components/tickets/TransferTicket';
import CancelTicket from './components/tickets/CancelTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<AuthPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/auth' element={<AuthPage />} />

        <Route path='/userdashboard' element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }/>

        <Route path='/admindashboard' element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }/>

        <Route path='/events' element={
          <ProtectedRoute>
            <EventList />
          </ProtectedRoute>
        }/>
        <Route path="/events/new" element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        }/>
        <Route path="/events/:id/edit" element={
          <ProtectedRoute>
            <EventForm />
          </ProtectedRoute>
        }/>
        <Route path="/events/:id" element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }/>
        <Route path="/events/:id/schedule" element={
          <ProtectedRoute>
            <EventSchedule />
          </ProtectedRoute>
        }/>
        <Route path="/events/:id/analytics" element={
          <ProtectedRoute>
            <EventAnalytics />
          </ProtectedRoute>
        }/>
        <Route path="/events/:id/attendees" element={
          <ProtectedRoute>
            <AttendeesList />
          </ProtectedRoute>
        }/>

        <Route path='/tickets' element={
          <ProtectedRoute>
            <TicketList />
          </ProtectedRoute>
        }/>
        <Route path='/createticket' element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        }/>
        <Route path='/purchaseticket' element={
          <ProtectedRoute>
            <PurchaseTicket />
          </ProtectedRoute>
        }/>
        <Route path='/purchasedticket' element={
          <ProtectedRoute>
            <PurchasedTickets />
          </ProtectedRoute>
        }/>
        <Route path='/paymentsuccess' element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }/>
        <Route path='/paymentfailure' element={
          <ProtectedRoute>
            <PaymentFailure />
          </ProtectedRoute>
        }/>
        <Route path='/cancelticket/:id' element={
          <ProtectedRoute>
            <CancelTicket />
          </ProtectedRoute>
        }/>
        <Route path='/transferticket/:id' element={
          <ProtectedRoute>
            <TransferTicket />
          </ProtectedRoute>
        }/>
        <Route path='/users' element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }/>
        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
