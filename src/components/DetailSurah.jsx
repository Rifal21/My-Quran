import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlinePlayCircle } from 'react-icons/ai';

const SurahDetail = () => {
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const audioRefs = useRef([]);
  
  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState(null);

  const goBack = () => {
    navigate('/surahs');
  };

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch(`https://quran-api-id.vercel.app/surahs/${surahNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSurahData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

  const togglePlay = (index) => {
    const currentAudio = audioRefs.current[index];
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  };

  const openModal = (ayah) => {
    setSelectedAyah(ayah);
    setShowModal(true);
  };

  // Function to convert numbers to Arabic numerals
  const convertToArabicNumber = (number) => {
    const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";
    return number.toString().split("").map(digit => arabicNumbers[digit]).join("");
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white">Error: {error}</div>;
  }

  if (!surahData) {
    return <div className="text-center text-white">No data available</div>;
  }

  const { name, translation, revelation, description, bismillah, ayahs } = surahData;

  return (
    <div className="md:p-6 p-3 bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/img/masjid.jpg)' }}>
      <div className="max-w-3xl mx-auto bg-opacity-50 md:p-6 p-3 rounded-lg md:backdrop-blur-lg  max-h-[95vh] overflow-y-auto scrollbar-hidden">
        <button
          onClick={goBack}
          className="absolute md:top-10 md:left-7 top-8 left-3 text-2xl text-white hover:text-gray-300 transition"
        >
          <AiOutlineArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-3xl font-bold text-white text-center">{name} ({translation})</h1>
        <p className="text-xl text-white text-center italic mt-2">Revelation: {revelation}</p>
        <p className="text-white mt-4 text-justify indent-5">{description}</p>

        <div className="text-center mt-8 border-2 border-white rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white">Bismillah</h2>
          <p className="text-2xl font-semibold text-white mt-2">{bismillah.arab}</p>
          <p className="text-white italic mt-2">{bismillah.translation}</p>
        </div>

        {ayahs.map((ayah, index) => (
          <div key={index} 
               onClick={() => openModal(ayah)} 
               className="flex border-2 border-white rounded-lg p-4 mt-4 items-center cursor-pointer">
            <button onClick={(e) => { e.stopPropagation(); togglePlay(index); }} 
                    className="text-white text-3xl mr-4 hover:bg-white rounded-full hover:text-black transition">
              <AiOutlinePlayCircle />
            </button>
            <audio ref={(el) => (audioRefs.current[index] = el)} src={ayah.audio.alafasy} />
            <div className="flex flex-col text-end w-full">
              <p className="md:text-3xl text-xl text-white font-serif">
                {ayah.arab} <span className="text-white mr-4 border rounded-full px-2 text-center text-xl">{convertToArabicNumber(ayah?.number?.inSurah)}</span>
              </p>
              <p className="text-white italic mt-2 text-sm md:text-base">{ayah.translation}</p>
            </div>
          </div>
        ))}

      </div>
      {showModal && selectedAyah && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg mx-auto relative max-h-[80vh] overflow-y-auto scrollbar-hidden">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-2 right-4 text-2xl text-gray-700 hover:text-black transition">
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tafsir Ayah {selectedAyah.number.inSurah} (Kemenag)</h2>
            <p className="text-gray-700 text-justify indent-8 mb-4">{selectedAyah.tafsir.kemenag.long}</p>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tafsir Ayah {selectedAyah.number.inSurah} (Quraish)</h2>
            <p className="text-gray-700 text-justify indent-8 mb-4">{selectedAyah.tafsir.quraish}</p>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tafsir Ayah {selectedAyah.number.inSurah} (Jalalayn)</h2>
            <p className="text-gray-700 text-justify indent-8 mb-4">{selectedAyah.tafsir.jalalayn}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurahDetail;
