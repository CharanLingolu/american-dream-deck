import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env.local explicitly
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const publicDir = path.join(process.cwd(), 'public');

// Find all mp4 files in the public directory
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.mp4'));

if (files.length === 0) {
  console.log('No .mp4 files found in the public directory.');
  process.exit(0);
}

console.log(`Found ${files.length} video(s) to upload...`);

const uploadVideos = async () => {
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    // The public ID is the filename without the .mp4 extension
    const publicId = path.parse(file).name;
    
    console.log(`Uploading ${file} as public ID: '${publicId}'...`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video',
        public_id: publicId,
        overwrite: true,
      });
      console.log(`✅ Success: ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message || error);
    }
  }
  
  console.log('🎉 Upload process complete!');
};

uploadVideos();
