import { useState } from 'react';
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { JobList } from "../components/JobList";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />
        <JobList searchTerm={searchTerm} />
      </main>
      <Footer />
    </div>
  );
};