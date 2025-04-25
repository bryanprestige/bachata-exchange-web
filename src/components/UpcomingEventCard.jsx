
export default function UpcomingEventCard({teachers }) {
    return (
        
            <div className="grid grid-cols-1 sm:grid-cols-3 my-4">
              {teachers.map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 bg-gray-800 p-3 rounded-xl">
                  <img
                      src={t.imageUrl}
                      alt={t.names}
                      className="w90 h-80 rounded-2 object-cover border-2 border-yellow-500"
                  />
                  <div>
                      <p className="font-semibold text-yellow-500">{t.names}</p>
                      <p className="text-sm text-white">{t.classLevel}</p>
                  </div>
                  </div>
              ))}
            </div> 
    );
  }
  