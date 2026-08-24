import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Sambutan from './pages/Sambutan';
import Prestasi from './pages/Prestasi';
import Ekstrakurikuler from './pages/Ekstrakurikuler';
import EkstrakurikulerDetail from './pages/EkstrakurikulerDetail';
import Fasilitas from './pages/Fasilitas';
import FasilitasDetail from './pages/FasilitasDetail';
import GuruTendik from './pages/GuruTendik';
import TataTertib from './pages/TataTertib';
import ProgramUnggulan from './pages/ProgramUnggulan';
import Komite from './pages/Komite';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfilSekolah from './pages/admin/AdminProfilSekolah';
import AdminSambutan from './pages/admin/AdminSambutan';
import AdminStatistik from './pages/admin/AdminStatistik';
import AdminPrestasi from './pages/admin/AdminPrestasi';
import AdminEkstrakurikuler from './pages/admin/AdminEkstrakurikuler';
import AdminFasilitas from './pages/admin/AdminFasilitas';
import AdminGuruTendik from './pages/admin/AdminGuruTendik';
import AdminMisiStruktur from './pages/admin/AdminMisiStruktur';
import AdminSosialMedia from './pages/admin/AdminSosialMedia';
import AdminTataTertib from './pages/admin/AdminTataTertib';
import AdminProgramUnggulan from './pages/admin/AdminProgramUnggulan';
import AdminKomite from './pages/admin/AdminKomite';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/profil" element={<PublicLayout><Profil /></PublicLayout>} />
      <Route path="/sambutan" element={<PublicLayout><Sambutan /></PublicLayout>} />
      <Route path="/prestasi" element={<PublicLayout><Prestasi /></PublicLayout>} />
      <Route path="/ekstrakurikuler" element={<PublicLayout><Ekstrakurikuler /></PublicLayout>} />
      <Route path="/ekstrakurikuler/:id" element={<PublicLayout><EkstrakurikulerDetail /></PublicLayout>} />
      <Route path="/fasilitas" element={<PublicLayout><Fasilitas /></PublicLayout>} />
      <Route path="/fasilitas/:id" element={<PublicLayout><FasilitasDetail /></PublicLayout>} />
      <Route path="/guru-tendik" element={<PublicLayout><GuruTendik /></PublicLayout>} />
      <Route path="/program-unggulan" element={<PublicLayout><ProgramUnggulan /></PublicLayout>} />
      <Route path="/tata-tertib" element={<PublicLayout><TataTertib /></PublicLayout>} />
      <Route path="/komite" element={<PublicLayout><Komite /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="profil-sekolah" element={<AdminProfilSekolah />} />
        <Route path="sambutan" element={<AdminSambutan />} />
        <Route path="statistik" element={<AdminStatistik />} />
        <Route path="prestasi" element={<AdminPrestasi />} />
        <Route path="ekstrakurikuler" element={<AdminEkstrakurikuler />} />
        <Route path="fasilitas" element={<AdminFasilitas />} />
        <Route path="guru-tendik" element={<AdminGuruTendik />} />
        <Route path="misi-struktur" element={<AdminMisiStruktur />} />
        <Route path="sosial-media" element={<AdminSosialMedia />} />
        <Route path="tata-tertib" element={<AdminTataTertib />} />
        <Route path="program-unggulan" element={<AdminProgramUnggulan />} />
        <Route path="komite" element={<AdminKomite />} />
      </Route>
    </Routes>
  );
}
