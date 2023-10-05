import instance from "../Utilities/axios";
import wrapper from "../Utilities/wrapper";

const getUploadURL = async (body) =>
  await wrapper(
    instance.post("/upload/", { ...body })
  );

export { getUploadURL };
