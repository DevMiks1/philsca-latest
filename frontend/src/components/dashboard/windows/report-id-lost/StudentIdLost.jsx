/** @format */

import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
import ReactPaginate from "react-paginate";
import { useData } from "../../../context/FetchAccountContext";

const StudentIdLost = ({
  filterCriteria,
  searchQuery,
  selectedProgram,
  handleViewAccount,
  currentPage,
  handlePageClick,
}) => {
  const { data, setData } = useData();
  const studentsPerPage = 4;

  // Filter students based on role
  const filteredStudentsWithAffidavit = data.filter(
    (account) => account.role === "student" && account.affidavit
  );

  // Apply search and filter criteria
  const filteredStudents = filteredStudentsWithAffidavit
    .reverse()
    .filter((student) => {
      const fullName = `${student.firstname} ${student.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
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
          onClick={() => handleViewAccount(student)}
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

export default StudentIdLost;
