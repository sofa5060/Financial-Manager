// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Template } from "@/components/Templates/schema";
import { Transaction } from "@/components/Transactions/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type TemplatesResponse = {
  templates: Template[];
  totalPages: number;
  totalTemplates: number;
};

class TemplatesManager {
  static async getTemplates(
    page: number = 1,
    size: number = 1000
  ): Promise<TemplatesResponse | undefined> {
    try {
      const response = await axios.get(
        `/api/template?page=${page}&size=${size}`
      );
      console.log(response);
      return {
        templates: response.data.data,
        totalPages: response.data.total_pages,
        totalTemplates: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async getTemplate(templateId: number): Promise<Template | undefined> {
    try {
      const response = await axios.get(`/api/template/${templateId}`);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async addTemplate(entry_id: number): Promise<Template | undefined> {
    try {
      const response = await axios.post("/api/template", { entry_id });
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateTemplate(
    template: Template,
    templateId: number
  ): Promise<Template | undefined> {
    const tempTransactions = JSON.parse(JSON.stringify(template.transactions));

    tempTransactions.map((transaction: Transaction) => {
      delete transaction.company_id;
      delete transaction.created_at;
      delete transaction.entry_templete_id;
      delete transaction.id;
      delete transaction.updated_at;
      delete transaction.date;
    });
    delete template.date;
    template.transactions = tempTransactions;
    try {
      const response = await axios.put(`/api/template/${templateId}`, template);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteTemplate(templateId: number): Promise<void> {
    try {
      await axios.delete(`/api/template/${templateId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default TemplatesManager;
