import Head from "next/head";
import Header from "../components/Header";
import Content from "../components/Content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  EllipsisVerticalIcon,
  ShareIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import api from "../utils/api";
import Menu from "../components/Menu";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { isLoading, session, supabaseClient } = useSessionContext();
  const { data: posts, mutate: mutatePosts } = useSWR(
    !isLoading && session
      ? api(`posts?user_id=eq.${session.user.id}&select=*`, session)
      : null,
    fetcher
  );
  const [menu, setMenu] = useState(false);
  const [selection, setSelection] = useState(-1);

  const showMenu = (id) => {
    setSelection(id);
    setMenu(true);
  };
  const hideMenu = () => setMenu(false);
  const share = () => {
    navigator.share({
      url: `https://modeling-school.vercel.app/sharePost?id=${selection}`,
    });
    setMenu(false);
  };
  const remove = async () => {
    await supabaseClient.from("posts").delete().eq("id", selection);
    mutatePosts();
    setMenu(false);
  };

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/");
    }
  }, [session, router, isLoading]);

  if (isLoading || !session) {
    return null;
  }

  return (
    <>
      {menu && (
        <Menu
          onClose={hideMenu}
          actions={[
            {
              title: "Поделиться",
              icon: <ShareIcon className="w-6" />,
              onClick: share,
            },
            {
              title: "Удалить",
              icon: <TrashIcon className="w-6" />,
              onClick: remove,
            },
          ]}
        />
      )}
      <Head>
        <title>Школа моделирования</title>
      </Head>
      <Content>
        <Header home homePage />
        <div className="space-y-4">
          <Link href="/group/random">
            <a className="bg-neutral-800 rounded-2xl py-3 px-4 flex gap-4">
              <div className="mt-2 ml-1">
                <Image
                  alt=""
                  width={30}
                  height={30}
                  src="https://avatars.dicebear.com/api/identicon/Геометрия и топология.svg"
                />
              </div>
              <div>
                Геометрия и топология
                <div className="text-neutral-500">40 участников</div>
              </div>
            </a>
          </Link>
          <Link href="/group/random">
            <a className="bg-neutral-800 rounded-2xl py-3 px-4 flex gap-4">
              <div className="mt-2 ml-1">
                <Image
                  alt=""
                  width={30}
                  height={30}
                  src="https://avatars.dicebear.com/api/identicon/Математическое моделирование.svg"
                />
              </div>
              <div>
                Математическое моделирование
                <div className="text-neutral-500">255 участников</div>
              </div>
            </a>
          </Link>
          <Link href="/group/random">
            <a className="bg-neutral-800 rounded-2xl py-3 px-4 flex gap-4">
              <div className="mt-2 ml-1">
                <Image
                  alt=""
                  width={30}
                  height={30}
                  src="https://avatars.dicebear.com/api/identicon/Алгебра и теория чисел.svg"
                />
              </div>
              <div>
                Алгебра и теория чисел
                <div className="text-neutral-500">859 участников</div>
              </div>
            </a>
          </Link>
        </div>
      </Content>
    </>
  );
}
