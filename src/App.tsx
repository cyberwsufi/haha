import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Students } from './pages/Students';
import { Clubs } from './pages/Clubs';
import { Events } from './pages/Events';
import { StudentProfile } from './pages/StudentProfile';
import { Dashboard } from './pages/Dashboard';
import { Messages } from './pages/Messages';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="students" element={<Students />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="events" element={<Events />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
