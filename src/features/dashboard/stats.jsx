import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numOfDays, numOfCabins }) {
  const numOfBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupationRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numOfNights, 0) /
    (numOfCabins * numOfDays);

  return (
    <>
      <Stat
        title="Bookings"
        value={numOfBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(totalSales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Checks in"
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupationRate * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
