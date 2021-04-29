import { ReactElement } from "react";
import { ReactComponent as OpenIcon } from "../../assets/open.svg";
import { ReactComponent as ClosedIcon } from "../../assets/closed.svg";
import { Node } from "../../slices/issues";

import "./row.css";

export interface RowProps {
  node: Node;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export const Row = ({
  node: { title, createdAt, author, number, state },
}: RowProps): ReactElement => (
  <div className="row">
    <h4>
      <span data-testid={`${state.toLocaleLowerCase()}-icon`} className="icon">
        {state === "OPEN" ? (
          <OpenIcon fill="green" />
        ) : (
          <ClosedIcon fill="red" />
        )}
      </span>
      {title}
    </h4>
    <h5>
      <i>#{number}</i> opened at {formatDate(createdAt)} by {author?.login}
    </h5>
    <br />
  </div>
);
