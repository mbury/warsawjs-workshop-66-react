import React from 'react';

const Paginate = ({ pageSize = 10, children }) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(
    () =>
      window.window.scroll({
        top: 0,
      }),
    [page]
  );

  const next = () => setPage((page) => page + 1);
  const previous = () => setPage((page) => (page === 1 ? page : page - 1));
  const paginate = (data) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return data.slice(start, end);
  };
  return <div>{children(page, paginate, next, previous)}</div>;
};

export default Paginate;
