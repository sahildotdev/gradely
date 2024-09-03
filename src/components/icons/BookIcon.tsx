import React from "react";
import Icon from "./Icon";

const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path
      d="M6.1155 21.5C5.389 21.5 4.77142 21.2457 4.26275 20.7372C3.75425 20.2286 3.5 19.611 3.5 18.8845V5.1155C3.5 4.389 3.75425 3.77142 4.26275 3.26275C4.77142 2.75425 5.389 2.5 6.1155 2.5H15C15.4972 2.5 15.9228 2.677 16.2768 3.031C16.6308 3.385 16.8077 3.81058 16.8077 4.30775V16C16.8077 16.4972 16.6308 16.9228 16.2768 17.2768C15.9228 17.6308 15.4972 17.8077 15 17.8077H6.1155C5.8065 17.8077 5.54333 17.9126 5.326 18.1223C5.10867 18.3321 5 18.5921 5 18.9023C5 19.2122 5.10867 19.4727 5.326 19.6838C5.54333 19.8946 5.8065 20 6.1155 20H18.6923C18.7821 20 18.8558 19.9712 18.9135 19.9135C18.9712 19.8558 19 19.7821 19 19.6923V5.25C19 5.0375 19.0719 4.85942 19.2158 4.71575C19.3596 4.57192 19.5378 4.5 19.7502 4.5C19.9629 4.5 20.141 4.57192 20.2845 4.71575C20.4282 4.85942 20.5 5.0375 20.5 5.25V19.6923C20.5 20.1894 20.323 20.615 19.969 20.969C19.615 21.323 19.1894 21.5 18.6923 21.5H6.1155ZM8.69225 16.3077H15C15.0898 16.3077 15.1636 16.2789 15.2212 16.2212C15.2789 16.1636 15.3077 16.0898 15.3077 16V4.30775C15.3077 4.21792 15.2789 4.14417 15.2212 4.0865C15.1636 4.02883 15.0898 4 15 4H8.69225V16.3077ZM7.19225 16.3077V4H6.1155C5.79933 4 5.53442 4.10867 5.32075 4.326C5.10692 4.54333 5 4.8065 5 5.1155V16.598C5.173 16.516 5.34983 16.4471 5.5305 16.3913C5.71117 16.3356 5.90617 16.3077 6.1155 16.3077H7.19225Z"
      fill="#1C1B1F"
    />
  </Icon>
);

export default BookIcon;