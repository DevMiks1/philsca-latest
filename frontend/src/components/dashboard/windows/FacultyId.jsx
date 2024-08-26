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

const FacultyId = ({
  
  filterCriteria,
  searchQuery,
  handleViewClick,
  handleApprovedOpen,
  handleOpenMail,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();

  const facultyPerPage = 4;

  const filteredFacultyId = data.filter(
    (account) => account.role === "faculty"
  );
  console.log(data);
  console.log(filteredFacultyId);
  const pageCount = Math.ceil(filteredFacultyId.length / facultyPerPage);

  const filteredFacuty = filteredFacultyId
    .reverse()
    .filter((faculty) => {
      const fullName = `${faculty.firstname} ${faculty.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((faculty) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? faculty.isIdIssued
        : !faculty.isIdIssued;
    })
    .slice(currentPage * facultyPerPage, (currentPage + 1) * facultyPerPage);
  console.log(filteredFacuty);
  const displayFaculty = filteredFacuty.map((faculty) => (
    <Tr key={faculty._id}>
      <Td>
        {faculty.firstname} {faculty.lastname}
      </Td>
      <Td>{faculty.course}</Td>
      <Td>
        <Button
          size="sm"
          mr={5}
          leftIcon={<ViewIcon />}
          onClick={() => handleViewClick(faculty)}
        >
          View
        </Button>
        {!faculty.isIdIssued && (
          <Button
          mr={5}
          size="sm"
          leftIcon={<CheckIcon  />}
          onClick={() => handleApprovedOpen(faculty)}
        >
          Approved
        </Button>
        )}
        {faculty.isIdIssued && (
          <Button
          size="sm"
          leftIcon={<EmailIcon />}
          onClick={() => handleOpenMail(faculty)}
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
            {displayFaculty.length > 0 ? (
              displayFaculty
            ) : (
              <Tr>
                <Td colSpan={3} textAlign="center">
                  <Text fontSize="20px" fontWeight="bold" pt={20}>
                    {filterCriteria === "issued"
                      ? "There are no issued IDs for now."
                      : "There are no non-issued IDs for now."}
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

export default FacultyId;
