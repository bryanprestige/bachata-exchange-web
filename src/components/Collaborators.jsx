import goodVibesLogo from '/public/sponsors/good-vibes-logo.png';

export default function Collaborators() {
    return (
        <section className="bg-blue-50 py-12 px-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Collaborating With</h2>
            <h2>Good Vibes Bachata</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
                {/* Reemplaza las rutas con tus logos reales */}
                <a href='https://www.instagram.com/goodvibesbachata/' target='_blank'>
                    <img src={goodVibesLogo} alt="Sponsor 1" className="h-12 md:h-16 object-contain" />
                </a>
            </div>
        </section>
    );
}