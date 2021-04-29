import { render } from "@testing-library/react";
import { Row, RowProps } from "./row";
import { screen } from "@testing-library/react";

describe("Row Component", () => {
  const props: RowProps = {
    node: {
      id: "Mock Id",
      title: "Mock Issue",
      createdAt: "2021-04-28T09:02:57Z",
      author: { login: "mockAuthorId" },
      number: 123,
      state: "OPEN",
    },
  };
  it("Should render Row component with Open Issue", async () => {
    render(<Row {...props} />);

    expect(screen.getByText(/Mock Issue/)).toBeInTheDocument();
    expect(screen.getByTestId("open-icon")).toBeInTheDocument();
  });

  it("Should render Row component with Closed Issue", async () => {
    render(<Row {...{ node: {...props.node, state: "CLOSED"} }} />);

    expect(screen.getByText(/Mock Issue/)).toBeInTheDocument();
    expect(screen.getByTestId("closed-icon")).toBeInTheDocument();
  });
});
