import { useApi } from "../../utils/useApi";
import { type DashboardDataInterface } from "../../shared/interfaces";

export const getInitialDataDashboard = async (): Promise<DashboardDataInterface> => {
  return await useApi(`/info`);
};