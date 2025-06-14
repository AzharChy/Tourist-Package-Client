import { use, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { AuthContext } from "./Authentication/AuthContext";
import EditModal from "./EditModal";

const MyPackages = () => {
    const {user} = use(AuthContext);
  const [myTours, setMyTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get("http://localhost:3000/addedTourPackages", {
          withCredentials: true,
        })
        .then((res) => {
          const userTours = res.data.filter(
            (tour) => tour.guideEmail === user.email
          );
          setMyTours(userTours);
          setLoading(false)
        });
    }
  }
  , [user]);
  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
   <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center">My Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myTours.map((tour) => (
          <div key={tour._id} className="bg-blue-200 p-4 rounded-lg shadow-md space-y-2">
            <img src={tour.image} alt={tour.tourName} className="rounded-md w-full h-40 object-cover" />
            <h3 className="text-xl font-bold">{tour.tourName}</h3>
            <p><strong>Destination:</strong> {tour.destination}</p>
            <p><strong>Price:</strong> ${tour.price}</p>
            <p><strong>Duration:</strong> {tour.duration}</p>
            <p><strong>Departure Date:</strong> {tour.departureDate || "N/A"}</p>
            <p><strong>Booking Count:</strong> {tour.bookingCount || 0}</p>
            <button
              onClick={() => setSelectedTour(tour)}
              className="flex items-center mx-auto gap-1 text-blue-600 hover:underline"
            >
              Edit Details <CiEdit />
            </button>
          </div>
        ))}
      </div>

      {selectedTour && (
        <EditModal
          tour={selectedTour}
          closeModal={() => setSelectedTour(null)}
          refresh={() => {
            axios
              .get("http://localhost:3000/addedTourPackages", {
                withCredentials: true,
              })
              .then((res) => {
                const userTours = res.data.filter(
                  (tour) => tour.guideEmail === user.email
                );
                setMyTours(userTours);
              });
          }}
        />
      )}
    </div>
  );
};

export default MyPackages;
