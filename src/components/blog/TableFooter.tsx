import { motion } from "framer-motion";
import PaginatedList from "./PaginatedList";

function TableFooter({
  currentPage,
  postsLength,
  total,
  limit,
  onPageChange,
}: {
  currentPage: number;
  postsLength: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex justify-between items-center"
    >
      <div className="px-2">
        <p className="text-[#ececec]">
          Showing {currentPage} to {postsLength || 0} of {total || 0} posts
        </p>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <PaginatedList
          totalcount={total}
          limit={limit}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </motion.div>
    </motion.div>
  );
}

export default TableFooter;
