import type { ShortUrlResponse } from "../hooks/usePostShortURL";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

type ShortLinkMenuProps = {
  list: ShortUrlResponse[];
};

const ShortLinkMenu = ({ list }: ShortLinkMenuProps) => {
  const copy = useCopyToClipboard();
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-medium text-violet-600 mb-4">History</h2>
        <div className="flex flex-col -my-2">
          {list.map(url => (
            <div key={url.id} className="flex items-center justify-between my-2">
              <span>{`${window.location.origin}/${url.slug}`}</span>
              <button
                className="text-sm p-1 rounded-md text-violet-500 font-medium hover:text-violet-600 transition-all"
                onClick={() => copy(`${window.location.origin}/${url.slug}`)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShortLinkMenu;
