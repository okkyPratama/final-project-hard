import { useState } from 'react'
import PropTypes from 'prop-types'
import career from '../assets/career.png'

export const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleReset = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="relative h-[500px] flex items-center justify-center" style={{
      backgroundImage: `url(${career})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-xl mb-8">Discover thousands of job opportunities with all the information you need.</p>
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jobs..."
              className="p-3 w-full rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-r-xl hover:bg-blue-800 transition duration-300">
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

Hero.propTypes = {
  onSearch: PropTypes.func.isRequired,
}