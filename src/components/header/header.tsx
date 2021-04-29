import { Fragment } from "react";
import { ReactComponent as OpenIcon } from "../../assets/open.svg";
import { ReactComponent as ClosedIcon } from "../../assets/closed.svg";

import "./header.css";

export interface HeaderProps {
  fetchOpenIssues: Function;
  fetchClosedIssues: Function;
}

export const Header = ({ fetchOpenIssues, fetchClosedIssues }: HeaderProps) => (
  <Fragment>
    <h2 className="heading">
      Github Issue List for
      <i>
        <a
          href="https://github.com/reactjs/reactjs.org/issues"
          target="_blank"
          rel="noreferrer"
        >
          reactjs.org
        </a>
      </i>
    </h2>
    <div className="filter">
      <span className="openBtn" onClick={() => fetchOpenIssues()}>
        <span className="btnIcon">
          <OpenIcon fill="green" />
        </span>
        Open Issues
      </span>
      <span className="closedBtn" onClick={() => fetchClosedIssues()}>
        <span className="btnIcon">
          <ClosedIcon fill="red" />
        </span>
        Closed Issues
      </span>
    </div>
  </Fragment>
);
