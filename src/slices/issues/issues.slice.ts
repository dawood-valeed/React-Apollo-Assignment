import { gql } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "..";
import { gqlClient } from "../../utils/graphqlClient";
import { IssuesTypeStateModel, ItemsQueryParams } from "./issues.type";

export const initialState: IssuesTypeStateModel = {
  loading: false,
  error: null,
};

export const GET_REACTJS_ISSUES = ({
  recordsPerPage,
  after,
  before,
  state,
}: ItemsQueryParams) => gql`
  {
    repository(name: "reactjs.org", owner: "reactjs") {
      issues(
        ${before ? "last" : "first"}: ${recordsPerPage}
        states: ${state}
        ${before ? `before: "${before}"` : ""}
        ${after ? `after: "${after}"` : ""}
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          title
          author {
            login
          }
          createdAt
          number
          state
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`;

const issuesSlice = createSlice({
  name: "issues",
  initialState: initialState,
  reducers: {
    fetchIssuesInProgress: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    fetchIssuesSuccess: (state, action) => ({
      ...state,
      data: action.payload.data,
      loading: false,
      error: null,
    }),
    fetchIssuesError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
  },
});

export const {
  fetchIssuesInProgress,
  fetchIssuesSuccess,
  fetchIssuesError,
} = issuesSlice.actions;

export const fetchReactJsRepoIssues = (
  queryParams: ItemsQueryParams
): AppThunk => async (dispatch) => {
  dispatch(fetchIssuesInProgress());
  try {
    const { data } = await gqlClient.query({
      query: GET_REACTJS_ISSUES(queryParams),
      fetchPolicy: "no-cache",
    });
    dispatch(fetchIssuesSuccess({ data }));
  } catch (error) {
    dispatch(fetchIssuesError({ error }));
  }
};

export default issuesSlice.reducer;
