// utils/uploadToImageKit.ts
export async function uploadToImageKit(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // only if required
  formData.append("publicKey", "your_public_api_key");
  formData.append("fileName", file.name);

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Image upload failed");

  return data.url;
}
