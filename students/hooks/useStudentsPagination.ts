import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { type PaginateClickEvent } from "../../shared/interfaces";
import { currentPageAtom, dataStudentsAtom, studentsAtom, totalStudentsAtom } from "../store/studentsStore";

export const useStudentsPagination = () => {
  const students = useAtomValue(studentsAtom);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setStudentsData = useSetAtom(dataStudentsAtom);
  const totalStudents = useAtomValue(totalStudentsAtom);

  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  
  const dataStudents = useMemo(() => {
    if (!students) return [];

    const endOffset = itemOffset + perPage;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + perPage, students.length));
    const paginated = students.slice(itemOffset, endOffset);

    return paginated;
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

  useEffect(() => {
    setStudentsData(dataStudents);
  }, [dataStudents]);

  return {
    end, 
    start,
    pageCount,
    dataStudents,
    handlePageClick
  }
};
