import { Link } from 'react-router-dom';

export default function EventCard(props) {
    return (
        <div className="bg-white text-gray-800 p-4 rounded-xl shadow-md">
          <img src={props.image} alt={props.title} className="rounded-lg mb-4 w-100 h-100 object-cover" />
          <h3 className="font-bold text-lg">{props.title}</h3>
          <p className="text-sm text-gray-700">Date: {props.date}</p>
          <Link to="/events">
            <button className="mt-4 bg-yellow-500 hover:bg-gray-800 hover:text-yellow-500 text-gray-800 px-4 py-2 rounded-lg">
              More Info
            </button>
          </Link>
        </div>
    );
}