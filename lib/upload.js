import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage} from "./firebase";

const upload = async (file)=>{
    const data = new Date()
    const storageRef = ref(storage, `images/${data + file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject)=>{
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
          }, 
          (error) => {
            reject("Algo deu errado" + error.code)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );

    })
    

}

export default upload