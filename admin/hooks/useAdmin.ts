import { useAtomValue } from "jotai";
import { toast } from "react-hot-toast";
import { useApi } from "../../utils/useApi";
import { useEffect, useState } from "react";
import { ActionSchool, SchoolAtom } from "../store/AdminStore";
import type { FormSchoolData, School, SchoolResponse, SchoolsInterface } from "../../shared/interfaces/schools";

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);

  const schoolAction = useAtomValue(ActionSchool);
  const schoolAtomValue = useAtomValue(SchoolAtom);
  const [schools, setSchools] = useState<School[]>([]);
  const [showModalAddSchool, setShowModalAddSchool] = useState(false);

  const deleteSchool = async (id: number) => {
    setLoading(true);
    try {
      const URL = `/schools/${id}`;
      const responseSchools = await useApi<SchoolResponse>(URL, 'DELETE');
      toast(responseSchools.message, {
        icon: responseSchools.ok ? "✅" : "❌"
      });

      if (responseSchools.ok) {
        setSchools(() => {
          return schools.filter(school => school.id !== id);
        });
      };
    } catch (error) {
      toast.error('Ha ocurrido un error al eliminar el colegio. Comuniquese.');
    } finally {
      setLoading(false);
    };
  };

  const getSchools = async () => {
    setLoading(true);
    try {
      const responseSchools = await useApi<SchoolsInterface>('/schools');
      const dataSchool = responseSchools.ok && responseSchools.data?.length > 0 ? responseSchools.data : [];
      setSchools(dataSchool);
    } catch (error) {
      toast.error('Ha ocurrido un error al obtener los colegios. Comuniquese.');
    } finally {
      setLoading(false);
    };
  };

  const onSubmit = async (values: FormSchoolData): Promise<boolean> => {
    if (Object.values(values).every(value => value === "")) {
      toast.error("Debes enviar al menos un campo.");
      return false;
    }

    setLoading(true);
    const METHOD = schoolAction === "edit" ? "PATCH" : "POST";
    const URL = schoolAction === "edit" ? `/schools/${schoolAtomValue?.id}` : "/schools";

    if (schoolAction === "edit") {
      let newData = Object.entries(values).map(([key, value]) => {
        if (value !== "") {
          return {
            [key]: value
          }
        }

        return null
      }).filter(value => value !== null);
      values = Object.assign({}, ...newData);
    }

    try {
      const responseSchool = await useApi<SchoolResponse>(URL, METHOD, values);

      const message = responseSchool.errors && responseSchool.errors.length > 0 ? responseSchool.errors.join(" - ") : responseSchool.message;
      toast(message, {
        icon: responseSchool.ok ? "✅" : "❌"
      });
      if (!responseSchool.ok) return false;

      if (schoolAction === "edit") {
        setSchools((prevSchools) => {
          const schools = prevSchools.filter(school => school.id !== schoolAtomValue?.id);

          return [
            ...schools,
            responseSchool.data as School
          ];
        });

        return true;
      } else {
        setSchools((prevSchools) => {
          return [
            ...prevSchools,
            responseSchool.data as School
          ];
        });
        return true;
      }
    } catch (error) {
      toast.error('Ocurrió un error al realizar la petición', {
        duration: 4000,
        position: 'top-right'
      });
      return false;
    } finally {
      setLoading(false);
      return true;
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  return {
    loading,
    schools,
    onSubmit,
    setSchools,
    schoolAction,
    deleteSchool,
    showModalAddSchool,
    setShowModalAddSchool,
  }
};
