import Tag from "./tag";

export default function Discover() {
  return (
    <div className="grid justify-self-end">
      <div className=" mt-11 mb-5 flex flex-col ">
        <div className="px-3 text-left text-lg font-semibold text-black">
          Discover more of what matters to you
        </div>
        <Tag></Tag>
      </div>
    </div>
  );
}
