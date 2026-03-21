export const uploadImage = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "NearServe"); // your preset name

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzmrub2tb/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  console.log(result);  
  return result.secure_url;
};