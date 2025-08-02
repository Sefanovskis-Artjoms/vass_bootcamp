import dataService from "@/services/dataService";
import ViewAndEditRole from "../components/ViewAndEditRole";
import { IResponse, IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import ButtonBack from "@/app/components/ButtonBack";

export default async function ViewUserDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [t, user] = await Promise.all([
    getTranslations("Pages.UserPages"),
    fetchUserDetails(id),
  ]);

  async function fetchUserDetails(userId: string): Promise<IUser | null> {
    const userDetailsResponse: IResponse<IUser> =
      await dataService.getUserDetails(userId);
    if (!userDetailsResponse.success) {
      return null;
    }
    return userDetailsResponse.data;
  }

  const editRoleAction = async function (newUserRole: Partial<IUser>) {
    "use server";
    const response: IResponse<IUser> = await dataService.updateUser(
      newUserRole
    );
    if (response.success) {
      revalidateTag("userData");
    }
    return response;
  };

  if (user === null) {
    return (
      <p className="text-red-500">{t("Errors.Error in fetching user data")}</p>
    );
  }

  return (
    <div className="max-w-lg bg-gray-100 p-6 pb-10 bg-gray-200 rounded-md shadow-md border border-slate-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("User details")}
        </h1>
        <ButtonBack />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-gray-700">
          {t("ID")}:
          <span className="font-semibold text-lg ml-2.5">{user.id}</span>
        </div>
        <div className="text-gray-700">
          {t("Name")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.name}</span>
        </div>
        <div className="text-gray-700">
          {t("Surname")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.surname}</span>
        </div>
        <div className="text-gray-700">
          {t("Username")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.username}</span>
        </div>
        {user.role === "Admin" ? (
          <div className="text-gray-700">
            {t("Role")}:{" "}
            <span className="font-semibold text-lg ml-2.5">{t(user.role)}</span>
          </div>
        ) : (
          <ViewAndEditRole
            user={{ id: user.id, role: user.role }}
            handleEditAction={editRoleAction}
          />
        )}
      </div>
    </div>
  );
}
