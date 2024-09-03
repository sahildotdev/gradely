import React from "react";
import Icon from "./Icon";

const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path
      d="M18.6923 18.5H8.30775C7.80258 18.5 7.375 18.325 7.025 17.975C6.675 17.625 6.5 17.1974 6.5 16.6923V3.30775C6.5 2.80258 6.675 2.375 7.025 2.025C7.375 1.675 7.80258 1.5 8.30775 1.5H14.502C14.743 1.5 14.9748 1.54683 15.1973 1.6405C15.4196 1.734 15.6128 1.86283 15.777 2.027L19.973 6.223C20.1372 6.38717 20.266 6.58042 20.3595 6.80275C20.4532 7.02525 20.5 7.257 20.5 7.498V16.6923C20.5 17.1974 20.325 17.625 19.975 17.975C19.625 18.325 19.1974 18.5 18.6923 18.5ZM19 7.5H15.7115C15.3718 7.5 15.085 7.383 14.851 7.149C14.617 6.915 14.5 6.62817 14.5 6.2885V3H8.30775C8.23075 3 8.16025 3.03208 8.09625 3.09625C8.03208 3.16025 8 3.23075 8 3.30775V16.6923C8 16.7692 8.03208 16.8398 8.09625 16.9038C8.16025 16.9679 8.23075 17 8.30775 17H18.6923C18.7693 17 18.8398 16.9679 18.9038 16.9038C18.9679 16.8398 19 16.7692 19 16.6923V7.5ZM4.30775 22.5C3.80258 22.5 3.375 22.325 3.025 21.975C2.675 21.625 2.5 21.1974 2.5 20.6923V8.25C2.5 8.03717 2.57183 7.859 2.7155 7.7155C2.859 7.57183 3.03717 7.5 3.25 7.5C3.46283 7.5 3.641 7.57183 3.7845 7.7155C3.92817 7.859 4 8.03717 4 8.25V20.6923C4 20.7693 4.03208 20.8398 4.09625 20.9038C4.16025 20.9679 4.23075 21 4.30775 21H13.75C13.9628 21 14.141 21.0718 14.2845 21.2155C14.4282 21.359 14.5 21.5372 14.5 21.75C14.5 21.9628 14.4282 22.141 14.2845 22.2845C14.141 22.4282 13.9628 22.5 13.75 22.5H4.30775Z"
      fill="#1C1B1F"
    />
  </Icon>
);

export default FileIcon;
