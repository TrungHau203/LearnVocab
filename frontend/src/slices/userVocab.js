import { apiSlice } from './apiSlice';
const USER_URL ='/api/userVocabulary'

export const userVocabularyApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addVocabToReview: builder.mutation({
            query :(data)=>({
                url:`${USER_URL}/addVocabByUser`,
                method: 'POST',
                body:data
            })
        }),
        updateVocabByUser: builder.mutation({
            query :(data)=>({
                url:`${USER_URL}/updateVocabByUser`,
                method: 'POST',
                body:data
            })
        }),
        sendUserId: builder.mutation({
            query :(data)=>({
                url:`${USER_URL}/getReview`,
                method: 'POST',
                body:data
            })
        }),
        getAllVocab: builder.mutation({
            query :(data)=>({
                url:`${USER_URL}/getAllVocab`,
                method: 'POST',
                body:data
            })
        }),
    })
})

export const {useAddVocabToReviewMutation, useUpdateVocabByUserMutation ,useSendUserIdMutation, useGetAllVocabMutation }= userVocabularyApiSlice