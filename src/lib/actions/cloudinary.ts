"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
    try {
        console.log("Cloudinary Upload Started...");
        const file = formData.get('file') as File;
        if (!file) {
            console.error("No file found in FormData");
            throw new Error('No file provided');
        }

        console.log("File detected:", file.name, "Size:", file.size);

        if (!process.env.CLOUDINARY_API_SECRET) {
            console.error("Cloudinary API Secret is missing in process.env");
            throw new Error('Cloudinary configuration error');
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'pinky_pixels_members',
                    transformation: [
                        { width: 500, height: 500, crop: 'fill', gravity: 'face' },
                        { quality: 'auto', fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Stream Error:", error);
                        reject(error);
                    } else {
                        console.log("Cloudinary Upload Success:", result?.secure_url);
                        resolve(result?.secure_url);
                    }
                }
            ).end(buffer);
        });

        return result;
    } catch (error: any) {
        console.error("Server Action Error (uploadImage):", error);
        throw new Error(error.message || 'Image upload failed');
    }
}
