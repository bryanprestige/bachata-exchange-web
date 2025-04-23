export default function Testimonial(props) {
    return (
        <div className="bg-white text-black p-6 rounded-xl shadow-md max-w-md mx-auto">
        <p className="italic text-gray-700 mb-4 overflow-hidden text-ellipsis h-80">“{props.quote}”</p>
             <div className="flex items-center gap-4">
                <img src={props.avatar} alt={props.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="font-semibold">{props.name}</span>
             </div>
        </div>
    )
}