import { apiSlice } from '@redux/apiSlice';
import { AuthCredentials } from '@redux/slices/auth_slice/authSlice.type';
import { toggleLoader } from '@redux/slices/loader_slice';

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['AUTH'] });

export const authApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, AuthCredentials>({
      query: (credentials) => ({
        url: 'https://dfljauq3a1.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_Login',
        method: 'POST',
        body: credentials,
        responseHandler: 'text',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(toggleLoader({ isLoading: true }));
        try {
          await queryFulfilled;
          dispatch(toggleLoader({ isLoading: false }));
        } catch {
          dispatch(toggleLoader({ isLoading: false }));
        }
      },
    }),
  }),
});

/**
 *  Export hooks for usage in functional components, which are
 *  auto-generated based on the defined endpoints
 */
export const { useLoginMutation } = authApi;
