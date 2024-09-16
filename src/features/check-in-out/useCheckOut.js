import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Successfully Checked Out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error with checking Out"),
  });
  return { checkOut, isCheckOut };
}

export default useCheckOut;
