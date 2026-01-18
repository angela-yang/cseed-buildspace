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
            <button className="bg-[rgb(57,123,255)] text-[rgb(255,231,164)] p-3 rounded-full shadow-lg hover:bg-[rgb(43,95,199)] transition cursor-pointer">
                <Link href="/">
                    <FaHome size={24} />
                </Link>
            </button>

            {isOpen && (
                <div className="mt-2 bg-[rgb(57,123,255)] text-[rgb(255,231,164)] rounded-xl shadow-lg w-48 p-4 flex flex-col gap-3 cursor-pointer">
                    <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaHome /> Home
                    </Link>
                    <Link href="#projects" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaFeather /> Projects
                    </Link>
                    <Link href="#cohorts" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaBookmark /> Cohorts
                    </Link>
                    <Link href="#contact" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(43,95,199)] transition">
                        <FaUser /> Apply
                    </Link>
                </div>
            )}
        </div>
    );
}