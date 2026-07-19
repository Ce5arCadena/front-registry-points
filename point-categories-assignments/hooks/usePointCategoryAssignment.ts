import {
  endAtom,
  startAtom,
  loadingAtom,
  pageCountAtom,
  itemOffsetAtom,
  currentPageAtom,
  pointsCategorySelectAtom,
  pointCategoriesAssignmentsAtom,
  totalPointCategoriesAssignmentAtom,
} from "../store/pointCategoryAssignmentStore";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { getPointCategories } from "../../point-categorys/api/queries";
import { type PaginateClickEvent } from "../../shared/interfaces";

const PERPAGE = 6;

export const usePointCategoryAssignment = () => {
  const navigate = useNavigate();
  const setEnd = useSetAtom(endAtom);
  const setStart = useSetAtom(startAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [pageCount, setPageCount] = useAtom(pageCountAtom);
  const [itemOffset, setItemOffset] = useAtom(itemOffsetAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const setPointsCategorySelect = useSetAtom(pointsCategorySelectAtom);
  const [pointCategoriesAssignment, setPointCategoriesAssignment] = useAtom(pointCategoriesAssignmentsAtom);
  const [totalPointCategoriesAssignment, setTotalPointCategoriesAssignment] = useAtom(totalPointCategoriesAssignmentAtom);

  const didFetchInitial = useRef(false);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const response = await getPointCategories(currentPage);
      setTotalPointCategoriesAssignment(response.data.length);
      setPointsCategorySelect(response.data.map(pointCategory => ({
        value: String(pointCategory.id),
        label: pointCategory.name
      })));
      setPointCategoriesAssignment(prev => [...prev, ...response.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las asignaciones de categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const dataPointCategoriesAssignment = useMemo(() => {
    if (!pointCategoriesAssignment) return [];
    const endOffset = itemOffset + PERPAGE;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + PERPAGE, pointCategoriesAssignment.length));
    return pointCategoriesAssignment.slice(itemOffset, endOffset);
  }, [itemOffset, pointCategoriesAssignment]);

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && pointCategoriesAssignment.length < totalPointCategoriesAssignment) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * PERPAGE) % pointCategoriesAssignment.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setPageCount(Math.ceil(pointCategoriesAssignment.length / PERPAGE));
  }, [pointCategoriesAssignment]);

  useEffect(() => {
    if (currentPage > 1) {
      getInitialData();
    }
  }, [currentPage]);

  useEffect(() => {
    if(didFetchInitial.current) return;
    didFetchInitial.current = true;

    setPointCategoriesAssignment([]);
    getInitialData();
  }, []);

  return {
    getInitialData,
    handlePageClick,
    dataPointCategoriesAssignment
  }
}
