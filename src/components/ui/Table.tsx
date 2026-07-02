import React from 'react';

interface TableProps {
  headers: string[];
  rows: (string | number | boolean | React.ReactNode)[][];
  className?: string;
}

export const Table: React.FC<TableProps> = ({ headers, rows, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th 
                key={header} 
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
