import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';

const AllDoa = () => {
  const [doas, setDoas] = useState([]);
  const [filteredDoas, setFilteredDoas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  // For navigation back to home

  // Function to fetch prayer data from the API
  useEffect(() => {
    const fetchDoas = async () => {
      try {
        const response = await fetch('https://doa-doa-api-ahmadramadhan.fly.dev/api');
        const data = await response.json();
        setDoas(data); // Store API data in state
        setFilteredDoas(data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching doas:', error);
      }
    };

    fetchDoas();
  }, []);

  // Filter prayers based on search input
  useEffect(() => {
    const filtered = doas.filter((doa) =>
      doa.doa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoas(filtered);
  }, [searchTerm, doas]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/masjid.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 p-8 w-full max-w-4xl mx-auto text-white border-2 border-white rounded-lg bg-black bg-opacity-30 h-[80vh] flex flex-col">
        
        {/* Navigation to Home */}
        <button
          onClick={() => navigate('/')}
          className="absolute md:top-10 md:left-7 top-5 left-5 text-2xl text-white hover:text-gray-300 transition"
        >
          <AiOutlineHome />
        </button>

        {/* Title */}
        <h1 className="md:text-4xl text-3xl font-bold text-center mb-3 md:mt-0 mt-5">
          Kumpulan Doa Harian
        </h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari Doa..."
            className="w-full p-2 bg-transparent border-b-2 border-white text-white focus:outline-none placeholder-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Doa List with Scroll */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          {filteredDoas.map((doa) => (
            <div
              key={doa.id}
              className="border-2 border-white text-white px-6 py-4 mb-2 rounded-md bg-black bg-opacity-60"
            >
              <h2 className="text-xl font-bold mb-2">{doa.doa}</h2>
              <p className="text-lg italic mb-2">{doa.ayat}</p>
              <p className="text-md mb-2">Latin: {doa.latin}</p>
              <p className="text-md">Artinya: {doa.artinya}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDoa;
