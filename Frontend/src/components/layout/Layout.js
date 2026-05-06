import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

export default function Layout({ children, showSidebar = false, showFooter = true }) {
  const { user } = useAuth();
  const hasSidebar = showSidebar && user;

  return (
    <div className="layout">
      <Navbar />
      <div className={`layout-body ${hasSidebar ? 'with-sidebar' : ''}`}>
        {hasSidebar && <Sidebar />}
        <main className="layout-main">{children}</main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}
