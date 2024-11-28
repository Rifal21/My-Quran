import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputSurah, setInputSurah] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); // State untuk pesan error

  const handleSubmit = () => {
    if (!inputSurah) { // Validasi input kosong
      setError('Nomor Surah tidak boleh kosong');
      return;
    }
    
    // Validasi jika input tidak valid (opsional)
    if (isNaN(inputSurah) || inputSurah <= 0) {
      setError('Masukkan nomor Surah yang valid');
      return;
    }
        // Validasi agar nomor surah berada dalam rentang 1 sampai 114
        if (inputSurah < 1 || inputSurah > 114) {
          setError('Nomor Surah harus antara 1 dan 114');
          return;
        }

    // Jika input valid, reset error dan navigasi
    setError('');
    navigate(`/surahs-detail/${inputSurah}`);
    setShowModal(false);
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('./img/masjid.jpg')" }} // Ganti dengan path gambar
    >
      {/* Overlay untuk memastikan teks terlihat jelas */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Container dengan border untuk membungkus judul dan tombol */}
      <div className="relative z-10 border-2 border-white p-8 rounded-lg text-center bg-black bg-opacity-30 md:w-1/2 w-full">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-8">
          My Islamic App
        </h1>

        {/* Button-container untuk memastikan ukuran sama */}
        <div className="flex flex-col space-y-4 mb-5">
          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black  transform hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/surahs')}
          >
            Baca Al-Quran
          </button>

          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black  transform hover:scale-105 transition-transform duration-300"
            onClick={() => setShowModal(true)}
          >
            Pergi ke Surah Tertentu
          </button>
          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black  transform hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/doa')}
          >
            Kumpulan Do'a Harian
          </button>
          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black  transform hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/hadits')}
          >
            Kumpulan Hadits Arbain Nawawi
          </button>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <h5 className='text-white mb-2'>Made with ❤️ by <Link className='inline-block ml-1 transform transition-transform duration-300 hover:scale-110 hover:underline' to={'https://github.com/Rifal21'}>Rifal Kurniawan</Link></h5>
          <p className='text-white'>Copyright © {new Date().getFullYear()} My Islamic App</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Masukkan Nomor Surah</h2>
            
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Contoh: 1"
              value={inputSurah}
              onChange={(e) => setInputSurah(e.target.value)}
              required
            />
            
            {/* Tampilkan pesan error jika ada */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <div className="flex justify-end">
              <button
                className="bg-black text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
