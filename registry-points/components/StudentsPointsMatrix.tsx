import type { DraftPoints, RegistryPointCategory, RegistryPointStudent } from "../../shared/interfaces/registryPoints";

interface StudentsPointsMatrixProps {
  students: RegistryPointStudent[];
  categories: RegistryPointCategory[];
  draftPoints: DraftPoints;
  hasUnsavedChanges: boolean;
  courseName: string;
  subjectName: string;
  onPointChange: (studentId: number, categoryId: string, value: number) => void;
  onSave: () => void;
  onBack: () => void;
}

const getInitials = (name: string, lastName: string) =>
  `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const totalAssigned = (draftPoints: DraftPoints) =>
  Object.values(draftPoints).reduce(
    (sum, cats) => sum + Object.values(cats).reduce((s, v) => s + v, 0),
    0
  );

export const StudentsPointsMatrix = ({
  students,
  categories,
  draftPoints,
  hasUnsavedChanges,
  courseName,
  subjectName,
  onPointChange,
  onSave,
  onBack,
}: StudentsPointsMatrixProps) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <button
          onClick={onBack}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          ← Volver
        </button>
        <span>·</span>
        <span>{courseName} › {subjectName}</span>
      </div>

      {/* Title */}
      <div className="bg-dark-bg-elevated border-l-8 rounded-r-md flex items-center p-2 rounded-l-xl border-primary">
        <div>
          <h1 className="text-2xl font-bold">
            Registro de puntos — {subjectName} · {courseName}
          </h1>
          <p className="text-sm text-gray-400">
            Año académico {new Date().getFullYear()}. Los cambios se guardan al presionar "Guardar".
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Estudiantes", value: students.length },
          { label: "Categorías", value: categories.length },
          { label: "Puntos asignados", value: totalAssigned(draftPoints) },
        ].map(stat => (
          <div key={stat.label} className="bg-dark-bg-elevated border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Matrix */}
      <div className="flex-1 overflow-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-sm text-white">
          <thead>
            <tr className="bg-dark-bg-elevated border-b border-gray-700">
              <th className="sticky left-0 z-10 bg-dark-bg-elevated text-left px-4 py-3 font-medium text-gray-300 border-r border-gray-700 min-w-48">
                Estudiante
              </th>
              {categories.map(cat => (
                <th key={cat.id} className="text-center px-6 py-3 font-medium text-gray-300 min-w-40">
                  <div>{cat.name}</div>
                  <div className="text-xs text-gray-500 font-normal">máx. {cat.max_points}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const rowBg = idx % 2 === 0 ? 'bg-dark-bg' : 'bg-dark-bg-secondary';
              return (
                <tr key={student.id} className={`border-b border-gray-700 ${rowBg}`}>
                  <td className={`sticky left-0 z-10 px-4 py-3 border-r border-gray-700 ${rowBg}`}>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {getInitials(student.name, student.last_name)}
                      </span>
                      <span className="whitespace-nowrap">
                        {student.name} {student.last_name}
                      </span>
                    </div>
                  </td>
                  {categories.map(cat => {
                    const catId = cat.id.toString();
                    const value = draftPoints[student.id]?.[catId] ?? 0;
                    return (
                      <td key={cat.id} className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            disabled={value <= 0}
                            onClick={() => onPointChange(student.id, catId, value - 1)}
                            className="w-6 h-6 rounded-full border border-gray-600 text-gray-300 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>
                          <span className={`w-6 text-center font-semibold ${value > 0 ? 'text-primary' : 'text-gray-400'}`}>
                            {value}
                          </span>
                          <button
                            disabled={value >= cat.max_points}
                            onClick={() => onPointChange(student.id, catId, value + 1)}
                            className="w-6 h-6 rounded-full border border-gray-600 text-gray-300 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className={`text-sm transition-opacity ${hasUnsavedChanges ? 'text-warning opacity-100' : 'opacity-0'}`}>
          ⚠ Cambios sin guardar
        </span>
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Guardar puntos
        </button>
      </div>
    </div>
  );
};
