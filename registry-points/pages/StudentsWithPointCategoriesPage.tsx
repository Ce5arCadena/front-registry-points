import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";

import Loading from "../../shared/components/Loading";
import { loadingAtom } from "../store/registryPointsStore";
import { StudentsPointsMatrix } from "../components/StudentsPointsMatrix";
import useStudentsWithPoinCategories from "../hooks/useStudentsWithPoinCategories";

export const StudentsWithPointCategoriesPage = () => {
  const { course, subject } = useParams();
  const navigate = useNavigate();
  const loading = useAtomValue(loadingAtom);

  const {
    studentsData,
    draftPoints,
    hasUnsavedChanges,
    courseName,
    subjectName,
    fetchStudentsWithCategories,
    handlePointChange,
    savePoints,
  } = useStudentsWithPoinCategories(Number(course), Number(subject));

  useEffect(() => {
    if (!course || !subject) {
      navigate('/registry-points');
      return;
    }
    fetchStudentsWithCategories();
  }, []);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      <Toaster position="top-right" />
      <div className="rounded-lg shadow p-6 h-full flex flex-col gap-2">
        {studentsData && (
          <StudentsPointsMatrix
            students={studentsData.data.students}
            categories={studentsData.data.point_category_contexts}
            draftPoints={draftPoints}
            hasUnsavedChanges={hasUnsavedChanges}
            courseName={courseName}
            subjectName={subjectName}
            onPointChange={handlePointChange}
            onSave={savePoints}
            onBack={() => navigate('/registry-points')}
          />
        )}

        {loading && (
          <div className="absolute bg-dark-bg-secondary/90 w-full h-full top-0 left-0 flex flex-col gap-6 justify-center items-center z-40">
            <Loading />
            <span>Por favor, espere...</span>
          </div>
        )}
      </div>
    </div>
  );
};
