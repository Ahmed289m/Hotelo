import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Successfully Checked In`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("there was an error with checking in"),
  });
  return { checkIn, isChecking };
}

export default useCheckIn;
