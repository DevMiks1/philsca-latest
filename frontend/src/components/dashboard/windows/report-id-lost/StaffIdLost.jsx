/** @format */

import {  ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { useData } from "../../../context/FetchAccountContext";

const StaffIdLost = ({
  searchQuery,
  currentPage,
  handleViewAccount,

  handlePageClick,
}) => {
  const { data, setData } = useData();
  const staffPerPage = 4;

  const filteredStaffId = data.filter(
    (account) => account.role === "staff" && account.affidavit
  );
  const pageCount = Math.ceil(filteredStaffId.length / staffPerPage);


  const filteredStaff = filteredStaffId
    .reverse()
    .filter((staff) => {
      const fullName = `${staff.firstname} ${staff.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .slice(currentPage * staffPerPage, (currentPage + 1) * staffPerPage);

  const displayStaff = filteredStaff.map((staff) => (
    <Tr key={staff._id}>
      <Td>
        {staff.firstname} {staff.lastname}
      </Td>
      <Td>{staff.position}</Td>
      <Td>
        <Button
          size="sm"
          mr={5}
          leftIcon={<ViewIcon />}
          onClick={() => handleViewAccount(staff)}
        >
          View
        </Button>
        
      </Td>
    </Tr>
  ));

  return (
    <>
      <TableContainer mb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayStaff.length > 0 ? (
              displayStaff
            ) : (
                <Tr>
                <Td colSpan={3} textAlign="center">
                    <Text fontSize="20px" fontWeight="bold" pt={20}>
                        There is no Report Lost ID for Staff
                    </Text>
                </Td>
            </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Box h="10vh" pt={10}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={<ChevronLeftIcon />}
            nextLabel={<ChevronRightIcon />}
          />
        </Box>
      )}
    </>
  );
};

export default StaffIdLost;
