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
    <div className='flex justify-between'>
      <span>Mostrando del {start} al {end} de {total} registros </span>
      <ReactPaginate
        className="flex items-center gap-1"
        pageClassName="rounded-lg overflow-hidden"
        pageLinkClassName="flex items-center justify-center w-9 h-9 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors duration-150"
        activeClassName="!bg-zinc-700"
        activeLinkClassName="!text-white"
        previousClassName="rounded-lg overflow-hidden"
        previousLinkClassName="flex items-center justify-center w-9 h-9 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors duration-150"
        nextClassName="rounded-lg overflow-hidden"
        nextLinkClassName="flex items-center justify-center w-9 h-9 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors duration-150"
        breakClassName="rounded-lg overflow-hidden"
        breakLinkClassName="flex items-center justify-center w-9 h-9 text-sm font-medium text-zinc-500"
        disabledClassName="opacity-30 cursor-not-allowed"
        breakLabel="..."
        nextLabel=">"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onClick={handlePageClick}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
