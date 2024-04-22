import { NewReport, Report } from "@/components/settings/subpages/Reports/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type ReportResponse = {
  reports: Report[];
  totalPages: number;
  totalBanks: number;
};

class ReportsManager {
  static async getReports(
    page: number = 1,
    size: number = 1000
  ): Promise<ReportResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/report-name?page=${page}&size=${size}`
      );
      console.log(response);
      return {
        reports: response.data.data,
        totalPages: response.data.total_pages,
        totalBanks: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async createReport(report: NewReport): Promise<Report | undefined> {
    try {
      const response = await axios.post(`/api/report-name`, report);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateReport(
    report: NewReport,
    reportId: number
  ): Promise<Report | undefined> {
    try {
      const response = await axios.put(`/api/report-name/${reportId}`, report);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteReport(reportId: number): Promise<void> {
    try {
      await axios.delete(`/api/report-name/${reportId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default ReportsManager;
