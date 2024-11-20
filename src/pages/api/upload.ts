import express, { Request, Response, RequestHandler } from 'express';
import multer from 'multer';
import { MongoClient, GridFSBucket } from 'mongodb';

// Initialize multer for handling multipart form-data (using memoryStorage)
const upload = multer({ storage: multer.memoryStorage() });

// Define a custom type for the file in the request
interface FileRequest extends Request {
  file?: Express.Multer.File;
}

// Create an Express router
const router = express.Router();

// MongoDB connection string (Use environment variables for security)
const mongoURI =
  'mongodb+srv://Swar41:Swar41@cluster0.zx1wdgy.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI);

let bucket: GridFSBucket;

// Connect to MongoDB and initialize GridFSBucket
client
  .connect()
  .then(() => {
    console.log('Connected to MongoDB');
    const database = client.db('pdf');
    bucket = new GridFSBucket(database, {
      bucketName: 'pdfFiles', // Make sure bucketName is correct
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// File upload handler
const uploadFileHandler: RequestHandler = async (req: FileRequest, res: Response): Promise<void> => {
  try {
    // Check if multer has processed the file
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded.' });
      return;
    }

    // Validate title and content
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required.' });
      return;
    }

    // Create a promise to handle the upload stream to GridFS
    const uploadPromise = new Promise<string>((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(req.file!.originalname, {
        contentType: req.file!.mimetype,
        metadata: {
          title,
          content,
          uploadDate: new Date(),
        },
      });

      // Stream the file data into GridFS
      uploadStream.end(req.file!.buffer);

      uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
      uploadStream.on('error', (error) => reject(error));
    });

    // Wait for the file upload to complete and get the file id
    const fileId = await uploadPromise;

    // Respond with the uploaded file details
    res.status(201).json({
      id: fileId,
      title,
      content,
      fileName: req.file!.originalname,
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Failed to upload file and save paper details.' });
  }
};

// Define the POST /upload endpoint with multer middleware
router.post('/upload', upload.single('pdfFile'), uploadFileHandler);

export default router;
