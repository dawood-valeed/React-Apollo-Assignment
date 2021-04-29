import { renderWithStore } from "../../utils/renderWithStore";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Issues } from "./Issues";
import { fireEvent, screen } from "@testing-library/react";

const mockStore = configureStore([thunk]);

const storeLoading = mockStore({
  issues: {
    loading: true,
  },
});

const storeError = mockStore({
  issues: {
    error: true,
  },
});

const storeSuccess = mockStore({
  issues: {
    loading: false,
    data: {
      repository: {
        issues: {
          nodes: [
            {
              author: {
                login: "SampleGithubUser",
              },
              createdAt: "2021-04-28T09:02:57Z",
              id: "sampleId",
              number: 3663,
              state: "OPEN",
              title: "Sample title for reactjs issue",
            },
          ],
          pageInfo: {
            endCursor: "sampleEndCursorString",
            hasNextPage: true,
            hasPreviousPage: true,
            startCursor: "sampleStartCursorString",
          },
        },
      },
    },
  },
});

describe("Issues Container", () => {
  it("Should render loading state", async () => {
    renderWithStore(<Issues />, storeLoading);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Should render error state", async () => {
    renderWithStore(<Issues />, storeError);

    expect(
      screen.getByText("We encountered an unexpected error, please try again.")
    ).toBeInTheDocument();
  });

  it("Should render success state", async () => {
    renderWithStore(<Issues />, storeSuccess);

    expect(
      screen.getByText("Sample title for reactjs issue")
    ).toBeInTheDocument();
  });

  it("Should click Open Issues pill", async () => {
    renderWithStore(<Issues />, storeSuccess);

    const openIssuesPill = screen.getByText(/Open Issues/);
    expect(openIssuesPill).toBeInTheDocument();
    fireEvent.click(openIssuesPill);
    screen.getByText("Sample title for reactjs issue");
  });

  it("Should click Closed Issues pill", async () => {
    renderWithStore(<Issues />, storeSuccess);

    const closedIssuesPill = screen.getByText(/Closed Issues/);
    expect(closedIssuesPill).toBeInTheDocument();
    fireEvent.click(closedIssuesPill);
    screen.getByText("Sample title for reactjs issue");
  });

  it("Should click Previous Button", async () => {
    renderWithStore(<Issues />, storeSuccess);

    const previousButton = screen.getByText(/Previous/);
    expect(previousButton).toBeInTheDocument();
    fireEvent.click(previousButton);
    screen.getByText("Sample title for reactjs issue");
  });

  it("Should click Next Button", async () => {
    renderWithStore(<Issues />, storeSuccess);

    const nextButton = screen.getByText(/Next/);
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    screen.getByText("Sample title for reactjs issue");
  });
});
