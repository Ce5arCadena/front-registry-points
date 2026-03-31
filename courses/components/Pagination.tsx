import ReactPaginate from 'react-paginate';

export const Pagination = ({
  start,
  end,
  total,
  pageCount,
  handlePageClick,
}: {
  pageCount: number,
  start: number,
  end: number,
  total: number,
  handlePageClick: (event: any) => void,
}) => {
  return (
    <div className=''>
      <span>Mostrando del {start} al {end} de {total} registros </span>
      <ReactPaginate
        className='flex'
        breakLabel="..."
        nextLabel=">"
        pageRangeDisplayed={5}
        pageCount={pageCount}
        onClick={handlePageClick}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
