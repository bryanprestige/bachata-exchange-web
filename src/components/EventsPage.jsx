import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCarousel from "./PastEventCarousel";
import flyer1 from "../assets/flyer1.png"
import flyer2 from "../assets/flyer2.png"
import flyer3 from "../assets/flyer3.png"
import Footer from "./Footer";
import pastEventData2025 from "../api/pastEvents2025.json"  with { type:"json"}
import pastEventData2024 from "../api/pastEvents2024.json"  with { type:"json"}
export default function EventsPage() {

    const teachers = [
        { name: "Dren", level: "Beginners", image: flyer1 },
        { name: "Jacopo.", level: "Improvers", image: flyer2 },
        { name: "Iman", level: "Intermediate", image: flyer3 },
      ];

    return (
       <>
            <section className="bg-yellow-500 text-white p-14 pt-20 text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mt-12 ">How Our Classes Work</h2>
                <p className="max-w-3xl mx-auto text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo nec sagittis efficitur, sem magna faucibus lacus, nec fermentum justo libero non lorem.
                </p>
            </section>
            <UpcomingEventCard
                date="2025-04-27"
                title="Classes start at 5pm"
                teachers={teachers}
                location="12 Primrose Street, London,EC2A 2EG"
                note="Open level warm-up included"
            />
            <section className="bg-gray-800 text-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2025</h2>
                <p className="max-w-3xl mx-auto text-white">
                    Slide to the right to find more highlights from BE in cronological order
                </p>
            </section>
            <PastEventCarousel
                events={pastEventData2025}
            />
            <section className="bg-gray-800 text-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Events 2024</h2>
                <p className="max-w-3xl mx-auto text-white">
                    Slide to the right to find more highlights from BE in cronological order
                </p>
            </section>
            <PastEventCarousel
              events={pastEventData2024}
            />
            <Footer />
       </>
    );
}