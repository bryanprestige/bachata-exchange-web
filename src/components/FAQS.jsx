export default function FAQS () {
    const faqs = [
        {
          q: "Do I need a partner to join?",
          a: "No partner needed! Everyone rotates during the classes and socials.",
        },
        {
          q: "Are the events beginner-friendly?",
          a: "Absolutely! We offer classes for all levels and a super welcoming environment.",
        },
        {
          q: "How can I get involved?",
          a: "Click 'Get Involved' to volunteer or teach with us!",
        },
      ]

    return (
        <section className="bg-gray-800 text-white py-20 px-6">
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((item, i) => (
                    <div key={i}>
                        <h3 className="text-xl font-semibold text-yellow-500">{item.q}</h3>
                        <p className="text-gray-200">{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}