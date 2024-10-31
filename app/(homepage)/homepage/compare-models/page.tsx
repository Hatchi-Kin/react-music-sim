"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ModelComparison from "@/components/CompareModels";

const CompareModelsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  return (
    <div className="bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto">
      {/* eslint-disable-next-line react/no-children-prop */}
      <Header title="Compare Models" children={undefined} />
      {file && <ModelComparison filePath={file as string} />}
    </div>
  );
};

export default CompareModelsPage;
