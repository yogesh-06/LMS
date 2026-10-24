"use client";

import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./component/Header";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const activeItem = 0;
  return (
    <div>
      <Heading
        title="E-learning"
        description="E-learning is a platform that provides online courses and educational resources for learners of all ages."
        keywords="Programming, Web Development, Data Science, Machine Learning, Artificial Intelligence, Cloud Computing, Cybersecurity, Mobile App Development, Game Development, UI/UX Design, Digital Marketing, Business Analytics, Project Management"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
