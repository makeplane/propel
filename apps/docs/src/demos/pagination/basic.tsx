import { Pagination } from "@makeplane/propel/components/pagination";
import * as React from "react";

export default function BasicDemo() {
  const [page, setPage] = React.useState(1);

  return <Pagination page={page} pageCount={25} onPageChange={setPage} />;
}
