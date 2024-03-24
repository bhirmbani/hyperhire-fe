/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import H1Component from "@/components/ui/h1";
import H2Component from "@/components/ui/h2";
import LeadComponent from "@/components/ui/lead";
import { booksMock } from "@/mock";

export default function LandingModule() {

  return (
    <div>
      <div className="mb-20">
        <H1Component clx="text-center">Buy book with your points</H1Component>
        <div className="flex flex-col">
          <div className="my-4">
            <LeadComponent clx="text-center">
              New user got 100 points free
            </LeadComponent>
          </div>
          <div>
            <Link className="flex flex-col" href="/register">
              <Button>Register now</Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <H2Component>Best sellers</H2Component>
        <div className="flex flex-row mt-4 justify-between">
          {booksMock.map((book) => (
            <Card className="mx-1" key={book.id}>
              <CardHeader>
                <img src={book.cover_img} alt="book cover" />
              </CardHeader>
              <CardContent className="w-fit">
                <p className="text-xs mb-2">{book.title}</p>
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
