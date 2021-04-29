import { createMockClient } from "mock-apollo-client";
import { ItemsQueryParams } from ".";
import issuesReducer, {
  initialState,
  fetchIssuesInProgress,
  fetchIssuesSuccess,
  fetchIssuesError,
  fetchReactJsRepoIssues,
  GET_REACTJS_ISSUES,
} from "./issues.slice";

const dispatch = jest.fn();
const getState = jest.fn();
const mockApolloClient = createMockClient();

describe("Issues Slice", () => {
  afterAll(() => jest.clearAllMocks());

  const samplePayload = { sampleObj: "sample value" };
  const queryParams: ItemsQueryParams = { state: "OPEN", recordsPerPage: 10 };

  it("should handle fetchReactJsRepoIssues success", async () => {
    mockApolloClient.setRequestHandler(
      GET_REACTJS_ISSUES(queryParams),
      (dispatch) => dispatch
    );

    await fetchReactJsRepoIssues(queryParams)(dispatch, getState, null);
    expect(dispatch).toBeCalledWith({ type: fetchIssuesInProgress.type });
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: fetchIssuesSuccess.type,
      })
    );
  });

  it("should handle fetchReactJsRepoIssues failure", async () => {
    await fetchReactJsRepoIssues({
      ...queryParams,
      recordsPerPage: 1,
      after: "wrong params",
      before: "wrong params",
    })(dispatch, getState, null);

    expect(dispatch).toBeCalledWith({ type: fetchIssuesInProgress.type });
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        type: fetchIssuesError.type,
      })
    );
  });

  it("should handle fetchIssuesSuccess", async () => {
    const { data, loading, error } = issuesReducer(initialState, {
      type: fetchIssuesSuccess.type,
      payload: { data: samplePayload },
    });

    expect(data).toMatchObject(samplePayload);
    expect(loading).toEqual(false);
    expect(error).toEqual(null);
  });

  it("should handle fetchIssuesInProgress", async () => {
    const { data, loading, error } = issuesReducer(initialState, {
      type: fetchIssuesInProgress.type,
      payload: { data: samplePayload },
    });

    expect(data).toEqual(undefined);
    expect(loading).toEqual(true);
    expect(error).toEqual(null);
  });

  it("should handle fetchIssuesError", () => {
    const { loading, error } = issuesReducer(initialState, {
      type: fetchIssuesError.type,
      payload: { error: "Error!" },
    });

    expect(loading).toEqual(false);
    expect(error).toEqual("Error!");
  });
});
