import login_bg_mb from "@/assets/images/login_bg_mb.png";
import login_bg_pc from "@/assets/images/login_bg_pc.jpg";
import styled, { css } from "styled-components";

/* 一般大于手机的尺寸CSS */
const lgMedia = css`
  @media (min-width: 767px) {
    .content {
      width: 90vw;
      height: 90vh;
      background: url(${login_bg_pc}) no-repeat;
      background-size: 85% 100%;
      /* background-size: 1200px 785px; */
      border-radius: 20px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .i-divider {
        color: rgb(81, 100, 115);
      }

      .login-wrapper {
        width: 430px;
        margin-right: 11%;

        h1 {
          text-align: center;
          font-size: 45px;
          color: rgb(81, 100, 115);
          margin-bottom: 40px;
        }

        .label {
          color: rgb(81, 100, 115);
        }

        .login-form {
          margin: 10px 0;
          .form-item {
            .input-item,
            .i-input {
              height: 55px;
              border: 1px solid rgb(214, 222, 228);
              background-color: #fff;
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
      background: url(${login_bg_mb}) no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;

      .i-divider {
        color: #fff;
      }

      .login-wrapper {
        width: 70%;
        height: 60%;
        padding-top: 15%;

        h1 {
          font-size: 30px;
          color: #fff;
        }

        .label {
          color: rgb(113, 129, 141);
        }

        .login-form {
          .form-item {
            margin: 10px 0;

            .input-item,
            .i-input {
              height: 45px;
              border: 1px solid rgb(113, 129, 141);
              background-color: transparent;
              color: #fff;
              &,
              input {
                color: #fff;
              }
              .ant-input-password-icon {
                color: rgb(113, 129, 141);
              }
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
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    overflow: hidden;
    .login-wrapper {
      h1 {
        text-align: center;
        cursor: pointer;
      }
      .login-form {
        .label {
          font-size: 14px;
          font-weight: 500;
          display: block;
          margin: 5px 20px;
          font-weight: 500;
        }

        .ant-form-item-label {
          padding: 0;
        }

        .form-item {
          margin: 15px 0;

          .input-item,
          .i-input {
            width: 100%;
            border-radius: 40px;
            /* padding: 20px; */
            padding: 0 20px;
            box-sizing: border-box;
            background-color: transparent;
            font-size: 20px;
            input {
              background-color: transparent;
            }
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
          /* font-weight: 300; */
          margin-top: 15px;
        }
      }

      .i-divider {
        font-weight: 400;
        border-color: rgb(214, 222, 228);
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
