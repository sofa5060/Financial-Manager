import {
  ActionsEnum,
  FeaturesEnum,
  FeaturesList,
} from "@/components/settings/subpages/Permissions/schema";
import { handleAxiosError } from "@/lib/utils";
import axios, { AxiosError } from "axios";

class PermissionsManager {
  static async getPermissionsList(
    feature: FeaturesEnum,
    id: number,
    type: "group" | "user"
  ): Promise<FeaturesList | undefined> {
    try {
      const response = await axios.get(
        `/api/permission?feature=${feature}&${
          type === "user" ? `user_id=${id}` : `group_id=${id}`
        }`
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }

  static async modifyPermissions(
    feature: FeaturesEnum,
    actions: ActionsEnum[],
    ids: number[],
    type: "group" | "user",
    status: boolean
  ): Promise<{ status: string } | undefined> {
    try {
      const response = await axios.post("/api/permission", {
        feature,
        action: actions,
        users: type === "user" ? ids : undefined,
        groups: type === "group" ? ids : undefined,
        status,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      handleAxiosError(error as AxiosError);
    }
  }
}

export default PermissionsManager;
