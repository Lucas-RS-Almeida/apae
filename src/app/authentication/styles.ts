import styled, { keyframes, css } from "styled-components";

const leftRotateAndFadeinAnimation = keyframes`
  from {
    transform: rotate(-10deg);
  }

  to {
    transform: rotate(-7deg);
  }
`;

const rightRotateAndFadeinAnimation = keyframes`
  from {
    transform: rotate(10deg);
  }

  to {
    transform: rotate(7deg);
  }
`;

const boomAnaimation = keyframes`
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .container_wrapper {
    width: 100%;
    max-width: 800px;
    display: flex;
    gap: 4rem;

    .box_left {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;

      .card {
        width: 50%;
        max-width: 260px;
        height: 300px;
        border-radius: 0.5rem;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all 1s ease-in;

        &:first-of-type {
          position: relative;
          top: -1rem;
          left: 1rem;
          transform: rotate(-7deg);
          animation: ${leftRotateAndFadeinAnimation} 0.5s ease-in;
          background-image: url("/images/male.png");
        }

        &:last-of-type {
          transform: rotate(7deg);
          animation: ${rightRotateAndFadeinAnimation} 0.5s ease-in;
          background-image: url("/images/female.png");
        }
      }
    }

    .box_right {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      animation: ${boomAnaimation} 0.5s ease-in;
      gap: 2rem;

      header {
        text-align: center;

        h2 {
          &:last-of-type {
            font-weight: 300;
          }
        }
      }

      form {
        width: 100%;
        animation: ${boomAnaimation} 0.5s ease-in;

        .form_group {
          width: 100%;

          input {
            width: 100%;
            height: 2.5rem;
            padding: 0 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            background: none;
          }

          & + div {
            margin-top: 1rem;
          }
        }

        button {
          width: 100%;
          height: 2.5rem;
          margin-top: 1.5rem;
          border-radius: 0.5rem;
          text-transform: uppercase;
          transition: all 0.2s ease-in;
          background: #048ce1;
          color: #fff;

          &:hover {
            background-color: #006db0;
          }
        }
      }

      footer {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;

        button {
          background: none;
        }
      }
    }
  }
`;
