import { Feed } from '@/features/videos';

const ProfileImage = () => (
  <img
    src="https://github.com/eliseucbrito.png"
    className="w-[70px] h-[70px] mt-[-60px] absolute z-10 rounded-full border-4 border-black flex justify-center items-center"
    width={345}
    height={200}
    alt=""
  />
);

export default function Home() {
  return (
    <div className="w-full h-full">
      <Feed />
    </div>
  );
}
