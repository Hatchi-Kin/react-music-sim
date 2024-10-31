"use client";

import React from 'react';
import Link from 'next/link';

interface RedirectButtonProps {
  filePath: string;
  label: string;
}

const CompareModelButton: React.FC<RedirectButtonProps> = ({ filePath, label }) => {
  return (
    <Link href={`/homepage/compare-models?file=${encodeURIComponent(filePath)}`}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-sm">
        {label}
      </button>
    </Link>
  );
};

export default CompareModelButton;