import { create } from 'zustand'
// import { db } from './firebase';
// import { doc, getDoc } from 'firebase/firestore';
import { useUserStore } from './userStore';

const useChatStore = create((set) => ({
    chatId: null,
    user:null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user)=>{
        const currentUser = useUserStore.getState().currentUser;

        //Verificar se o usuário é bloqueado
        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId,
                user:null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            })
        }


        //Verificar se o recebidor é bloqueado
        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user:user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            })
        }else{
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            })
        }

    },

    changeBlock: ()=>{
        set((state) => ({...state, isReceiverBlocked: !state.isReceiverBlocked}))
    }
    
}))

export {
    useChatStore
}