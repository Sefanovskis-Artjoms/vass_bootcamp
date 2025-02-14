import dataService from "@/services/dataService";
import { IResponse, IUser } from "@/types";
import { getTranslations } from "next-intl/server";
import UserTable from "@/app/components/UserTable";
import UserSearchBar from "@/app/components/UserSearchBar";

export default async function ViewUsers() {
  const userData: IUser[] | null = await fetchUserData();
  const t = await getTranslations("Common");

  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserDataResponse: IResponse<IUser[]> =
      await dataService.getAllUsers();
    if (!getUserDataResponse.success) {
      return null;
    }
    return getUserDataResponse.data;
  }

  if (userData === null) {
    return (
      <p className="text-red-500">{t("Errors.Error in fetching user data")}</p>
    );
  }

  return (
    <>
      <UserSearchBar namespace="viewUsers" />
      <UserTable data={userData} />
    </>
  );
}
