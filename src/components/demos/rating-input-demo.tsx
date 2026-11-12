"use client";

import { useState } from "react";
import { RatingInput } from "@/registry/components/rating-input/rating-input";

export default function RatingInputDemo() {
  const [rating, setRating] = useState(3.5);

  return (
    <div className="flex flex-col gap-5">
      <RatingInput label="Your rating" value={rating} onValueChange={setRating} />
      <RatingInput label="Average" value={4.5} readOnly />
    </div>
  );
}
