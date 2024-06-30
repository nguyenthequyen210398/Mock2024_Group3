import { format } from "date-fns";

const currentDate = new Date();
export const toDay = format(currentDate, 'yyyy-MM-dd');