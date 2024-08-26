/** @format */

import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
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
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useData } from "../../context/FetchAccountContext";

const StaffId = ({
  handleApprovedOpen,
  filterCriteria,
  searchQuery,
  handleViewClick,
  currentPage,
  handleOpenMail,
  handlePageClick,
}) => {
  const { data, setData } = useData();
  const staffPerPage = 4;

  const filteredStaffId = data.filter(
    (account) => account.role === "staff"
  );
  const pageCount = Math.ceil(filteredStaffId.length / staffPerPage);


  const filteredStaff = filteredStaffId
    .reverse()
    .filter((staff) => {
      const fullName = `${staff.firstname} ${staff.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((staff) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? staff.isIdIssued
        : !staff.isIdIssued;
    })
    .slice(currentPage * staffPerPage, (currentPage + 1) * staffPerPage);

  const displayStaff = filteredStaff.map((staff) => (
    <Tr key={staff._id}>
      <Td>
        {staff.firstname} {staff.lastname}
      </Td>
      <Td>{staff.course}</Td>
      <Td>{staff.isIdIssued}</Td>
      <Td>
        <Button
          size="sm"
          mr={5}
          leftIcon={<ViewIcon />}
          onClick={() => handleViewClick(staff)}
        >
          View
        </Button>
        {!staff.isIdIssued && (
          <Button
          mr={5}
          size="sm"
          leftIcon={<CheckIcon  />}
          onClick={() => handleApprovedOpen(staff)}
        >
          Approved
        </Button>
        )}
        {staff.isIdIssued && (
          <Button
          size="sm"
          leftIcon={<EmailIcon />}
          onClick={() => handleOpenMail(staff)}
        >
          Email
        </Button>
        )}
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
              <Th>Course</Th>
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
                        {filterCriteria === 'issued' 
                            ? "There are no issued IDs for now."
                            : "There are no non-issued IDs for now."
                        }
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

export default StaffId;
