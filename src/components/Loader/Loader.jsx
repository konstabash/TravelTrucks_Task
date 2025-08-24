import clsx from "clsx";
import { ClipLoader } from "react-spinners";

const Loader = ({ className, size = 24, color = "var(--button)", ...rest }) => {
  return (
    <div className={clsx(className)}>
      <ClipLoader size={size} color={color} {...rest} />
    </div>
  );
};

export default Loader;
