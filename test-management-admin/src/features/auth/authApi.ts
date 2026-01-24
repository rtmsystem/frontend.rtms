import { baseApi } from '../../api/baseApi';
import { User, setCredentials } from './authSlice';

interface LoginRequest {
    email: string;
}

interface LoginResponse {
    user: User;
    token: string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (err) {
                    // Handle login error
                    console.error('Login failed', err);
                }
            },
        }),
        getMe: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
