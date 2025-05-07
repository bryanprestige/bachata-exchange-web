
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
          q: "What about security?",
          a: `Bachata Exchange is run in an outdoor space in the center of London, keep that in mind.
              We provide a space for people to leave their belongings but we do not recommend leaving them as if it was a cloackroom.
              Our best advice is to avoid bringin expensive items or valuables.
              The space has security protecting the area and will help in case of emergencies, but each individual is ultimately responsible for their belongings.`,
        },
        {
          q: "How can I support the movement?",
          a: `You can donate to the teachers after you have taken the class,
              is the best way to show them support for giving access to so many people to learn and connect through their talent.
              Alternatively you can also support the movement by joining the GoFundMe campaign
              clicking on the following link .`,
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
                <a href="https://www.gofundme.com/f/btvyd-bachata-exchange-community-project" target="_blank">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mt-8">Support the movement</button>
                </a>
            </div>
        </section>
    )
}