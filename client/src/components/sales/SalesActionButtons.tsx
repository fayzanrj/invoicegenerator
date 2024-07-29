'use client'
import React, { useEffect, useState } from 'react';
import UrduFont from "@/constants/UrduFont";
import Link from "next/link";
import ButtonLayout from '@/components/shared/ButtonLayout';

const SalesActionButtons = () => {
  const [href, setHref] = useState<string>("/");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href.split("?")[0];
      setHref(currentUrl);
    }
  }, []);

  return (
    <div className="text-right">
      <Link href={`/dashboard/customers?callbackUrl=${href || "/"}`}>
        <ButtonLayout isNav className={UrduFont}>
          گاہکوں کی فہرست
        </ButtonLayout>
      </Link>
      <Link href={`/dashboard/sales/salesList?callbackUrl=${href || "/"}`}>
        <ButtonLayout isNav className={UrduFont}>
          فروخت کی فہرست
        </ButtonLayout>
      </Link>
    </div>
  );
};

export default SalesActionButtons;
