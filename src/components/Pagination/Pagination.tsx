import { PaginationProps } from '@/app/types/pagination';
import { useCallback, useMemo } from 'react';
import { PaginationButton, PaginationContainer } from './Pagination.styles';

type Props = {
  pagination: PaginationProps;
};

const Pagination = ({ pagination }: Props) => {
  const { currentPage, setPage, totalPages } = pagination;

  const previousDisabled = useMemo(() => currentPage < 2, [currentPage]);
  const nextDisabled = useMemo(() => currentPage >= totalPages, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [setPage, currentPage]);

  const handleNextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [setPage, currentPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  return (
    <PaginationContainer>
      <PaginationButton disabled={previousDisabled} onClick={goToFirstPage}>
        1
      </PaginationButton>
      <PaginationButton disabled={previousDisabled} onClick={handlePreviousPage}>
        {'<'}
      </PaginationButton>
      <PaginationButton className="current">{currentPage}</PaginationButton>
      <PaginationButton disabled={nextDisabled} onClick={handleNextPage}>
        {'>'}
      </PaginationButton>
      <PaginationButton onClick={goToLastPage} disabled={nextDisabled}>
        {totalPages}
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
