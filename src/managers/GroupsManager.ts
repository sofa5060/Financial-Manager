import { Group, NewGroup } from "@/components/settings/subpages/Gropus/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

type GroupsResponse = {
  groups: Group[];
  totalPages: number;
  totalGroups: number;
};

class GroupsManager {
  static async getGroups(
    page: number = 1,
    size: number = 10
  ): Promise<GroupsResponse | undefined> {
    try {
      const response = await axios.get(`/api/group?page=${page}&size=${size}`);
      console.log(response);
      return {
        groups: response.data.data,
        totalPages: response.data.total_pages,
        totalGroups: response.data.total,
      };
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async createGroup(group: NewGroup): Promise<Group | undefined> {
    try {
      const response = await axios.post(`/api/group`, group);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async updateGroup(
    group: NewGroup,
    groupId: number
  ): Promise<Group | undefined> {
    try {
      const response = await axios.put(`/api/group/${groupId}`, group);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  static async deleteGroup(groupId: number): Promise<void> {
    try {
      await axios.delete(`/api/group/${groupId}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
}

export default GroupsManager;
