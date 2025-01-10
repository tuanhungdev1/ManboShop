import { policyList } from "@constants/footers/policyList";
import { cn } from "@utils/cn";

const PolicyList = () => {
  return (
    <div className="flex items-center text-[14px] px-4 justify-around bg-primary-300 w-screen sm:px-[2vw] md:px-[4vw] lg:px-[5vw] xl:px-[6vw] flex-row">
      {policyList.map((policyItem, policyIndex) => {
        const PolicyIconComponent = policyItem.icon;

        return (
          <div
            key={policyItem.id}
            className={cn(
              "flex items-center flex-1 px-8 py-4",
              policyIndex !== policyList.length - 1
                ? "border-r border-white"
                : ""
            )}
          >
            <div className="text-[60px]">
              <PolicyIconComponent />
            </div>
            <div className="flex flex-col flex-1 gap-1 text-center">
              <span className="font-semibold">{policyItem.title}</span>
              <span>{policyItem.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PolicyList;
