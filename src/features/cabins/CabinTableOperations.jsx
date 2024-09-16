import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterName="discount"
        options={[
          { value: "all", name: "All" },
          { value: "with-discount", name: "With Discount" },
          { value: "no-discount", name: "No Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", name: "Sort by name (A-Z)" },
          { value: "name-desc", name: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", name: "Sort by price (low first)" },
          { value: "regularPrice-desc", name: "Sort by price (high first)" },
          { value: "maxCapacity-asc", name: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", name: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
