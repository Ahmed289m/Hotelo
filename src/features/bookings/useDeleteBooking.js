import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: deletingBooking } = useMutation(
    {
      mutationFn: deleteBooking,
      onSuccess: () => {
        toast.success("Booking successfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { deletingBooking, isDeletingBooking };
}

export default useDeleteBooking;
