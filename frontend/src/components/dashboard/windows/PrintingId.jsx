import React from 'react';

const PrintingId = ({ student }) => {
  return (
    <div className="school-id">
      <img src={student.photo} alt="Student Photo" />
      <div>Name: {student.name}</div>
      <div>ID: {student.id}</div>
      {/* Add other details as needed */}
    </div>
  );
};

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return <button onClick={handlePrint}>Print School ID</button>;
};

export default PrintingId
