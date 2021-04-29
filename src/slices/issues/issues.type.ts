export interface IssuesTypeStateModel {
  data?: IssueApiResponse;
  loading: boolean;
  error: any;
}

export interface IssueApiResponse {
  repository: {
    issues: Issue;
  };
}

export interface Issue {
  nodes: Array<Node>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface Node {
  id: string;
  title: string;
  createdAt: string;
  author?: {
    login: string;
  };
  number: number;
  state: states;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface ItemsQueryParams {
  recordsPerPage: number;
  state: states;
  after?: string;
  before?: string;
}

type states = "OPEN" | "CLOSED";
