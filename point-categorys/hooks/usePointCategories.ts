import {
  endAtom,
  startAtom,
  loadingAtom,
  pageCountAtom,
  itemOffsetAtom,
  actionModalAtom,
  pointCategoryAtom,
  pointCategorysAtom,
  currentPageAtom,
  totalPointCategoriesAtom,
  idsPointCategoriesAtom,
} from "../store/pointCategoryStore";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAtom, useSetAtom } from "jotai";
import { type PaginateClickEvent } from "../../shared/interfaces";
import { createPointCategories, getPointCategories } from "../api/queries";
import { type FormPointCategory } from "../../shared/interfaces/pointCategories";

const PERPAGE = 12;

export const usePointCategories = () => {
  const navigate = useNavigate();
  const setEnd = useSetAtom(endAtom);
  const setStart = useSetAtom(startAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setActionModal = useSetAtom(actionModalAtom);
  const [pageCount, setPageCount] = useAtom(pageCountAtom);
  const [itemOffset, setItemOffset] = useAtom(itemOffsetAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [pointCategory, setPointCategory] = useAtom(pointCategoryAtom);
  const [pointCategories, setPointCategories] = useAtom(pointCategorysAtom);
  const [idsPointCategories, setIdsPointCategories] = useAtom(idsPointCategoriesAtom);
  const [totalPointCategories, setTotalPointCategories] = useAtom(totalPointCategoriesAtom);

  const getInitialData = async () => {
    setLoading(true);
    try {
      const response = await getPointCategories(currentPage);
      console.log(response.data);
      setTotalPointCategories(response.data.length);
      setPointCategories(prev => [...prev, ...response.data]);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener las categorías de puntos. Comuniquese.');
      navigate('/auth/login');
      return;
    } finally {
      setLoading(false);
    };
  };

  const dataPointCategories = useMemo(() => {
    if (!pointCategories) return [];
    const endOffset = itemOffset + PERPAGE;
    setStart(itemOffset + 1);
    setEnd(Math.min(itemOffset + PERPAGE, pointCategories.length));
    return pointCategories.slice(itemOffset, endOffset);
  }, [itemOffset, pointCategories]);

  const getIdsPointCategories = () => {
    if (idsPointCategories.length === pointCategories.length) {
      setIdsPointCategories([]);
    } else {
      const ids = pointCategories.map(pointCategory => pointCategory.id);
      setIdsPointCategories(ids);
    }
  };

  const toggleOne = (id: number) => {
    const idExist = [...idsPointCategories].find(ids => ids === id);
    if (idExist) {
      setIdsPointCategories(prev => prev.filter(ids => ids !== id));
    } else {
      setIdsPointCategories(prev => [...prev, id]);
    }
  }

  const createAndUpdatePointCategory = async (data: FormPointCategory, METHOD: 'POST' | 'PUT'): Promise<boolean> => {
    setLoading(true);
    try {
      const URL = METHOD === 'POST' ? '/point-categories' : `/point-categories/${pointCategory?.id}`;
      const responseCreatePointCategory = await createPointCategories(data, METHOD, URL);
      if (responseCreatePointCategory.ok !== 200 && responseCreatePointCategory.errors) {
        const errors = responseCreatePointCategory.errors?.join(" ");
        toast.error(errors);
        return false;
      };

      toast.success(responseCreatePointCategory.message);
      setPointCategories(responseCreatePointCategory.data);
      setPointCategory(undefined);
      setActionModal("");
      return true;
    } catch (error) {
      toast.error('Ha ocurrido un error al crear la categoría de puntos. Comuniquese.');
      navigate('/auth/login');
      return false;
    } finally {
      setLoading(false);
    };
  };

  const handlePageClick = (event: PaginateClickEvent) => {
    if (event.nextSelectedPage === undefined) return;

    if (event.nextSelectedPage === pageCount - 1 && pointCategories.length < totalPointCategories) setCurrentPage(prev => prev + 1);
    const newOffset = (event.nextSelectedPage * PERPAGE) % pointCategories.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setPageCount(Math.ceil(pointCategories.length / PERPAGE));
  }, [pointCategories]);

  useEffect(() => {
    if (currentPage > 1) {
      getInitialData();
    }
  }, [currentPage]);

  useEffect(() => {
    setPointCategories([]);
    getInitialData();
  }, []);

  return {
    toggleOne,
    handlePageClick,
    dataPointCategories,
    getIdsPointCategories,
    createAndUpdatePointCategory
  }
}
