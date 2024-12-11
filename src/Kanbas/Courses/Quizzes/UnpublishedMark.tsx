import { MdDoNotDisturb } from "react-icons/md";
import {FaCircle } from "react-icons/fa";
export default function UnpublishedMark() {
  return (
    <span className="me-1 position-relative">
      <MdDoNotDisturb style={{ top: "2px" }}
        className="text-danger me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}