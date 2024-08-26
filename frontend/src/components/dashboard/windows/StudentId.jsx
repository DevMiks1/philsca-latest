/** @format */

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EmailIcon,
  ViewIcon,
} from "@chakra-ui/icons";
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
import { updateAccountAPI } from "../../api/AccountsApi";
import { useData } from "../../context/FetchAccountContext";

const StudentId = ({
  filterCriteria,
  searchQuery,
  selectedProgram,
  handleViewClick,
  handleApprovedOpen,
  handleOpenMail,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();
  const studentsPerPage = 4;

  // Filter students based on role
  const filteredStudentsId = data.filter(
    (account) => account.role === "student"
  );

  // Apply search and filter criteria
  const filteredStudents = filteredStudentsId
    .reverse()
    .filter((student) => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((student) => {
      if (filterCriteria === "") return true;
      return filterCriteria === "issued"
        ? student.isIdIssued
        : !student.isIdIssued;
    })
    .filter((student) => {
      if (selectedProgram === "") return true;
      return selectedProgram === student.course ? student.course : "";
    });

  // Pagination logic
  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);
  const displayedStudents = filteredStudents.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  const displayStudents = displayedStudents.map((student) => (
    <Tr key={student._id}>
      <Td>
        {student.firstname} {student.lastname}
      </Td>
      <Td>{student.course}</Td>
      <Td>
        <Button
          mr={5}
          size="sm"
          leftIcon={<ViewIcon />}
          onClick={() => handleViewClick(student)}
        >
          View
        </Button>
        {!student.isIdIssued && (
          <Button
            mr={5}
            size="sm"
            leftIcon={<CheckIcon />}
            onClick={() => handleApprovedOpen(student)}
          >
            Approved
          </Button>
        )}
        {student.isIdIssued && (
          <Button
            size="sm"
            leftIcon={<EmailIcon />}
            onClick={() => handleOpenMail(student)}
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
            {displayStudents.length > 0 ? (
              displayStudents
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

export default StudentId;
