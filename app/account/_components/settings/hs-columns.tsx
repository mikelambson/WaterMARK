"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Headsheets = {
    id: string
    name: string
    district: string
    maxHeads: number
    structureRef: string
    maxFlow: number
    characteristics: JSON
}

type CustomColumnDef<TData> = ColumnDef<TData> & {
    isEditable?: boolean;
  };

export const columns: CustomColumnDef<Headsheets>[] = [
    {
        accessorKey: "name",
        header: "Name",
        isEditable: true,
    
    },
    {
        accessorKey: "district",
        header: "District",
        isEditable: true,
    },
    {
        accessorKey: "maxHeads",
        header: "Max Heads",
        isEditable: true,
    },
    {
        accessorKey: "maxFlow",
        header: "Max Total CFS",
        isEditable: true,
        cell: ({ row }) => {
            const maxflow = parseFloat(row.getValue("maxFlow"));
            const formattedValue = maxflow ? maxflow.toFixed(2) : '0.00';
            return <div className="font-medium">{formattedValue} MAX</div>
          },
    },
    {
        accessorKey: "structureRef",
        header: "Structure Reference",
        isEditable: true,
    },
    {
        accessorKey: "characteristics",
        header: "Characteristics",
        isEditable: true,
    },
]