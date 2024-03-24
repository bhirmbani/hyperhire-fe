"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { GetBookResponse, getBooks } from "@/services/app.service";
import { getUserPoint } from "@/services/user.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export default function AppModule() {
  const router = useRouter();
  const params = useParams();
  const [login, storeLogin] = useLocalStorage("login", false);
  const userId = useReadLocalStorage("userId");

  const [skip, setSkip] = useState(params["skip"] ?? "0");
  const [take, setTake] = useState(params["take"] ?? "12");

  const [books, setBooks] = useState<GetBookResponse[]>();

  const logout = () => {
    storeLogin(false);
    router.replace("/");
  };

  const { data: booksData, isLoading } = useSWR(
    `/books?skip=${skip}&take=${take}`,
    () => getBooks(`${skip}`, `${take}`)
  );

  const { data: userPoint, isLoading: isGetUserPointLoading } = useSWR(
    "getUserPoint",
    () => getUserPoint(`${userId}`)
  );

  const nextPage = () => {
    const newTake = parseInt(`${take}`) + 12;
    setTake(`${newTake}`);
  };

  useEffect(() => {
    if (login === false) {
      router.replace("/login");
    }
  }, [login, router, booksData]);

  useEffect(() => {
    setBooks(booksData?.data);
  }, [booksData]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="mr-2 flex flex-auto">
          <p>My point: {userPoint?.data?.point} point</p>
        </div>
        <div className="mr-2">
          <Button size="sm">My cart</Button>
        </div>
        <div className="mr-2">
          <Button size="sm">My order</Button>
        </div>
        {login === true ? (
          <div>
            <Button onClick={logout} size="sm">
              Logout
            </Button>
          </div>
        ) : null}
      </div>
      <div>
        <InfiniteScroll
          className="grid grid-cols-5 grid-flow-row gap-2"
          dataLength={books ? books?.length : 0}
          hasMore={books && books.length >= 100 ? false : true}
          next={nextPage}
          loader={<p>Loading</p>}
          endMessage={<p className="text-center">All books loaded</p>}
          scrollThreshold={1}
        >
          {books?.map((book) => (
            <Card className="mx-1" key={book.id}>
              <CardHeader>
                <img src={book.cover_img} alt="book cover" />
              </CardHeader>
              <CardContent className="w-fi">
                <p className="text-xs mb-2">
                  {book.id} - {book.title}
                </p>
                {book.Tag.map((tag) => (
                  <p key={tag.id} className="text-xs">
                    {tag.name}
                  </p>
                ))}
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                {book.Authors.map((author) => (
                  <p className="text-xs" key={author.Author.id}>
                    {author.Author.name}
                  </p>
                ))}
                <p>{book.point} point</p>
                <Button size="sm" variant="link" className="text-start p-0">
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
