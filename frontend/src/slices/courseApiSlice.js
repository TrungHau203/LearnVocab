import { apiSlice } from './apiSlice';
const USER_URL ='/api/vocabulary'

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        courses: builder.query({
            query :()=>({
                url:`${USER_URL}/courses`,
                method: 'GET',
            })
        }),
        vocab: builder.query({
            query :(data)=>({
                url:`${USER_URL}/`,
                method: 'GET',
                body:data
            })
        }),
        course: builder.query({
            query :(course,data)=>({
                url:`${USER_URL}/courses/${course}`,
                method: 'POST',
                body:data
            })
        }),
        lesson: builder.query({
            query :(lesson,data)=>({
                url:`${USER_URL}/courses/${lesson}`,
                method: 'POST',
                body:data
            })
        }),
    })
})

export const { useCoursesQuery, useVocabQuery, useCourseQuery, useLessonQuery}= courseApiSlice