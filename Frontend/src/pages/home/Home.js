import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/home/HeroSection';
import { Categories, TopCompanies, HowItWorks } from '../../components/home/Sections';

export default function Home() {
  return (
    <Layout showSidebar={false}>
      <HeroSection />
      <Categories />
      <HowItWorks />
      <TopCompanies />
    </Layout>
  );
}
