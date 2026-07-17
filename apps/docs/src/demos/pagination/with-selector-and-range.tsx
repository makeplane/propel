import { Pagination } from "@makeplane/propel/components/pagination";
import * as React from "react";

export default function WithSelectorAndRangeDemo() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);

  return (
    <Pagination
      page={page}
      pageCount={5}
      onPageChange={setPage}
      pageSize={{ value: pageSize, options: [25, 50, 100], onValueChange: setPageSize }}
      range={{ current: "1-50", total: 250 }}
    />
  );
}
