import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { Rating } from "@mui/material";


const reviews = [
  {
    "name": "Ananya",
    "body": "The petit point vintage collection is simply stunning. The craftsmanship is unparalleled. JNeedle has truly outdone themselves.",
    "rating": 4.8,
    "img": "https://avatar.vercel.sh/ananya"
  },
  {
    "name": "Neha",
    "body": "I purchased a hand-embroidered handbag from JNeedle, and it's worth every penny. The quality is top-notch and the design is exquisite.",
    "rating": 5,
    "img": "https://avatar.vercel.sh/neha"
  },
  {
    "name": "Priya",
    "body": "JNeedle's handbags are a work of art. The vintage collection is my favorite. It's a must-have for anyone who appreciates fine craftsmanship.",
    "rating": 4,
    "img": "https://avatar.vercel.sh/priya"
  },
  {
    "name": "Ananya",
    "body": "The hand-embroidered handbags from JNeedle are a true testament to Indian craftsmanship. The designs are unique and elegant.",
    "rating": 4.6,
    "img": "https://avatar.vercel.sh/ananya"
  },
  {
    "name": "Sakshi",
    "body": "The petit point vintage handbag I bought from JNeedle is exquisite. The embroidery is delicate and beautifully done.",
    "rating": 5,
    "img": "https://avatar.vercel.sh/sakshi"
  },
  {
    "name": "Meera",
    "body": "JNeedle's hand-embroidered handbags are a must-have for anyone who loves luxury. The designs are classic and timeless.",
    "rating": 4.9,
    "img": "https://avatar.vercel.sh/meera"
  },
  {
    "name": "Simran",
    "body": "I recently bought a petit point clutch from JNeedle, and it's stunning. The attention to detail is remarkable.",
    "rating": 4.8,
    "img": "https://avatar.vercel.sh/simran"
  },
  {
    "name": "Rina",
    "body": "The petit point vintage handbag I bought from JNeedle is a piece of art. The embroidery is so intricate and beautiful.",
    "rating": 5,
    "img": "https://avatar.vercel.sh/rina"
  },
  {
    "name": "Kavita",
    "body": "The quality of JNeedle's handbags is outstanding. The designs are unique, and the embroidery work is flawless. Highly recommended!",
    "rating": 4,
    "img": "https://avatar.vercel.sh/kavita"
  },
  {
    "name": "Aishwarya",
    "body": "I am absolutely in love with my petit point clutch from JNeedle. It's perfect for every occasion, and I always get compliments on it.",
    "rating": 5,
    "img": "https://avatar.vercel.sh/aishwarya"
  },
  {
    "name": "Divya",
    "body": "JNeedle's handbags are a true representation of luxury and elegance. The vintage collection is my personal favorite.",
    "rating": 4.8,
    "img": "https://avatar.vercel.sh/divya"
  },
  {
    "name": "Madhuri",
    "body": "I bought a petit point vintage handbag for a special occasion, and it was the best decision ever. The quality is simply amazing.",
    "rating": 4,
    "img": "https://avatar.vercel.sh/madhuri"
  },
  {
    "name": "Anjali",
    "body": "JNeedle's hand-embroidered handbags are beyond beautiful. The attention to detail is incredible, and the designs are timeless.",
    "rating": 4.9,
    "img": "https://avatar.vercel.sh/anjali"
  },
  {
    "name": "Radhika",
    "body": "I gifted a JNeedle petit point clutch to my friend, and she absolutely loves it. The embroidery is gorgeous, and the quality is top-notch.",
    "rating": 4.7,
    "img": "https://avatar.vercel.sh/radhika"
  },
  {
    "name": "Tanvi",
    "body": "The petit point vintage collection from JNeedle is breathtaking. Each handbag is a masterpiece, and the quality is impeccable.",
    "rating": 5,
    "img": "https://avatar.vercel.sh/tanvi"
  }
]


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  rating,
  body,
}: {
  img: string;
  name: string;
  rating: number;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <Rating name="read-only" value={rating} readOnly />

        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const ReviewMarquee = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
      {/* <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      <h4 className="text-5xl font-extrabold tracking-wider text-center py-10 mb-10 text-stone-800">CUSTOMER REVIEWS</h4>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default ReviewMarquee;
