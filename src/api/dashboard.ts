import { dashboardMock } from "../mocks/dashboard.mock";
export async function getDashboardSummary() {
  // Simula un tiempo de carga como si consultara una API real
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dashboardMock;
}
