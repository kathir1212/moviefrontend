import './App.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cinema from './components/Cinema';
import { useSeat } from './context/SeatContext';

export default function Seat() {
  const {
    movieId, theater, date, time,
    selectedSeats,
    selectedShow,
    fetchShowtimeData,
  } = useSeat();

  useEffect(() => {
    console.log(selectedShow,"selectedShow");
    
    fetchShowtimeData();
  }, [movieId, theater, date, time]);
  
  
  if (!selectedShow) {
    return <div className='text-center p-10'>Loading Show Info...</div>;
  }

  return (
    <div className="mt-[9%] min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        🎟️ Book Your Seats for <span className="text-yellow-400">{selectedShow.movie?.Title}</span>
      </h1>

      {/* <p className="text-lg mb-4 text-gray-300">
        🎬 <strong>Theater:</strong> {selectedShow.theater} | 🕒 <strong>Time:</strong> {selectedShow.time[0]}
      </p> */}

      {/* Cinema Seat Layout */}
      <Cinema />

      {/* Selection Summary */}
      <p className="text-xl font-medium mt-8 bg-gray-800 py-4 px-6 rounded-lg shadow-md">
        You have selected <span className="text-yellow-400 font-bold">{selectedSeats.length}</span> seats
        for a total price of <span className="text-green-400 font-bold">{selectedSeats.length * selectedShow.ticketPrice} ₹</span>
      </p>

      {/* Booking Button */}
      <div className="mt-8">
        <Link to={`/seat/checklist/${selectedShow?._id}`}>
          <button className="bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all duration-200 text-white font-semibold py-3 px-8 rounded-lg shadow-xl">
            Proceed to Booking 🚀
          </button>
        </Link>
      </div>
    </div>
  );
}
