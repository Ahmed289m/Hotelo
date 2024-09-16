import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayAct() {
  const { isLoading, data: acts } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { acts, isLoading };
}

export default useTodayAct;
