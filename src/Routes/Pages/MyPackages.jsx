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
        .get("https://tour-server-drab.vercel.app/addedTourPackages", {
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

  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This package will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`https://tour-server-drab.vercel.app/addedTourPackages/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // Check for deletion success (prefer deletedCount or status)
          if (res.data.deletedCount > 0 || res.status === 200) {
            Swal.fire("Deleted!", "Tour has been deleted.", "success");

            // Update UI by filtering out the deleted tour
            setMyTours((prevTours) => prevTours.filter((tour) => tour._id !== id));

            // If modal was open for deleted tour, close it
            if (selectedTour?._id === id) {
              setSelectedTour(null);
            }
          } else {
            Swal.fire("Error!", "Failed to delete the tour.", "error");
          }
        })
        .catch(() => {
          Swal.fire("Error!", "Something went wrong.", "error");
        });
    }
  });
};

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
   <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center">My Packages</h2>
    {myTours.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Tour Info</th>
          <th>Details</th>
          <th>Booking Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {myTours.map((tour, index) => (
          <tr key={tour._id}>
            <th>{index + 1}</th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={tour.image} alt={tour.tourName} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{tour.tourName}</div>
                  <div className="text-sm opacity-50">{tour.destination}</div>
                </div>
              </div>
            </td>
            <td>
              ${tour.price}
              <br />
              <span className="badge badge-ghost badge-sm">
                {tour.duration} | {tour.departureDate || "N/A"}
              </span>
            </td>
            <td>{tour.bookingCount || 0}</td>
            <th>
              <button
                onClick={() => setSelectedTour(tour)}
                className="btn btn-sm btn-outline btn-primary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tour._id)}
                className="btn btn-sm btn-outline btn-error"
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Tour Info</th>
          <th>Details</th>
          <th>Booking Count</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  </div>
) : (
  <div className="text-center py-10 text-lg font-medium text-gray-600">
    No package updated yet.
  </div>
)}




      {selectedTour && (
        <EditModal
          tour={selectedTour}
          closeModal={() => setSelectedTour(null)}
          refresh={() => {
            axios
              .get("https://tour-server-drab.vercel.app/addedTourPackages", {
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
