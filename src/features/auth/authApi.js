import { apiSlice }  from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            user: result.data.user,
                            password: arg.password,
                            role: result.data.role
                        })
                    );
                    dispatch(
                        userLoggedIn({
                            user: result.data.user,
                            password: arg.password,
                            role: result.data.role
                        })
                    );
                }catch(err){}
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            user: result.data.user,
                            role: result.data.role
                        })
                    );
                    dispatch(userLoggedIn({
                        user: result.data.user,
                        role: result.data.role
                    }))
                }catch(err){}
            },
            providesTags: ["login"],
        })
    })
});

export const {useLoginMutation, useRegisterMutation} = authApi;