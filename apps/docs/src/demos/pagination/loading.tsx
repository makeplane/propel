import { Pagination } from "@makeplane/propel/components/pagination";

export default function LoadingDemo() {
  return <Pagination page={3} pageCount={25} onPageChange={() => {}} loading />;
}
