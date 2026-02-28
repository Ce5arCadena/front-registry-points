import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useApi } from "../../utils/useApi";
import { type Course, type CoursesInterface } from "../../shared/interfaces/courses";

export const useCourses = () => {
    const [loading, setloading] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);

    const getCourses = async() => {
        setloading(true);
        try {
            const responseCourses = await useApi<CoursesInterface>('/grades');
            const dataCourses = responseCourses.data && responseCourses.data.length > 0 ? responseCourses.data : [];
            setCourses(dataCourses);
        } catch (error) {
            toast.error('Ha ocurrido un error al obtener los cursos. Comuniquese.');
        } finally {
            setloading(false);
        };
    };

    useEffect(() => {
        getCourses();
    }, []);

    return {
        loading,
        courses,
        getCourses
    };
}