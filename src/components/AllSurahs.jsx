import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';

const AllSurahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // Untuk mengontrol dropdown
  const [showSearch, setShowSearch] = useState(false); // Untuk kontrol input pencarian
  const navigate = useNavigate();  // Untuk navigasi kembali ke home

  // Fungsi untuk kembali ke halaman home
  const goHome = () => {
    navigate('/');  // Mengarahkan ke root '/'
  };

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://quran-api-id.vercel.app/surahs');
        const data = await response.json();
        setSurahs(data);
        setFilteredSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    };

    fetchSurahs();
  }, []);

  // Filter berdasarkan search dan tipe wahyu
  useEffect(() => {
    let updatedSurahs = surahs;

    if (filterType !== 'all') {
      updatedSurahs = updatedSurahs.filter((surah) => surah.revelation === filterType);
    }

    if (searchTerm) {
      updatedSurahs = updatedSurahs.filter((surah) =>
        surah.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSurahs(updatedSurahs);
  }, [searchTerm, filterType, surahs]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/masjid.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 p-8 w-full max-w-4xl mx-auto text-white border-2 border-white rounded-lg bg-black bg-opacity-30 h-[80vh] flex flex-col">
        <button
          onClick={goHome}
          className="absolute md:top-10 md:left-7 top-5 left-5 text-2xl text-white hover:text-gray-300 transition"
        >
          <AiOutlineHome className="text-2xl" />
        </button>
        <h1 className="md:text-4xl text-3xl font-bold text-center mb-3 md:mt-0 mt-5">Seluruh Surat dalam Al-Qur'an</h1>

        {/* Form Pencarian dan Filter */}
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          {/* Tombol Search dengan Icon Kaca Pembesar */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 bg-transparent text-white  flex items-center gap-2"
          >
            <AiOutlineSearch className="text-xl" />
            {showSearch ? (
              <input
                type="text"
                placeholder="Cari Surah..."
                className="w-full p-2 bg-transparent border-b-2 border-white text-white focus:outline-none placeholder-white transition-all duration-500 transform ease-in-out"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  maxWidth: showSearch ? '100%' : '0',
                  opacity: showSearch ? 1 : 0,
                  transition: 'max-width 0.5s ease, opacity 0.5s ease',
                }}
                autoFocus
              />
            ) : null}
          </button>

          {/* Custom Dropdown Filter dengan Ikon */}
          <div className="relative w-1/3 md:w-1/6">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="w-full p-2 bg-transparent text-center border-b-2 text-white flex items-center gap-2"
            >
              <AiOutlineFilter className="text-xl" />
              {filterType === 'all' ? 'Semua' : filterType}
            </button>
            {showFilterDropdown && (
              <div className="absolute w-full mt-1 bg-black border border-white rounded-md shadow-lg z-20">
                {['all', 'Makkiyah', 'Madaniyah'].map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setShowFilterDropdown(false);
                    }}
                    className="p-2 hover:bg-white hover:text-black cursor-pointer"
                  >
                    {type === 'all' ? 'Semua' : type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

       {/* Daftar Surah dengan Scroll */}
<div className="flex-1 overflow-y-auto scrollbar-hidden">
  {filteredSurahs.map((surah) => (
    <button
      key={surah.number}
      onClick={() => navigate(`/surahs-detail/${surah.number}`)}
      className="w-full border-2 border-white text-white px-6 py-4 mb-2 rounded-md hover:bg-white hover:text-black transition"
    >
      <div className="text-xl font-bold">
        {surah.number}. {surah.name}
      </div>
      <div className="text-sm italic">
        {surah.translation} - {surah.revelation}
      </div>
      <div className="text-sm">Jumlah Ayat: {surah.numberOfAyahs}</div>
    </button>
  ))}
</div>
      </div>
    </div>
  );
};

export default AllSurahs;
