import "./pagination.css";

export interface PaginationProps {
  next: Function;
  previous: Function;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
}

export const Pagination = ({
  next,
  previous,
  isNextDisabled,
  isPreviousDisabled,
}: PaginationProps) => (
  <div className="paginator">
    <button className="previous" disabled={isPreviousDisabled} onClick={() => previous()}>
    &laquo; Previous
    </button>
    <button className="next" disabled={isNextDisabled} onClick={() => next()}>
      Next &raquo;
    </button>
  </div>
);
