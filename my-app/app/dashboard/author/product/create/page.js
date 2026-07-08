import CreateForm from "@/components/dashboard/author/product/NewItemForm";
import { Suspense } from "react";

export default function CreateFormPage() {
  return (
    <Suspense>
      <CreateForm />
    </Suspense>
  );
}
