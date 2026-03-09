import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

export const Pagination = ({
  start,
  end,
  totalPages,
  totalCourses,
  setCurrentPage,
} : {
  start: number,
  end: number,
  totalPages: number,
  totalCourses: number,
  setCurrentPage: (value: number) => void
}) => {
  return (
    <div className="flex mt-2">
      <button className="rounded-md py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:bg-slate-700 focus:text-white        disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer">
        <GrFormPrevious />
      </button>
      {
        Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            key={n} 
            className="min-w-9 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer">
            {n}
          </button>
        ))
      }
      <button className="rounded-md py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 hover:bg-slate-700 focus:text-white        disabled:opacity-50 disabled:shadow-none ml-2 cursor-pointer">
        <MdNavigateNext />
      </button>
    </div>
  )
}
