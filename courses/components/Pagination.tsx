import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

export const Pagination = ({
  start,
  end,
  totalPages,
  currentPage,
  totalCourses,
  setCurrentPage,
  totalSectionsPages,
  currentSectionPage,
  setCurrentSectionPage
}: {
  start: number,
  end: number,
  totalPages: number,
  currentPage: number,
  totalCourses: number,
  currentSectionPage: number,
  totalSectionsPages: number,
  setCurrentPage: (value: number) => void,
  setCurrentSectionPage: (value: number) => void,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className='flex'>
        <button
          className="rounded-md w-8 h-8 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-900 hover:bg-slate-700 focus:text-white cursor-pointer disabled:opacity-40 disabled:bg-slate-900 disabled:shadow-none disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
        </button>
        {
          Array.from({ length: totalSectionsPages }, (_, i) => i + 1).map(n => (
            <button
              onClick={() => setCurrentSectionPage(n)}
              key={n}
              className={`rounded-md w-8 h-8 py-1 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none  hover:bg-slate-700 ml-2 cursor-pointer ${currentSectionPage === n ? 'bg-slate-700' : 'bg-slate-900'}`}
            >
              {n}
            </button>
          ))
        }
        <button
          className="rounded-md w-8 h-8 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-900 hover:bg-slate-900 focus:text-white ml-2 cursor-pointer disabled:opacity-40 disabled:bg-slate-800 disabled:shadow-none disabled:cursor-not-allowed"
          disabled={totalPages === currentPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className=''>
        <h3>Mostrando desde {start} hasta el {end} de un total de {totalCourses} registros</h3>
      </div>
    </div>
  )
}
