import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addOrUpdateCabin } from "../../services/apiCabins";

function useAddCabin() {
  const queryClient = useQueryClient();
  const { mutate: addingCabin, isLoading: isAdding } = useMutation({
    mutationFn: addOrUpdateCabin,
    onSuccess: () => {
      toast.success("new Cabin successfully Added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addingCabin };
}

export default useAddCabin;
