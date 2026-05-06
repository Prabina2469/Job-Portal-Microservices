import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout showSidebar={false}>
      <div style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '60px 24px'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>🔍</div>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900, color: 'var(--color-border)', lineHeight: 1, marginBottom: 16
        }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
          Page not found
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: 360, marginBottom: 32 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/')}>← Go Home</button>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </Layout>
  );
}
