import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
  const [booking, setBookinginfo] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/booking/`);
      const allBookings = res.data.data;
      console.log(allBookings,"allBookings");
      

      // Get user email from localStorage
      const email = JSON.parse(localStorage.getItem('auth'))?.email;
      setUserEmail(email);

      // Filter bookings by email
      const filteredBookings = allBookings.filter(
        (booking) => booking?.user?.email === email
      );

      setBookinginfo(filteredBookings);
    } catch (error) {
      console.error("Failed to fetch booking data", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4 sm:ml-64 mt-[5%]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Movie</th>
              <th className="px-6 py-3">Theater</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Seats</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((movieinfo, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {movieinfo?.user?.name}
                </td>
                <td className="px-6 py-4">
                  {movieinfo?.user?.email}
                </td>
                <td className="px-6 py-4">
                  {movieinfo?.showtime?.movie?.Title}
                </td>
                <td className="px-6 py-4">
                  {movieinfo?.showtime?.threater?.threater_name}
                </td>
                <td className="px-6 py-4">
                  {movieinfo?.showtime?.time}
                </td>
                <td className="px-6 py-4">
                {movieinfo?.seatNumbers?.join(", ")}
                                </td>
                
              </tr>
            ))}
            {booking.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4 text-gray-600 dark:text-gray-400">
                  No bookings found for "{userEmail}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
