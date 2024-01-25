import React from "react";

const MedicalHuman = ({ fill, ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clip-path="url(#clip0_1149_2624)">
        <path
          d="M21.7759 16.7641V17.4881C21.7759 21.7721 21.7719 26.0601 21.7879 30.3481C21.7879 30.7641 21.6679 30.8601 21.2719 30.8521C19.9999 30.8281 18.7319 30.8401 17.4599 30.8481C17.3119 30.8481 17.0959 30.7641 17.0799 31.0441C17.0639 31.3481 17.2959 31.2841 17.4639 31.2841L21.3679 31.2881C21.4959 31.2881 21.7039 31.2241 21.7319 31.3761C21.7719 31.5881 21.5359 31.5561 21.4039 31.5921L17.4719 32.6641C17.3839 32.6881 17.2919 32.7001 17.2079 32.7361C17.0399 32.8041 17.0599 32.9561 17.0879 33.0881C17.1199 33.2641 17.2719 33.1921 17.3439 33.1561C18.0639 32.7921 18.6999 33.1001 19.3519 33.3681C20.0559 33.6601 20.7679 33.9361 21.4839 34.2001C21.7079 34.2841 21.8079 34.4041 21.7719 34.6401C21.7319 34.9161 21.5159 34.8041 21.3759 34.8081C20.0759 34.8161 18.7759 34.8121 17.4719 34.8161C17.3119 34.8161 17.0839 34.7281 17.0719 35.0401C17.0599 35.3561 17.2919 35.2721 17.4559 35.2721C17.9719 35.2801 18.4879 35.2761 19.0359 35.3601C18.4759 35.6841 17.9239 36.0161 17.3559 36.3241C17.0879 36.4681 17.0039 36.6401 17.1399 36.9721C17.8079 36.5921 18.4999 36.2601 19.1159 35.8241C19.8399 35.3121 20.6159 35.2081 21.4559 35.2641C21.6879 35.2801 21.7679 35.3321 21.7799 35.5761C21.8279 36.6641 21.8359 36.6721 20.7879 36.8761C19.7079 37.0841 18.6279 37.2761 17.5439 37.4761C17.2959 37.5241 17.0719 37.5361 17.0239 37.9041C16.8639 39.1721 15.7999 40.0601 14.5959 39.9881C13.2839 39.9041 12.3359 38.9121 12.3319 37.5681C12.3199 34.9801 12.3319 32.3921 12.3319 29.8081C12.3319 29.1481 12.3279 28.4921 12.3359 27.8321C12.3399 27.6281 12.2879 27.5561 12.0679 27.5081C10.6079 27.1801 9.97192 26.3401 9.97192 24.8361C9.97592 21.2681 9.97192 17.7041 9.97192 14.1361C9.97192 13.7521 9.97192 13.3681 10.0759 12.9961C10.3599 11.9881 11.2559 11.3001 12.3199 11.2881C13.6799 11.2761 15.0439 11.2961 16.4079 11.2721C16.7719 11.2681 16.8279 11.3961 16.8239 11.7201C16.8119 15.9761 16.8159 20.2321 16.8199 24.4881C16.8199 24.6241 16.8199 24.7641 16.8239 24.9001C16.8279 25.0401 16.8999 25.1401 17.0439 25.1401C17.1839 25.1401 17.2639 25.0401 17.2759 24.9041C17.2879 24.7681 17.2839 24.6281 17.2839 24.4921C17.2839 20.2521 17.2919 16.0121 17.2719 11.7721C17.2719 11.3521 17.3919 11.2721 17.7799 11.2801C19.0799 11.3041 20.3799 11.2961 21.6839 11.2841C22.3119 11.2801 22.8479 11.4921 23.3239 11.8841C24.7439 13.0481 26.1599 14.2161 27.5919 15.3681C28.2599 15.9041 28.5959 16.5841 28.5759 17.4361C28.5759 17.5441 28.5719 17.6521 28.5719 17.7561C28.5759 18.0761 28.4719 18.4601 28.6119 18.7041C28.7759 18.9881 29.1959 18.7801 29.4999 18.8201C29.7919 18.8561 29.9679 18.9921 29.9679 19.2801C29.9719 20.9321 30.0559 22.5881 29.9279 24.2361C29.8679 25.0361 29.4319 25.7401 28.9759 26.3961C28.3839 27.2521 27.7719 28.0921 27.1559 28.9321C26.8279 29.3801 26.6839 29.8521 26.6879 30.4241C26.7119 33.3321 26.6959 36.2401 26.6959 39.1481C26.6959 39.2841 26.7039 39.4241 26.6799 39.5601C26.6319 39.8401 26.4559 40.0041 26.1719 39.9801C25.9119 39.9601 25.7519 39.7921 25.7399 39.5321C25.7239 39.2561 25.7319 38.9801 25.7319 38.7041C25.7319 35.9481 25.7199 33.1921 25.7479 30.4361C25.7519 29.8641 25.6039 29.3921 25.2759 28.9441C24.6719 28.1161 24.0639 27.2921 23.4839 26.4441C23.0159 25.7601 22.6159 25.0401 22.4839 24.2001C22.4559 24.0201 22.4319 23.8361 22.4279 23.6521C22.4239 22.2761 22.4239 20.8961 22.4279 19.5201C22.4279 18.9481 22.5639 18.8161 23.1239 18.8121C23.2159 18.8121 23.3119 18.8241 23.3999 18.8081C23.5479 18.7761 23.7599 18.9201 23.8319 18.6801C23.8879 18.4841 23.7919 18.3361 23.6279 18.2121C23.0479 17.7681 22.4639 17.3001 21.7759 16.7641ZM26.2239 28.6161C26.9279 27.5881 27.6999 26.6801 28.3239 25.6641C28.6679 25.1001 29.0119 24.5161 29.0319 23.8481C29.0719 22.5801 29.0439 21.3081 29.0479 20.0401C29.0479 19.8561 29.0039 19.7561 28.7919 19.7641C28.5879 19.7681 28.5799 19.8921 28.5799 20.0401V20.7761C28.5799 21.5721 28.5959 22.3681 28.5759 23.1601C28.5399 24.3961 27.4999 25.4001 26.2559 25.4321C25.0599 25.4601 23.9719 24.5281 23.8999 23.3201C23.8359 22.2681 23.8719 21.2121 23.8599 20.1561C23.8599 19.9801 23.9119 19.7601 23.6119 19.7761C23.3319 19.7921 23.4239 20.0121 23.4239 20.1561C23.4159 21.3481 23.4239 22.5441 23.4199 23.7321C23.4199 24.1241 23.5239 24.4881 23.6839 24.8361C24.3239 26.2241 25.3599 27.3361 26.2239 28.6161ZM17.0599 9.0488e-05C19.6719 0.0160905 21.7959 2.15209 21.7719 4.74809C21.7519 7.32809 19.6159 9.44409 17.0439 9.44009C14.4119 9.43609 12.3159 7.28009 12.3359 4.59609C12.3559 2.09209 14.5239 -0.0159095 17.0599 9.0488e-05ZM18.9159 39.9041C19.4919 39.0841 20.0399 38.2641 20.6399 37.4841C20.8759 37.1761 21.3079 37.2521 21.6599 37.2081C21.7799 37.1921 21.7599 37.3281 21.7719 37.4161C21.9599 38.9441 20.4399 40.2961 18.9159 39.9041ZM20.0639 37.4801C19.5199 38.2601 19.0359 38.9401 18.5599 39.6281C18.4519 39.7841 18.3519 39.7561 18.2159 39.6761C17.6759 39.3601 17.3399 38.8921 17.1359 38.3081C17.0519 38.0761 17.1679 38.0081 17.3599 37.9721C18.2279 37.8161 19.0919 37.6561 20.0639 37.4801ZM18.9519 32.7281C19.8879 32.4761 20.7079 32.2601 21.5279 32.0281C21.7239 31.9721 21.7759 32.0401 21.7719 32.2201C21.7679 32.6761 21.7719 33.1361 21.7719 33.5921C21.7719 33.7521 21.7199 33.8161 21.5519 33.7521C20.7279 33.4241 19.8959 33.0961 18.9519 32.7281Z"
          fill="#558EFF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1149_2624">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MedicalHuman;
