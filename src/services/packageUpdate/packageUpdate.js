import qs from "qs";

/* 套餐升级 */
export async function updateToSs(params) {
  return serviceRequest(`${BASE_URL}/ss/updateToSs`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(params)
  });
}
