import dataService from "@/services/dataService";
import ViewAndEditRole from "../components/ViewAndEditRole";
import { IResponse, IUser } from "@/types";
import { Link } from "@/i18n/routing";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function ViewUserDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const t = await getTranslations();

  async function fetchUserDetails(userId: string): Promise<IUser | null> {
    const userDetailsResponse: IResponse<IUser> =
      await dataService.getUserDetails(userId);
    if (!userDetailsResponse.success) {
      return null;
    }
    return userDetailsResponse.data;
  }

  const user: IUser | null = await fetchUserDetails(id);

  if (!user) {
    return (
      <p className="text-red-500">
        {t("Pages.UserPages.Errors.Error in fetching user data")}
      </p>
    );
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

  return (
    <div className="max-w-lg bg-gray-100 p-6 pb-10 bg-gray-200 rounded-md shadow-md border border-slate-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("Pages.UserPages.User details")}
        </h1>
        <Link
          href="/view-users"
          className="h-fit text-gray-800 font-semibold bg-gray-300 border border-slate-500 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
        >
          {t("Common.Back")}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-gray-700">
          {t("Pages.UserPages.ID")}:
          <span className="font-semibold text-lg ml-2.5">{user.id}</span>
        </div>
        <div className="text-gray-700">
          {t("Pages.UserPages.Name")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.name}</span>
        </div>
        <div className="text-gray-700">
          {t("Pages.UserPages.Surname")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.surname}</span>
        </div>
        <div className="text-gray-700">
          {t("Pages.UserPages.Username")}:{" "}
          <span className="font-semibold text-lg ml-2.5">{user.username}</span>
        </div>
        {user.role === "Admin" ? (
          <div className="text-gray-700">
            {t("Pages.UserPages.Role")}:{" "}
            <span className="font-semibold text-lg ml-2.5">
              {t(`Pages.UserPages.${user.role}`)}
            </span>
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
