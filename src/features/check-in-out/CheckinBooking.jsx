import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setIsPaid(booking?.isPaid ?? false), [booking]);
  const { checkIn, isChecking } = useCheckIn();
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    numOfNights,
  } = booking;
  const totalBreakFastPrice =
    settings.breakfastPrice * numOfNights * numOfGuests;

  function handleCheckin() {
    if (!isPaid) return;
    if (addBreakFast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakFastPrice,
          totalPrice: totalPrice + totalBreakFastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((bf) => !bf);
              setIsPaid(false);
            }}
            id="breakfast"
          >
            want to add breakfast for {formatCurrency(totalBreakFastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid((paid) => !paid)}
          disabled={isPaid || isChecking}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + totalBreakFastPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!isPaid || isChecking} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
