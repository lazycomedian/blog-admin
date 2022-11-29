import login_bg_mb from "@/assets/images/login_bg_mb.png";
import login_bg_pc from "@/assets/images/login_bg_pc.jpg";
import styled, { css } from "styled-components";

/* 一般大于手机的尺寸CSS */
const lgMedia = css`
  @media (min-width: 767px) {
    .content {
      width: 85vw;
      height: 90vh;
      /* background: url(${login_bg_pc}) no-repeat; */
      background-size: 90% 100%;
      position: absolute;
      right: 15%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      background-color: #fff;
      .login-wrapper {
        width: 25vw;
        position: absolute;
        right: 15%;
        top: 50%;
        transform: translateY(-50%);
        h1 {
          text-align: center;
          font-size: 45px;
          color: rgb(81, 100, 115);
          margin-bottom: 40px;
        }
        .login-form {
          margin: 10px 0;
          .form-item {
            span {
              color: rgb(81, 100, 115);
            }
            .input-item {
              height: 60px;
              border: 1px solid rgb(214, 222, 228);
            }
          }
          .login-btn {
            height: 50px;
            font-size: 20px;
          }
        }

        .i-icon-button {
          width: 55px;
          height: 55px;
          font-size: 30px;
          border-radius: 20%;
        }
      }
    }
  }
`;

/* 手机端CSS */
const smMedia = css`
  @media (max-width: 768px) {
    .content {
      width: 100vw;
      height: 100vh;
      /* background: url(${login_bg_mb}) no-repeat; */
      background-size: 100% 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .login-wrapper {
        width: 70%;
        height: 60%;
        padding-top: 15%;
        h1 {
          font-size: 30px;
          color: #fff;
        }
        .login-form {
          .form-item {
            margin: 10px 0;
            span {
              color: rgb(113, 129, 141);
            }
            .input-item {
              height: 30px;
              border: 1px solid rgb(113, 129, 141);
              background-color: transparent;
              color: #fff;
            }
          }
          .login-btn {
            height: 40px;
            background-color: rgb(235, 95, 93);
            font-size: 16px;
          }
        }

        .i-icon-button {
          width: 50px;
          height: 50px;
          border-radius: 20%;
          font-size: 25px;
          background: transparent;
          color: #fff;
        }
      }
    }
  }
`;

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(29, 67, 89);

  .content {
    .login-wrapper {
      h1 {
        text-align: center;
      }
      .login-form {
        .form-item {
          margin: 20px 0;
          span {
            font-size: 14px;
            font-weight: 500;
            display: block;
            margin: 5px 20px;
            font-weight: 500;
          }
          .input-item {
            width: 100%;
            border-radius: 40px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 20px;
            font-weight: 200;
            &:focus {
              outline: none;
            }
          }
        }
        .login-btn {
          width: 100%;
          border-radius: 40px;
          color: #fff;
          border: 0;
          font-weight: 100;
          margin-top: 10px;
        }
      }

      .i-divider {
        border-color: rgb(214, 222, 228);
        color: rgb(81, 100, 115);
        font-weight: 400;
      }

      .other-login-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  ${lgMedia}

  ${smMedia}
`;
