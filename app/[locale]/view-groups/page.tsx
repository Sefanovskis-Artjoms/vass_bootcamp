import { IResponse, IGroup } from "@/types";
import { v4 as uuidv4 } from "uuid";
import dataService from "@/services/dataService";
import GroupTable from "@/app/components/GroupTable";
import AddGroupCard from "@/app/components/AddGroupCard";
import GroupSearchBar from "@/app/components/GroupSearcBar";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function ViewGroups() {
  const [t, groupData] = await Promise.all([
    getTranslations("Common"),
    fetchGroupData(),
  ]);

  async function fetchGroupData(): Promise<IGroup[] | null> {
    const getAllGroupsResponse: IResponse<IGroup[]> =
      await dataService.getAllGroups();
    if (!getAllGroupsResponse.success) {
      return null;
    }
    return getAllGroupsResponse.data;
  }

  async function handleAdd(name: string) {
    "use server";
    const addGroupResponse: IResponse<IGroup> = await dataService.addGroup({
      id: uuidv4(),
      name,
      users: [],
    });
    if (addGroupResponse.success) {
      revalidateTag("groupData");
    }
    return addGroupResponse;
  }

  async function handleDelete(id: string) {
    "use server";
    const deleteGroupResponse: IResponse = await dataService.deleteGroup(id);
    if (deleteGroupResponse.success) {
      revalidateTag("groupData");
    }
    return deleteGroupResponse;
  }

  if (groupData === null) {
    return <p className="text-red-500">{t("Errors.Error in fetching data")}</p>;
  }

  return (
    <>
      <AddGroupCard onAddAction={handleAdd} />
      <GroupSearchBar />
      <GroupTable data={groupData} onDeleteAction={handleDelete} />
    </>
  );
}
