import { useCourses } from "../hooks/useCourses"

export const HomeCourse = () => {
  const {
    courses,
    loading
  } = useCourses();

  return (
    <div>HomeCourse</div>
  )
}
