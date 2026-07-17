import { Pagination } from "@makeplane/propel/components/pagination";

export default function TruncationDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={() => {}}
        labels={{ root: "All pages visible" }}
      />
      <Pagination
        page={1}
        pageCount={100}
        onPageChange={() => {}}
        labels={{ root: "Near start" }}
      />
      <Pagination page={45} pageCount={100} onPageChange={() => {}} labels={{ root: "Middle" }} />
      <Pagination
        page={100}
        pageCount={100}
        onPageChange={() => {}}
        labels={{ root: "Near end" }}
      />
    </div>
  );
}
