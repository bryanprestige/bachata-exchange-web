import { RiDiscountPercentFill } from "react-icons/ri";

export default function EventCard(props) {
  console.log(props,'props'); 
  return (
        <div className="bg-white text-gray-800 p-4 rounded-xl shadow-md">
          <img src={props.imageUrl} alt={props.title} className="rounded-lg m-auto mb-4 w-100 h-100 justify-center place-content-center" />
          <h3 className="font-bold text-lg">{props.title}
            {props.discount && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                <RiDiscountPercentFill className="mr-2" />
                Discount
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-700">Date: {props.dateRange}</p>
          <a href={props.infoUrl} target='_blank'>
            <button className="mt-4 bg-yellow-500 hover:bg-gray-800 hover:text-yellow-500 text-gray-800 px-4 py-2 rounded-lg">
              More Info / Get Tickets
            </button>
          </a>
        </div>
    );
}