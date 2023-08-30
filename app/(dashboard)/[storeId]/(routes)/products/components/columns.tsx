'use client'

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductVariant = {
  color: string;
  size: string;
  quantity: number;
};

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  variants: ProductVariant[]; // Add the variants property
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "variants", // Use the new variants property
    header: "Variants",
    cell: ({ row }) => (
      <div>
        {row.original.variants.map((variant, index) => (
          <div key={index} className="flex items-center gap-x-2">
            {variant.color}
            <div
              className="h-6 w-6 rounded-full border"
              style={{ backgroundColor: variant.color }}
            />
            {variant.size}
            Quantity: {variant.quantity}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
