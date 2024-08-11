import about from '../assets/about.png';
import { Footer } from '../components/Footer';

export const About = () => {
  return (
    <div>
      <div className="relative h-[500px] flex items-center justify-center" style={{
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl mb-8">Connecting talent with opportunity, were reshaping the future of work.</p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            To be the leading platform that revolutionizes how people find meaningful work and how businesses discover exceptional talent, fostering a world where everyone can achieve their professional aspirations.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            We are committed to empowering job seekers and employers by providing innovative tools, insightful resources, and a user-friendly platform that simplifies the job search and recruitment process, ultimately contributing to the growth and success of individuals and organizations alike.
          </p>
        </div>
      </section>
      <Footer />
    </div>

    
  );
};