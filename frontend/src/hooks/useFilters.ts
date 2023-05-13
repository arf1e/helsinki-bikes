import { useState } from 'react';

export default function useFilters<FormType>(initialValues: FormType) {
  const [filters, setFilters] = useState<FormType>(initialValues);
  const [page, setPage] = useState(1);

  const applyFilters = (filters: FormType) => {
    setFilters(filters);
    setPage(1);
  };

  return { filters, applyFilters, page, setPage };
}
