import geowearLogo from '/public/sponsors/geowear-logo.png';

export default function Sponsors() {
    return (
        <section className="bg-blue-50 py-12 px-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Supported By</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
                {/* Reemplaza las rutas con tus logos reales */}
                <img src={geowearLogo} alt="Sponsor 1" className="h-12 md:h-16 object-contain" />
            </div>
        </section>
    );
}