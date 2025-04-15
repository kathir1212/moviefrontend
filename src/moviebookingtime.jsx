import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Moviebookingtime() {
  const { id } = useParams(); // movieId from URL
  const [showtime, setShowtimeinfo] = useState(null);

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/seat/grouped-showtimes/${id}`);
        setShowtimeinfo(res.data);
      } catch (error) {
        console.error('Error fetching showtime data:', error);
      }
    };
    fetchShowtimeData();
  }, [id]);

  if (!showtime) return <div className='p-10 text-center'>Loading...</div>;

  return (
    <div className='mt-[3%]'>
      <div className='flex p-[4%]'>
        <div className='flex-4'>
          <h2 className="text-3xl font-bold font-[Volkhov] mt-4">{showtime?.Title}</h2>
          <p className="text-gray-700 text-lg font-[Poppins] mt-4">IMDB Rating: 7.5 </p>
          <div className='mt-4'>
            <button className='bg-blue-500 p-4 rounded-lg text-white font-[Poppins]'>
              <b>Watch Trailer</b>
            </button>
          </div>
        </div>
        <div className='flex-1'>
          <img className='w-[11rem] rounded-lg' src={showtime?.Poster} alt={showtime?.Title} />
        </div>
      </div>

      <div className='p-[4%]'>
        {Array.isArray(showtime?.shows) && showtime.shows.map((show, index) => (
          <div key={index}>
            <div className='flex mb-3'>
              <div className='flex-2 p-[2%]'>
                <h1 className='text-2xl font-[Poppins] font-semibold'>{show?.theater}</h1>
                <div className='flex gap-2 text-gray-500 text-sm mt-1'>
                  <span>4K</span>
                  <span>RGB Laser</span>
                </div>
              </div>

              <div className='flex-4 p-[2%] text-green-600'>
                <div className='grid grid-cols-4 gap-4 font-[Poppins]'>
                  {Array.isArray(show?.time) && show.time.map((timestamps, timeIndex) => (
                    <Link
                    to={`/seat/find?movieId=${id}&theater=${encodeURIComponent(show.theater)}&date=${show.date}&time=${timestamps}`}
                    key={timeIndex}
                  >
                    <div className='p-3 border border-[#cdcdcd] rounded-lg text-center hover:bg-green-100 hover:text-black transition-all duration-150'>
                      <span>{timestamps}</span>
                    </div>
                  </Link>
                  ))}
                </div>
              </div>
            </div>
            <hr className='border-[#cdcdcd]' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Moviebookingtime;
