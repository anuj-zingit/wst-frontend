import instance from "../Utilities/axios";
import wrapper from "../Utilities/wrapper";

const lookUpCarrier = async (body) => await wrapper(instance.post("/gateway/workstation/carrier/default.asp", { ...body }))

export { lookUpCarrier };
