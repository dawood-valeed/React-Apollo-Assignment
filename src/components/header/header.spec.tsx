import { fireEvent, render } from "@testing-library/react";
import { Header, HeaderProps } from "./header";
import { screen } from "@testing-library/react";

describe("Header Component", () => {
  const props: HeaderProps = {
    fetchOpenIssues: jest.fn(),
    fetchClosedIssues: jest.fn(),
  };
  it("Should render Header component", async () => {
    render(<Header {...props} />);

    expect(screen.getByText(/Github Issue List for/)).toBeInTheDocument();
    expect(screen.getByText(/Open Issues/)).toBeInTheDocument();
    expect(screen.getByText(/Closed Issues/)).toBeInTheDocument();
  });

  it("Should trigger 'fetchOpenIssues' when Open Issues button is clicked", async () => {
    render(<Header {...props} />);

    fireEvent.click(screen.getByText(/Open Issues/));

    expect(props.fetchOpenIssues).toHaveBeenCalled();
  });

  it("Should trigger 'fetchClosedIssues' when Closed Issues button is clicked", async () => {
    render(<Header {...props} />);

    fireEvent.click(screen.getByText(/Closed Issues/));

    expect(props.fetchClosedIssues).toHaveBeenCalled();
  });
});
