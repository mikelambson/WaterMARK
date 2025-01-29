"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "@/services/reports/fetchReports";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ComponentLoader from "@/features/loader/comploader.module";

export default function Reports() {
  const { data: reports, isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <div className="p-4">
      <h1 className="p-2 text-2xl font-semibold text-yellow-800 text-center">Reports</h1>

      {isLoading && <ComponentLoader className="h-96" />}
      {isError && <p className="text-red-500 text-center">Failed to load reports.</p>}

      {reports && reports.length > 0 ? (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  <Link href={`/reports/${report.id}`} className="text-blue-600 hover:underline">
                    View Report
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        !isLoading && <p className="text-gray-500 text-center">No reports available.</p>
      )}
    </div>
  );
}

