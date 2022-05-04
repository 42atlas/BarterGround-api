import multer from "multer";
import FirebaseStorage from "multer-firebase-storage";
import { v4 as uuidv4 } from 'uuid';

const firebaseUploader = multer({
    storage: FirebaseStorage({
        bucketName: process.env.STORAGE_BUCKET_FIREBASE,
        credentials: {
            privateKey: process.env.PRIVATE_KEY_FIREBASE,
            project_id: process.env.PROJECT_ID_FIREBASE,
            client_email: process.env.CLIENT_EMAIL_FIREBASE,
        },
        public: true,
        nameSuffix: `-${uuidv4()}`
    }),
});

export default firebaseUploader;
