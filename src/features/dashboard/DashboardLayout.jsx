import styled from "styled-components";
import useRecentBookigns from "./useRecentBookigns";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookigns();
  const {
    isLoading: isLoadingStays,

    confirmedStays,
    numOfDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabin();
  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numOfDays={numOfDays}
        numOfCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numOfDays={numOfDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
