import { Pagination } from "@mantine/core";

interface CustomPaginationProps {
  handlePageChange: (page: number) => void;
  page: number;
  total: any;
  limit: number;
}
const CustomPagination: React.FC<CustomPaginationProps> = ({
  handlePageChange,
  page,
  total,
  limit,
}) => {
  const totalCount = Math.ceil(total / limit);
  console.log(total, totalCount, total / limit, "hhjdsjdsjhshd");
  return (
    <Pagination
      total={totalCount}
      value={page}
      onChange={handlePageChange}
      getItemProps={(page) => ({
        onClick: () => {
          handlePageChange(page);
        },
      })}
    />
  );
};
export default CustomPagination;
