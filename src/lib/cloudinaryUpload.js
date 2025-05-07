export async function uploadImageToCloudinary(file) {
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "featured-events-flyers");
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    return data.secure_url;
  }