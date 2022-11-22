import Link from "next/link";
import {
  BookOpenIcon,
  PlusIcon,
  HomeIcon,
  XMarkIcon,
  Bars3Icon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Header({ home, homePage, bookPage }) {
  return (
    <div className="flex justify-between items-center my-4">
      <Link href="/home">
        <a>
          <svg width="30" viewBox="0 0 347 347">
            <path d="M0 0L347 347H0V0Z" fill="#CB6BBC" />
            <path d="M347 0L0 347H347V0Z" fill="#5D69D6" />
          </svg>
        </a>
      </Link>
      {home ? (
        <>
          <div className="sm:flex hidden ml-auto">
            <Link href="/tutor">
              <a className="ml-4 mr-2 sm:hover:bg-neutral-700 p-2 rounded-full">
                <BookOpenIcon className="w-6" />
              </a>
            </Link>
            <Link href="/archive">
              <a className="sm:hover:bg-neutral-700 p-2 rounded-full">
                <ArchiveBoxIcon className="w-6" />
              </a>
            </Link>
          </div>
          <button className="ml-2 sm:hover:bg-neutral-700 p-2 rounded-full">
            <div className="h-6 w-6 relative">
              <Image
                alt=""
                layout="fill"
                src="https://avatars.dicebear.com/api/identicon/Валерий Шашкин.svg"
              />
            </div>
          </button>
        </>
      ) : (
        <Link href="/home">
          <a className="sm:hover:bg-neutral-700 rounded-full p-2 -mr-2">
            <XMarkIcon className="w-6" />
          </a>
        </Link>
      )}
      {home && (
        <div className="z-10 backdrop-blur sm:hidden flex fixed justify-around bottom-0 left-0 right-0 w-full border-t border-neutral-700">
          <Link href="/home">
            <a className="w-full flex justify-center sm:hover:bg-neutral-70 rounded-full py-3">
              {homePage ? (
                <HomeIconSolid className="w-6" />
              ) : (
                <HomeIcon className="w-6" />
              )}
            </a>
          </Link>
          <Link href="/tutor">
            <a className="w-full flex justify-center sm:hover:bg-neutral-700 rounded-full py-3">
              {bookPage ? (
                <BookOpenIconSolid className="w-6" />
              ) : (
                <BookOpenIcon className="w-6" />
              )}
            </a>
          </Link>
          <Link href="/archive">
            <a className="w-full flex justify-center sm:hover:bg-neutral-700 rounded-full py-3">
              <ArchiveBoxIcon className="w-6" />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
