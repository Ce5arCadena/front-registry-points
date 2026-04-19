import { type Student } from "../../shared/interfaces/students";
import { type PaginateClickEvent } from "../../shared/interfaces";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export const useStudentsPagination = ({
  students,
  totalStudents,
  setCurrentPage
}: {
  students: Student[],
  totalStudents: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}) => {
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  
  const dataStudents = useMemo(() => {
    if (!students) return [];
    // setSelectedIds([]);

    const endOffset = itemOffset + perPage;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + perPage, students.length));

    return students.slice(itemOffset, endOffset);
  }, [itemOffset, students]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;
    console.log(event, pageCount, students.length, totalStudents)

    if (event.nextSelectedPage === pageCount - 1 && students.length < totalStudents) setCurrentPage(prev => prev + 1);
    if (event.nextSelectedPage === 0) setCurrentPage(1);
    const newOffset = (event.nextSelectedPage * perPage) % students.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setPageCount(Math.ceil(students.length / perPage));
  }, [students]);

  return {
    end, 
    start,
    pageCount,
    dataStudents,
    handlePageClick
  }
};
