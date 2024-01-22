import { apiSlice } from "./apiSlice";
const USER_URL = "/api/admin";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ searchString, size, page }) => ({
        url: `${USER_URL}/users`,
        method: "GET",
        params: {
          searchString: searchString,
          size: size,
          page: page,
        },
      }),
    }),

    vocab2: builder.query({
      query: ({ searchString, size, page }) => ({
        url: `${USER_URL}/vocabulary/getVocab`,
        method: "GET",
        params: {
          searchString: searchString,
          size: size,
          page: page,
        },
      }),
    }),
    addVocab: builder.mutation({
        query: (data) => ({
          url: `${USER_URL}/vocabulary/add`,
          method: "POST",
          body: data,
        }),
      }),
      updateVocab: builder.mutation({
        query: (data) => ({
          url: `${USER_URL}/vocabulary/update`,
          method: "POST",
          body: data,
        }),
      }),
      deleteVocab: builder.mutation({
        query: (data) => ({
          url: `${USER_URL}/vocabulary/delete`,
          method: "POST",
          body: data,
        }),
      }),
    courses2: builder.query({
      query: ({ searchString, size, page }) => ({
        url: `${USER_URL}/vocabulary/courses`,
        method: "GET",
        params: {
          searchString: searchString,
          size: size,
          page: page,
        },
      }),
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/courses/add`,
        method: "POST",
        body: data,
      }),
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/courses/update`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/courses/delete`,
        method: "POST",
        body: data,
      }),
    }),
    lessons: builder.query({
      query: ({ searchString, size, page }) => ({
        url: `${USER_URL}/vocabulary/lessons`,
        method: "GET",
        params: {
          searchString: searchString,
          size: size,
          page: page,
        },
      }),
    }),
    addLesson: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/lessons/add`,
        method: "POST",
        body: data,
      }),
    }),
    updateLesson: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/lessons/update`,
        method: "POST",
        body: data,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/vocabulary/lessons/delete`,
        method: "POST",
        body: data,
      }),
    }),
    dashBoard: builder.query({
      query: () => ({
        url: `${USER_URL}/vocabulary/getDasshBoard`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUsersQuery,
  useVocab2Query,
  useAddVocabMutation,
  useUpdateVocabMutation,
  useDeleteVocabMutation,
  useCourses2Query,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useLessonsQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useDashBoardQuery
} = adminSlice;
