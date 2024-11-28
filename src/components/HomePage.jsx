import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputSurah, setInputSurah] = useState('');
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('./img/masjid.jpg')" }} // Ganti dengan path gambar
    >
      {/* Overlay untuk memastikan teks terlihat jelas */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Container dengan border untuk membungkus judul dan tombol */}
      <div className="relative z-10 border-2 border-white p-8 rounded-lg text-center bg-black bg-opacity-30 md:w-1/2 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Aplikasi Al-Qur'an
        </h1>

        {/* Button-container untuk memastikan ukuran sama */}
        <div className="flex flex-col space-y-4">
          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            onClick={() => navigate('/surahs')}
          >
            Lihat Seluruh Surat
          </button>

          <button
            className="w-full border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            onClick={() => setShowModal(true)}
          >
            Pergi ke Surah Tertentu
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Masukkan Nomor Surah</h2>
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Contoh: 1"
              value={inputSurah}
              onChange={(e) => setInputSurah(e.target.value)}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
              onClick={() => {
                console.log(`Pergi ke Surah ${inputSurah}`);
                navigate(`/surahs-detail/${inputSurah}`);
                setShowModal(false);
              }}
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
      )}
    </div>
  );
};

export default HomePage;
