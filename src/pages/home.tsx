import LoxTikFeed from "@/components/video/LoxtikFeed";
import DropdownMenu from "@/components/layout/DefaultLayout/components/DropdownMenu";
const HomePage = () => {
  return (
    <div className="relative flex">
      <DropdownMenu />
      <LoxTikFeed />
    </div>
  );
};
export default HomePage;
