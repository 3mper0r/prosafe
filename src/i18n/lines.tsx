import { Fragment } from "react";

/** Render dictionary lines separated by <br />, matching the original multi-line headings. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
