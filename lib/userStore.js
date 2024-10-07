import { create } from 'zustand'
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { api_base_url } from '../Helper';


const useUserStore = create((set) => ({
    currentUser: null,
    isLoading:true,
    superUser:null,
    supernotification:0,
    fetchUserInfo: async (uid)=>{
        if(!uid) return set({ currentUser: null, superUser:null, isLoading: false});

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){

                  await fetch(api_base_url + "/use", {
                    mode:"cors",
                    method: "POST",
                    headers:{
                      "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                      userId: docSnap.data().id,
                    }),
                  })
                  .then((res)=> res.json())
                  .then((data)=>{
                    set({ currentUser: docSnap.data(), superUser: data.user, isLoading: false, supernotification:data.notifyNum })
                  })
                // set({ currentUser: docSnap.data(), superUser: docSnap.data(), isLoading: false })
            }else{
                set({ currentUser: null, superUser:null, isLoading: false })
            }
        } catch (error) {
            return set({ currentUser: null, superUser:null, isLoading: false});
        }
    }
}))

export {
    useUserStore
}