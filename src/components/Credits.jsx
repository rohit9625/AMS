import React from "react";
import Link from "next/link";

export default function Credits() {
  return (
    <div className="flex flex-col items-center space-y-1 pb-8">
      <p className="text-xs">Developed and maintained by</p>
      <div className="w-full flex justify-around">
        <Link href="https://github.com/rohit9625" className="text-3xl">
          <ion-icon name="logo-github"></ion-icon>
        </Link>
        <Link href="#" className="text-3xl">
          <ion-icon name="logo-instagram"></ion-icon>
        </Link>
        <Link href="#" className="text-3xl">
          <ion-icon name="mail-outline"></ion-icon>
        </Link>
      </div>
    </div>
  );
}
