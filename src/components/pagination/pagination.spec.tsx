import { fireEvent, render } from "@testing-library/react";
import { Pagination, PaginationProps } from "./pagination";
import { screen } from "@testing-library/react";

describe("Header Component", () => {
  const props: PaginationProps = {
    next: jest.fn(),
    previous: jest.fn(),
    isNextDisabled: false,
    isPreviousDisabled: false,
  };
  it("Should render Header component", async () => {
    render(<Pagination {...props} />);

    expect(screen.getByText(/Previous/)).toBeInTheDocument();
    expect(screen.getByText(/Next/)).toBeInTheDocument();
  });

  it("Should trigger 'next' when Next button is clicked", async () => {
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText(/Next/));

    expect(props.next).toHaveBeenCalled();
  });

  it("Should trigger 'previous' when Previous button is clicked", async () => {
    render(<Pagination {...props} />);

    fireEvent.click(screen.getByText(/Previous/));

    expect(props.previous).toHaveBeenCalled();
  });
});
