import heroImage from '../../assets/hero-image.jpg';

export default function PhotoGallery() {
    const photos = [
        heroImage, 
        heroImage, 
        heroImage,
        heroImage,
        heroImage,
        heroImage
      ];

    return (
        <section className="bg-white py-16 px-6">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">Moments We Cherish</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {photos.map((src, i) => (
                    <img key={i} src={src} alt={`Gallery ${i}`} className="rounded-lg shadow-md object-cover" />
                    ))}
                </div>
            </section>
    );
}