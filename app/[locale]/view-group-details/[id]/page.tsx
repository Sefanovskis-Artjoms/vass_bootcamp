import dataService from "@/services/dataService";
import { IGroup, IResponse, IUser } from "@/types";
import ClientPage from "../components/ClientPage";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function ViewGroupDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [t, userData, groupData] = await Promise.all([
    getTranslations("Common"),
    fetchUserData(),
    fetchGroupDetails(id),
  ]);

  async function fetchGroupDetails(groupID: string): Promise<IGroup | null> {
    const groupDetailsResponse: IResponse<IGroup> =
      await dataService.getGroupById(groupID);
    if (!groupDetailsResponse.success) {
      return null;
    }
    return groupDetailsResponse.data;
  }

  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserDataResponse: IResponse<IUser[]> =
      await dataService.getAllUsers();
    if (!getUserDataResponse.success) {
      return null;
    }
    return getUserDataResponse.data;
  }

  const addUserToGroup = async function (
    userId: string
  ): Promise<IResponse<IGroup>> {
    "use server";
    const response: IResponse<IGroup> = await dataService.addUserToGroup(
      id,
      userId
    );
    if (response.success) {
      revalidateTag("oneGroupData");
      revalidateTag("groupData");
    }
    return response;
  };

  const removeUserFromGroup = async function (
    userId: string
  ): Promise<IResponse<IGroup>> {
    "use server";
    const response: IResponse<IGroup> = await dataService.removeUserFromGroup(
      id,
      userId
    );
    if (response.success) {
      revalidateTag("oneGroupData");
      revalidateTag("groupData");
    }
    return response;
  };

  if (groupData === null || userData === null) {
    return (
      <p className="text-red-500">{t("Errors.Error while fetching data")}</p>
    );
  }

  return (
    <ClientPage
      userData={userData}
      groupData={groupData}
      addUserToGroupAction={addUserToGroup}
      removeUserFromGroupAction={removeUserFromGroup}
    />
  );
}
