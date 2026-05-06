import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobs, applyForJob, getMyApplications } from '../../api/jobApi';
import Layout from '../../components/layout/Layout';
import JobCard from '../../components/cards/JobCard';
import JobFilter from '../../components/filters/JobFilter';
import SearchBar from '../../components/filters/SearchBar';
import { Loader, Pagination } from '../../components/common/index.js';
import './Candidate.css';

const PAGE_SIZE = 8;

export default function BrowseJobs() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState({ query: searchParams.get('q') || '', location: '' });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [jobRes, appRes] = await Promise.all([getJobs(), getMyApplications()]);
      setJobs(jobRes.data || []);
      setAppliedIds(new Set((appRes.data || []).map(a => a.jobId)));
    } catch {
      setMsg({ text: 'Failed to load jobs.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId);
      setAppliedIds(prev => new Set([...prev, jobId]));
      setMsg({ text: '🎉 Applied successfully!', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch (e) {
      const errMsg = e.response?.data?.message || 'Already applied or something went wrong.';
      setMsg({ text: errMsg, type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    }
  };

  const handleSearch = ({ query, location }) => {
    setSearch({ query, location });
    setPage(1);
  };

  // Filter jobs
  const filtered = jobs.filter(job => {
    const q = search.query.toLowerCase();
    const loc = search.location.toLowerCase();
    const matchQ = !q || job.title?.toLowerCase().includes(q)
      || job.requiredSkills?.toLowerCase().includes(q)
      || job.description?.toLowerCase().includes(q);
    const matchLoc = !loc || job.location?.toLowerCase().includes(loc);
    const matchType = !filters.jobType?.length || filters.jobType.includes(job.jobType);
    return matchQ && matchLoc && matchType;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout showSidebar={true} showFooter={false}>
      <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>
            Browse Jobs
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            {filtered.length} jobs found
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {msg.text && (
          <div className={`alert alert-${msg.type === 'success' ? 'success' : 'error'}`} style={{ marginTop: 16 }}>
            {msg.text}
          </div>
        )}

        <div style={{ display: 'flex', gap: 24, marginTop: 24, alignItems: 'flex-start' }}>
          <JobFilter onFilter={setFilters} />

          <div style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <Loader text="Fetching jobs..." />
            ) : paginated.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--color-text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
                <p style={{ fontWeight: 600 }}>No jobs found</p>
                <p style={{ fontSize: '0.875rem', marginTop: 4 }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {paginated.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      applied={appliedIds.has(job.id)}
                      showApply={true}
                    />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
