import Head from "next/head";
import styled from "styled-components";

function Hello() {
  const HelloWorld = styled.h1`
    font-size: 6rem;
    color: crimson;
    text-align: center;
  `;

  return (
    <div>
      <Head>
        <title>Hello World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <HelloWorld>Hello World!</HelloWorld>
      </h1>
    </div>
  );
}

export default Hello;
