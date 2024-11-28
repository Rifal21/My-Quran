import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const AllHadits = () => {
  const [doas, setDoas] = useState([]);
  const [filteredDoas, setFilteredDoas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State untuk animasi loading
  const navigate = useNavigate();  // Untuk navigasi kembali ke halaman utama

  // Fungsi untuk mengambil data doa dari API
  useEffect(() => {
    const fetchDoas = async () => {
      try {
        const response = await fetch('https://muslim-kw1a9fkth-diki-zulkarnaens-projects.vercel.app/hadits');
        const data = await response.json();
        setDoas(data.data); // Simpan data API ke state
        setFilteredDoas(data.data); // Inisialisasi data yang difilter
      } catch (error) {
        console.error('Error fetching doas:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah data diambil
      }
    };

    fetchDoas();
  }, []);

  // Filter doa berdasarkan input pencarian
  useEffect(() => {
    let filtered = doas;
    if (searchTerm) {
      filtered = filtered.filter((doa) =>
        doa.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doa.indo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDoas(filtered);
  }, [searchTerm, doas]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/img/masjid.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <div className="loader border-t-4 border-white border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/masjid.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 p-8 w-full max-w-4xl mx-auto text-white border-2 border-white rounded-lg bg-black bg-opacity-30 h-[95vh] flex flex-col">
        
        {/* Navigasi ke Halaman Utama */}
        <button
          onClick={() => navigate('/')}
          className="absolute md:top-10 md:left-7 top-5 left-5 text-2xl text-white hover:text-gray-300 transition"
        >
          <AiOutlineHome />
        </button>

        {/* Judul Halaman */}
        <h1 className="md:text-4xl text-3xl font-bold text-center mb-3 md:mt-0 mt-5">
          Kumpulan Hadits Arbain Nawawi
        </h1>

        {/* Input Pencarian */}
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Cari Hadits..."
            className="w-full p-2 bg-transparent border-b-2 border-white text-white focus:outline-none placeholder-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          <div className="flex-1 overflow-y-auto scrollbar-hidden">
            {filteredDoas.map((doa, index) => (
              <div
                key={index}
                className="border-2 border-white text-white px-6 py-4 mb-2 rounded-md bg-black bg-opacity-60 hover:bg-white hover:text-black transition cursor-pointer"
              >
                <h2 className="text-lg font-bold mb-2">{doa.judul}</h2>
                <p className="text-sm capitalize mb-2">No: {doa.no}</p>
                <p className="text-3xl font-serif mb-3 text-end">{doa.arab}</p>
                <p className="text-md mb-2">Artinya: {doa.indo}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default AllHadits;
