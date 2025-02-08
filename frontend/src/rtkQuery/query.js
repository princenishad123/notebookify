import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    tagTypes:["getSectionTag","getUserTag","getTopicTag"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_MODE === 'development' ? "http://localhost:3000/api/v1" : "/api/v1",
        credentials: "include",
    }),
    tagTypes:["User","Section","Topic"],

    endpoints: (builder) => ({

        
          checkAuthUser: builder.query({
            query:()=>'/auth/check-auth'
        }),
       
        
        signup: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body:data
            }),
            invalidatesTags:["getUserTag"],
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
              
            })
        }),



        addSections: builder.mutation({
            query: (data) => ({
                url: "/language",
                method: "POST",
                body:data
            }),
            invalidatesTags:["getSectionTag"]
        }),

        addTopics: builder.mutation({
            query: (data) => ({
                url: "/topic",
                method: "POST",
                body:data
            }),
            invalidatesTags:["getTopicTag"]
        }),


     getSections: builder.query({
    query: ({ data, language }) => ({
        url: `/language/${language}`,
             method: "GET",
         providesTags:["getSectionTag"]
         }),
        
}),

        getTopics: builder.query({
            query: ({topicName,language}) => ({
                url: `/topics/${language}/${topicName}`,
                method: "GET",
               providesTags:["getTopicTag"]
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url:'/admin/users',
                method: "GET",
               providesTags:["getUserTag"]
            }),
        }),

        
        
    })
})

export const {useLogoutMutation,useSignupMutation,useLoginMutation,useAddSectionsMutation,useAddTopicsMutation,useGetSectionsQuery,useLazyGetSectionsQuery,useCheckAuthUserQuery,useGetTopicsQuery,useLazyGetTopicsQuery,useGetUsersQuery} = api