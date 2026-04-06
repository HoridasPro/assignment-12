// "use client";
// import StatusDrapdown from "@/components/StatusDrapdown";
// import { useEffect, useState } from "react";

// export default function Bookings() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/feedback")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await fetch(`/api/feedback/${id}`, {
//         method: "DELETE",
//       });

//       const result = await res.json();

//       if (!res.ok) throw new Error(result.error || "Delete failed");

//       setData((prevData) => prevData.filter((item) => item._id !== id));

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Item deleted successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.message,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-8 min-h-screen">
//       {/* Page Header */}
//       <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//             Booking Management
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Monitor and update status for all incoming bookings.
//           </p>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto overflow-y-hidden">
//           <table className="min-w-full leading-normal">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   SI NO
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Service Details
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Booking Type
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Location Info
//                 </th>
//                 <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Status Update
//                 </th>
//                 <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-5 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   Total Price
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="text-center py-20">
//                     <div className="flex flex-col items-center gap-2">
//                       <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//                       <span className="text-gray-500 font-medium italic tracking-wide">
//                         Loading Booking Data...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : data.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="12"
//                     className="text-center py-20 text-gray-400 font-medium"
//                   >
//                     No booking data available at the moment.
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((item, i) => (
//                   <tr
//                     key={item._id || i}
//                     className="hover:bg-indigo-50/30 transition-colors duration-150"
//                   >
//                     <td className="px-5 py-5 text-sm font-semibold text-gray-400">
//                       {i + 1}
//                     </td>

//                     <td className="px-5 py-5 text-sm">
//                       <p className="text-gray-900 font-bold text-base">
//                         {item.service || "N/A"}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-gray-500 text-xs italic">
//                           {item.role || "User"}
//                         </span>
//                         <span className="text-gray-300">|</span>
//                         <span className="text-indigo-600 text-xs font-semibold uppercase tracking-tighter">
//                           Amt: {item.amount || 0}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-5 py-5 text-sm">
//                       <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
//                         {item.type || "N/A"}
//                       </span>
//                     </td>

//                     <td className="px-5 py-5 text-sm">
//                       <p className="text-gray-800 font-semibold">
//                         {item.city}, {item.district}
//                       </p>
//                       <p
//                         className="text-gray-500 text-xs mt-1 truncate max-w-[180px]"
//                         title={item.address}
//                       >
//                         {item.division} • {item.address}
//                       </p>
//                     </td>

//                     <td className="px-5 py-5 text-center">
//                       <div className="inline-block min-w-[120px]">
//                         <StatusDrapdown
//                           orderId={item._id}
//                           initialStatus={item.status || "pending"}
//                         />
//                       </div>
//                     </td>

//                     <td className="px-5 py-5 text-center text-sm text-gray-500 italic whitespace-nowrap font-medium">
//                       {item.createdAt
//                         ? new Date(item.createdAt).toLocaleDateString()
//                         : "N/A"}
//                     </td>

//                     <td className="px-5 py-5 text-right">
//                       <span className="text-lg font-black text-orange-600 tracking-tight">
//                         ৳{item.total || 0}
//                       </span>
//                     </td>
//                     <td className="px-5 py-5 text-center">
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="group relative p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
//                         title="Delete Booking"
//                       >
//                         <span className="font-bold border border-red-200 px-3 py-1.5 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-all">
//                           Delete
//                         </span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import StatusDrapdown from "@/components/StatusDrapdown";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Calendar, MapPin, Tag, Trash2 } from "lucide-react"; // আইকন যোগ করা হয়েছে

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Delete failed");

      setData((prevData) => prevData.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Booking removed successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50/30">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Booking Management
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Monitor and update status for all incoming service requests.
          </p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-slate-700 font-bold text-sm">
            Active Bookings: {data.length}
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  SI NO
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Service & Client
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Location Info
                </th>
                <th className="px-6 py-5 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-5 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Date & Price
                </th>
                <th className="px-6 py-5 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-24">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-[5px] border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-tighter">
                        Syncing Records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-24 text-slate-400 font-bold italic"
                  >
                    No bookings found in the database.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={item._id || i}
                    className="hover:bg-indigo-50/40 transition-all duration-200"
                  >
                    <td className="px-6 py-6 text-sm font-black text-slate-300">
                      #{String(i + 1).padStart(2, "0")}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-black text-base group-hover:text-indigo-600 transition-colors">
                          {item.service || "Unnamed Service"}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Tag size={12} className="text-indigo-400" />
                          <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                            {item.type || "Regular"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={14}
                          className="text-slate-400 mt-1 shrink-0"
                        />
                        <div>
                          <p className="text-slate-700 font-bold text-sm leading-tight">
                            {item.city}, {item.district}
                          </p>
                          <p
                            className="text-slate-400 text-[11px] mt-1 max-w-[150px] truncate"
                            title={item.address}
                          >
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-center">
                      <div className="inline-block scale-90 origin-center">
                        <StatusDrapdown
                          orderId={item._id}
                          initialStatus={item.status || "pending"}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs mb-1">
                          <Calendar size={12} />
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "en-GB",
                              )
                            : "N/A"}
                        </div>
                        <span className="text-lg font-black text-emerald-600">
                          ৳{item.total || 0}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2.5 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 border border-red-100 hover:border-red-500 shadow-sm active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
