import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import Registration from "./pages/Registration";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CreateEvent from "./pages/CreateEvent";
import TicketsPage from "./pages/TicketsPage";
import CommunityPage from "./pages/CommunityPage";
import Participants from "./pages/Participants";
import YourEvents from "./pages/YourEvents";
import InsightPage from "./pages/InsightPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="Registration" element={<Registration />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="insight" element={<InsightPage />} />

          <Route path="event/:eventId" element={<EventDetailsPage />} />

          <Route path="tickets" element={<TicketsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="participants" element={<Participants />} />
          <Route path="your-events" element={<YourEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
