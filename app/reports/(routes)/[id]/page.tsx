"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMockReportData } from "@/services/reports/reports";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const reportId = params.id;

  const { data: report, isLoading, isError } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getMockReportData(reportId),
  });

  return (
    <div className="p-4">
      <h1 className="p-2 text-2xl font-semibold text-yellow-800 text-center">
        Report {reportId}
      </h1>

      <button onClick={() => router.back()} className="text-blue-500 underline mb-4">
        ← Back to Reports
      </button>

      {isLoading && <p className="text-center text-gray-500">Loading report...</p>}
      {isError && <p className="text-center text-red-500">Failed to load report data.</p>}

      {report?.data && report.data.length > 0 ? (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              {Object.keys(report.data[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value as React.ReactNode}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        !isLoading && <p className="text-gray-500 text-center">No data available.</p>
      )}
    </div>
  );
}
