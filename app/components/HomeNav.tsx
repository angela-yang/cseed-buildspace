"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaBookmark, FaUser, FaFeather } from "react-icons/fa";

export default function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="fixed top-4 left-4 z-50"
            onMouseEnter={() => {
                setIsOpen(true);
            }}
            onMouseLeave={() => {
                setIsOpen(false);
            }}
        >
            <button className="bg-[rgb(57,123,255)] text-white p-3 rounded-full shadow-lg hover:bg-[rgb(43,95,199)] transition cursor-pointer">
                <Link href="/">
                    <FaHome size={24} />
                </Link>
            </button>

            {isOpen && (
                <div className="mt-2 bg-[rgb(57,123,255)] text-white rounded-xl shadow-lg w-48 p-4 flex flex-col gap-3 cursor-pointer">
                    <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaHome /> Home
                    </Link>
                    <Link href="/paint" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaFeather /> Cohorts
                    </Link>
                    <Link href="/saved" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaBookmark /> Projects
                    </Link>
                    <Link href="/results" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaUser /> Apply
                    </Link>
                </div>
            )}
        </div>
    );
}
