import { Fragment, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Pagination, Header } from "../../components";
import { RootState } from "../../slices";
import { fetchReactJsRepoIssues, ItemsQueryParams } from "../../slices/issues";

export const Issues = (): ReactElement => {
  const recordsPerPage = 12;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.issues
  );
  const [queryParams, setQueryParam] = useState<ItemsQueryParams>({
    recordsPerPage,
    state: "OPEN",
  });

  useEffect(() => {
    dispatch(fetchReactJsRepoIssues(queryParams));
  }, [dispatch, queryParams]);

  const previous = () => {
    const newQueryParams = {
      recordsPerPage,
      state: queryParams.state,
      before: data?.repository.issues.pageInfo.startCursor,
    };
    setQueryParam({ ...newQueryParams });
  };

  const next = () => {
    const newQueryParams = {
      recordsPerPage,
      state: queryParams.state,
      after: data?.repository.issues.pageInfo.endCursor,
    };
    setQueryParam({ ...newQueryParams });
  };

  const fetchOpenIssues = () => {
    const newQueryParams: ItemsQueryParams = {
      recordsPerPage,
      state: "OPEN",
    };
    setQueryParam({ ...newQueryParams });
  };

  const fetchClosedIssues = () => {
    const newQueryParams: ItemsQueryParams = {
      recordsPerPage,
      state: "CLOSED",
    };
    setQueryParam({ ...newQueryParams });
  };

  return (
    <div>
      <Header
        fetchOpenIssues={fetchOpenIssues}
        fetchClosedIssues={fetchClosedIssues}
      />
      {error && <div>We encountered an unexpected error, please try again.</div>}
      {loading && <div>Loading...</div>}
      {data?.repository.issues.nodes.map((node) => (
        <Fragment key={node.id}>
          <Row node={node} />
        </Fragment>
      ))}
      <Pagination
        next={next}
        previous={previous}
        isNextDisabled={
          loading || !data?.repository.issues.pageInfo.hasNextPage
        }
        isPreviousDisabled={
          loading || !data?.repository.issues.pageInfo.hasPreviousPage
        }
      />
    </div>
  );
};
