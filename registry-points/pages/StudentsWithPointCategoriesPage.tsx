import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useStudentsWithPoinCategories from "../hooks/useStudentsWithPoinCategories";

export const StudentsWithPointCategoriesPage = () => {
  const {
    fetchStudentsWithCategories
  } = useStudentsWithPoinCategories();
  const {course, subject} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(course, subject);
    if (!course || !subject) {
      navigate('/registry-points');
      return;
    };

    console.log(course, subject)
    fetchStudentsWithCategories(Number(course), Number(subject));
  }, []);

  return (
    <div className="border border-gray-700 text-white rounded-lg w-full h-full relative">
      Listando estudiantes con sus categorias de puntos para asignar
    </div>
  )
};
