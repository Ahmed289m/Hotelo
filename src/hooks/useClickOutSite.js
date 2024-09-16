import { useEffect, useRef } from "react";

function useClickOutSide({ close, listenCap = true }) {
  const ref = useRef();
  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleOutsideClick, listenCap);

      return () =>
        document.removeEventListener("click", handleOutsideClick, listenCap);
    },
    [close]
  );
  return ref;
}

export default useClickOutSide;
