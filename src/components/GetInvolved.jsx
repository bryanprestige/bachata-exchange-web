import { Link } from "react-router-dom";

export default function GetInvolved() {
    return (
        <section className="py-20 text-center bg-gray-800 text-white">
                <h2 className="text-2xl font-semibold">Want to be part of the movement?</h2>
                <p className="mt-2">Volunteer as a teacher, event coordinator, or brand partner!</p>
                <Link to="/join">
                  <button className="mt-6 bg-white text-gray-800 px-6 py-3 font-semibold rounded-xl hover:bg-yellow-500 hover:text-gray-800 transition">
                    Get Involved
                  </button>
                </Link>
        </section>
    );
}